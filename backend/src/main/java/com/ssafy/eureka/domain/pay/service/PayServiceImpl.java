package com.ssafy.eureka.domain.pay.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import com.ssafy.eureka.domain.card.repository.CardBenefitDetailRepository;
import com.ssafy.eureka.domain.card.repository.CardRepository;
import com.ssafy.eureka.domain.card.repository.MydataTokenRepository;
import com.ssafy.eureka.domain.card.repository.UserCardRepository;
import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import com.ssafy.eureka.domain.category.dto.SmallCategoryEntity;
import com.ssafy.eureka.domain.category.repository.LargeCategoryRepository;
import com.ssafy.eureka.domain.category.repository.SmallCategoryRepository;
import com.ssafy.eureka.domain.mydata.dto.MyDataToken;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataCardHistoryResponse;
import com.ssafy.eureka.domain.mydata.feign.MyDataFeign;
import com.ssafy.eureka.domain.pay.dto.PayHistoryEntity;
import com.ssafy.eureka.domain.pay.dto.PayInfo;
import com.ssafy.eureka.domain.pay.dto.request.AprrovePayRequest;
import com.ssafy.eureka.domain.pay.dto.request.RequestPayRequest;
import com.ssafy.eureka.domain.pay.dto.response.AprrovePayResponse;
import com.ssafy.eureka.domain.pay.dto.response.CardRecommendResponse;
import com.ssafy.eureka.domain.pay.dto.response.CardRecommendResponse.RecommendCard;
import com.ssafy.eureka.domain.pay.dto.response.PayHistoryListResponse;
import com.ssafy.eureka.domain.pay.dto.response.PayHistoryResponse;
import com.ssafy.eureka.domain.pay.repository.PayHistoryRepository;
import com.ssafy.eureka.domain.pay.repository.PayInfoRepository;
import com.ssafy.eureka.domain.payment.dto.request.ApprovePayRequest;
import com.ssafy.eureka.domain.payment.dto.response.PayResponse;
import com.ssafy.eureka.domain.payment.feign.PaymentFeign;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import com.ssafy.eureka.domain.user.dto.UserEntity;
import com.ssafy.eureka.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PayServiceImpl implements PayService{

    private final UserCardRepository userCardRepository;
    private final UserRepository userRepository;

    private final MydataTokenRepository mydataTokenRepository;
    private final PayHistoryRepository payHistoryRepository;
    private final PayInfoRepository payInfoRepository;
    private final PaymentFeign paymentFeign;
    private final MyDataFeign myDataFeign;

    private final CardBenefitDetailRepository cardBenefitDetailRepository;
    private final SmallCategoryRepository smallCategoryRepository;
    private final LargeCategoryRepository largeCategoryRepository;
    private final CardRepository cardRepository;


    @Override
    public CardRecommendResponse requestPay(String userId, RequestPayRequest requestPayRequest) {
        Integer largeCategory = requestPayRequest.getLargeCategoryId();
        Integer smallCategory = requestPayRequest.getSmallCategoryId();

        List<UserCardEntity> userCardList = userCardRepository.findAllByUserIdAndIsPaymentEnabledTrue(Integer.parseInt(userId));

        List<RecommendCard> list = new ArrayList<>();
        Map<Integer, Integer> cardToDiscount = new HashMap<>();

        for(UserCardEntity userCard : userCardList){
            CardEntity cardProd = cardRepository.findByCardId(userCard.getCardId());

            CardBenefitDetailEntity cardBenefit = cardBenefitDetailRepository.findCardBenefitDetailsByCardIdAndCategory(userCard.getCardId(), largeCategory, smallCategory)
                .orElse(null);

            RecommendCard card = new RecommendCard(cardProd, userCard, cardBenefit);

            // 00원 할인된다만 정해서 넣어주면 됨.
            card.setDiscountAmount(new Random().nextInt(21) * 100);
            if (card.getDiscountCost() > requestPayRequest.getTotalAmount()){
                card.setDiscountAmount(Math.toIntExact(requestPayRequest.getTotalAmount()));
            }

            cardToDiscount.put(card.getUserCardId(), card.getDiscountAmount());
            list.add(card);
        }

        // 정렬하기
        PayInfo payInfo = new PayInfo(userId, requestPayRequest, cardToDiscount, list.get(0).getUserCardId(), list.get(0).getDiscountAmount());
        payInfoRepository.save(payInfo);

        return new CardRecommendResponse(requestPayRequest.getOrderId(), list);
    }

    @Override
    public void approvePay(String userId, AprrovePayRequest aprrovePayRequest) {
        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String orderId = aprrovePayRequest.getOrderId();

        PayInfo payInfo = payInfoRepository.findById(orderId)
            .orElseThrow(() -> new CustomException(ResponseCode.PAY_INFO_NOT_FOUND));

        payInfoRepository.deleteById(orderId);

        UserCardEntity userCard = userCardRepository.findByUserCardId(aprrovePayRequest.getUserCardId())
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        MyDataApiResponse<?> response = paymentFeign.requestPay(myDataToken.getAccessToken(),
            new ApprovePayRequest(userCard.getCardIdentifier(), userCard.getToken(), payInfo));

        if(response.getStatus() != 200){
            throw new CustomException(400, response.getMessage());
        }

        PayHistoryEntity payHistory = PayHistoryEntity.regist(userId, userCard.getUserCardId(), (PayResponse)response.getData(),
            payInfo, payInfo.getCardToDiscount().get(userCard.getUserCardId()));

        payHistoryRepository.save(payHistory);
    }

    @Override
    public PayHistoryResponse payHistory(String userId, String yyyymm) {

        UserEntity userEntity = userRepository.findByUserId(Integer.parseInt(userId))
                .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));


        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        // 해당 유저가 가진 모든 카드
        List<UserCardEntity> userCardEntityList = userCardRepository.findAllByUserId(Integer.parseInt(userId));

        int totalAmt=0;
        List<PayHistoryListResponse> payHistoryListResponseList = new ArrayList<>();

        for (int i=0; i<userCardEntityList.size(); i++){
            
            // 카드 하나의 모든 결제 내역 불러오기
            MyDataApiResponse<?> response = myDataFeign.searchCardPayList(accessToken,
                    userCardEntityList.get(i).getCardIdentifier(), yyyymm);

            if(response.getStatus() != 200){
                throw new CustomException(400, response.getMessage());
            }

            CardEntity cardEntity = cardRepository.findByCard(userCardEntityList.get(i).getCardId())
                    .orElseThrow(() -> new CustomException(ResponseCode.CARD_NOT_FOUND));

            String cardName = cardEntity.getCardName();

            MyDataCardHistoryResponse myDataCardPayList = (MyDataCardHistoryResponse) response.getData();
            log.debug("myDataCardPayList" + myDataCardPayList);
            System.out.println("myDataCardPayList" + myDataCardPayList.getMyDataCardHistoryList());

            for(int j=0; j<myDataCardPayList.getMyDataCardHistoryList().size(); j++){

            String approvedNum = myDataCardPayList.getMyDataCardHistoryList().get(j).getApprovedNum();
                System.out.println("approvedNum " + approvedNum);

                // 카드사 결제내역에 있는 승인번호와 페이내역에 있는 승인번호가 일치하는 결제 내역만 조회
//            List<PayHistoryEntity> payHistoryEntityList =
//                    payHistoryRepository.findByApprovedNum(
//                            approvedNum,
//                            yyyymm.substring(0, 4), yyyymm.substring(4, 6));
//            if (payHistoryEntityList.isEmpty()) return null;
                PayHistoryEntity payHistoryEntity = payHistoryRepository.findByApprovedNum(approvedNum);
                if (payHistoryEntity == null) continue; // 카드 결제 내역엔 있지만 페이 내역엔 없다면

                System.out.println("payHistoryEntity " + payHistoryEntity);

                int largeCategoryId = payHistoryEntity.getLargeCategoryId();
                int smallCategoryId = payHistoryEntity.getSmallCategoryId();
                totalAmt += payHistoryEntity.getApprovedAmt();

                LargeCategoryEntity largeCategoryEntity
                        = largeCategoryRepository.findByLargeCategoryId(largeCategoryId);
                Optional<SmallCategoryEntity> smallCategoryEntity
                        = smallCategoryRepository.findBySmallCategoryId(smallCategoryId);

                String largeCategoryName = largeCategoryEntity.getCategoryName();
                String smallCategoryName = smallCategoryEntity.get().getCategoryName();

                payHistoryListResponseList.add(new PayHistoryListResponse(cardName,
                        payHistoryEntity, largeCategoryName, smallCategoryName
                ));

            }
        }

        return new PayHistoryResponse(totalAmt, payHistoryListResponseList);
    }
}
