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
import com.ssafy.eureka.domain.pay.dto.response.CardRecommendResponse;
import com.ssafy.eureka.domain.pay.dto.response.CardRecommendResponse.RecommendCard;
import com.ssafy.eureka.domain.pay.dto.response.PayHistoryListResponse;
import com.ssafy.eureka.domain.pay.dto.response.PayHistoryResponse;
import com.ssafy.eureka.domain.pay.repository.PayHistoryRepository;
import com.ssafy.eureka.domain.pay.repository.PayInfoRepository;
import com.ssafy.eureka.domain.pay.util.PayUtil;
import com.ssafy.eureka.domain.payment.dto.request.ApprovePayRequest;
import com.ssafy.eureka.domain.payment.dto.response.PayResponse;
import com.ssafy.eureka.domain.payment.feign.PaymentFeign;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionLargeStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionSmallStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.DiscountLargeStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.DiscountSmallStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.DiscountStaticEntity;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionLargeStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionSmallStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountLargeStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountSmallStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountStaticRepository;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
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
public class PayServiceImpl implements PayService {

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

    private final PayUtil payUtil;

    private final ConsumptionStaticRepository consumptionStaticRepository;
    private final ConsumptionLargeStaticRepository consumptionLargeStaticRepository;
    private final ConsumptionSmallStaticRepository consumptionSmallStaticRepository;

    private final DiscountStaticRepository discountStaticRepository;
    private final DiscountLargeStaticRepository discountLargeStaticRepository;
    private final DiscountSmallStaticRepository discountSmallStaticRepository;

    @Override
    public CardRecommendResponse requestPay(String userId, RequestPayRequest requestPayRequest) {
        Integer largeCategory = requestPayRequest.getLargeCategoryId();
        Integer smallCategory = requestPayRequest.getSmallCategoryId();

        List<UserCardEntity> userCardList = userCardRepository.findAllByUserIdAndIsPaymentEnabledTrue(
            Integer.parseInt(userId));

        List<RecommendCard> list = new ArrayList<>();
        Map<Integer, Integer> cardToDiscount = new HashMap<>();

        for (UserCardEntity userCard : userCardList) {
            CardEntity cardProd = cardRepository.findByCardId(userCard.getCardId());

            CardBenefitDetailEntity cardBenefitDetail = cardBenefitDetailRepository.findCardBenefitDetailsByCardIdAndCategory(
                    userCard.getCardId(), largeCategory, smallCategory)
                .orElse(null);

            RecommendCard card = new RecommendCard(cardProd, userCard, cardBenefitDetail);

            LocalDate lastMonth = LocalDate.now().minusMonths(1);

            String yearStr = lastMonth.format(DateTimeFormatter.ofPattern("yyyy"));
            String monthStr = lastMonth.format(DateTimeFormatter.ofPattern("MM"));

            ConsumptionStaticEntity consumptionStatic = consumptionStaticRepository.findByUserCardIdAndMonthAndYear(
                userCard.getUserCardId(), yearStr, monthStr).orElse(null);

            if ((consumptionStatic == null) || (consumptionStatic.getTotalConsumption().compareTo(
                BigInteger.valueOf(card.getPreviousPerformance())) < 0)) {
                card.setDiscountAmount(0);
            } else {
                int largeCategoryId = requestPayRequest.getLargeCategoryId();
                int smallCategoryId = requestPayRequest.getSmallCategoryId();

                DiscountStaticEntity discountStatic = discountStaticRepository.findByUserCardIdAndYearAndMonth(
                        userCard.getUserCardId(), yearStr, monthStr)
                    .orElse(null);

                DiscountLargeStaticEntity discountLargeStatic = discountLargeStaticRepository.findByDiscountStaticIdAndLargeCategoryId(
                    discountStatic.getDiscountStaticId(), largeCategoryId).orElse(null);

                DiscountSmallStaticEntity discountSmallStatic = discountSmallStaticRepository.findByDiscountLargeStaticIdAndSmallCategoryId(
                        discountLargeStatic.getDiscountLargeStaticId(), smallCategoryId)
                    .orElse(null);

                if (cardBenefitDetail.getDiscountCostType().equals("원")) {
                    card.setDiscountAmount((int) cardBenefitDetail.getDiscountCost());
                } else if (cardBenefitDetail.getDiscountCostType().equals("%")) {
                    card.setDiscountAmount((int) (requestPayRequest.getTotalAmount() * (
                        cardBenefitDetail.getDiscountCost() / 100)));
                } else if (cardBenefitDetail.getDiscountCostType().equals("포인트")) {
                    card.setDiscountAmount((int) cardBenefitDetail.getDiscountCost());
                }

                if (card.getDiscountAmount() > requestPayRequest.getTotalAmount()) {
                    card.setDiscountAmount(requestPayRequest.getTotalAmount());
                }

                if (cardBenefitDetail.getPayMin() > requestPayRequest.getTotalAmount()) {
                    card.setDiscountAmount(0);
                } else {
                    if (discountStatic != null || discountLargeStatic != null) {
                        if (cardBenefitDetail.getSmallCategoryId() == null) {
                            if (discountLargeStatic.getDiscountCount()
                                >= cardBenefitDetail.getMonthlyLimitCount()) {
                                card.setDiscountAmount(0);
                            }
                            if (discountLargeStatic.getDiscountAmount()
                                > cardBenefitDetail.getDiscountLimit()) {
                                card.setDiscountAmount(0);
                            }
                        } else {
                            if (discountSmallStatic.getDiscountCount()
                                >= cardBenefitDetail.getMonthlyLimitCount()) {
                                card.setDiscountAmount(0);
                            }
                            if (discountSmallStatic.getDiscount()
                                > cardBenefitDetail.getDiscountLimit()) {
                                card.setDiscountAmount(0);
                            }
                        }
                    }
                }
            }

            cardToDiscount.put(card.getUserCardId(), card.getDiscountAmount());
            list.add(card);
        }

        PayInfo payInfo = new PayInfo(userId, requestPayRequest, cardToDiscount,
            list.get(0).getUserCardId(), list.get(0).getDiscountAmount());
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

        UserCardEntity userCard = userCardRepository.findByUserCardId(
                aprrovePayRequest.getUserCardId())
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        MyDataApiResponse<?> response = paymentFeign.requestPay(myDataToken.getAccessToken(),
            new ApprovePayRequest(userCard.getCardIdentifier(), userCard.getToken(), payInfo));

        if (response.getStatus() != 200) {
            throw new CustomException(400, response.getMessage());
        }

        PayHistoryEntity payHistory = PayHistoryEntity.regist(userId, userCard.getUserCardId(),
            (PayResponse) response.getData(),
            payInfo, payInfo.getCardToDiscount().get(userCard.getUserCardId()));

        payHistoryRepository.save(payHistory);

        userCard.updateMonthAmount(payInfo.getTotalAmount());
        userCardRepository.save(userCard);

        String year = String.valueOf(payHistory.getApprovedDateTime().getYear());
        String month = String.format("%02d", payHistory.getApprovedDateTime().getMonthValue());

        ConsumptionStaticEntity consumptionStaticEntity = consumptionStaticRepository.findByUserCardIdAndMonthAndYear(
                userCard.getUserCardId(), year, month)
            .orElse(new ConsumptionStaticEntity(userCard.getUserCardId(), year, month));
        consumptionStaticEntity.addPay(payInfo.getTotalAmount());
        consumptionStaticRepository.save(consumptionStaticEntity);

        ConsumptionLargeStaticEntity consumptionLargeStaticEntity = consumptionLargeStaticRepository.findByConsumptionStaticIdAndLargeCategoryId(
            consumptionStaticEntity.getConsumptionStaticId(),
            payInfo.getLargeCategoryId()).orElse(
            new ConsumptionLargeStaticEntity(consumptionStaticEntity.getConsumptionStaticId(),
                payInfo.getLargeCategoryId()));
        consumptionLargeStaticEntity.addPay(payInfo.getTotalAmount());
        consumptionLargeStaticRepository.save(consumptionLargeStaticEntity);

        ConsumptionSmallStaticEntity consumptionSmallStaticEntity = consumptionSmallStaticRepository.findByConsumptionLargeStaticIdAndSmallCategoryId(
                consumptionLargeStaticEntity.getConsumptionLargeStaticId(),
                payInfo.getSmallCategoryId())
            .orElse(new ConsumptionSmallStaticEntity(
                consumptionLargeStaticEntity.getConsumptionLargeStaticId(),
                payInfo.getSmallCategoryId()));
        consumptionSmallStaticEntity.addPay(payInfo.getTotalAmount());
        consumptionSmallStaticRepository.save(consumptionSmallStaticEntity);

        DiscountStaticEntity discountStaticEntity = discountStaticRepository.findByUserCardIdAndYearAndMonth(
                userCard.getUserCardId(), year, month)
            .orElse(new DiscountStaticEntity(userCard.getUserCardId(), year, month));
        discountStaticEntity.addPay(payInfo.getCardToDiscount().get(userCard.getUserCardId()));
        discountStaticRepository.save(discountStaticEntity);

        DiscountLargeStaticEntity discountLargeStaticEntity = discountLargeStaticRepository.findByDiscountStaticIdAndLargeCategoryId(
            discountStaticEntity.getDiscountStaticId(),
            payInfo.getLargeCategoryId()).orElse(
            new DiscountLargeStaticEntity(discountStaticEntity.getDiscountStaticId(),
                payInfo.getLargeCategoryId()));
        discountLargeStaticEntity.addPay(payInfo.getCardToDiscount().get(userCard.getUserCardId()));
        discountLargeStaticRepository.save(discountLargeStaticEntity);

        DiscountSmallStaticEntity discountSmallStaticEntity = discountSmallStaticRepository.findByDiscountLargeStaticIdAndSmallCategoryId(
                discountLargeStaticEntity.getDiscountLargeStaticId(), payInfo.getSmallCategoryId())
            .orElse(
                new DiscountSmallStaticEntity(discountLargeStaticEntity.getDiscountLargeStaticId(),
                    payInfo.getSmallCategoryId()));
        discountSmallStaticEntity.addPay(payInfo.getCardToDiscount().get(userCard.getUserCardId()));
        discountSmallStaticRepository.save(discountSmallStaticEntity);
    }

    @Override
    public PayHistoryResponse payHistory(String userId, String yyyymm) {

        UserEntity userEntity = userRepository.findByUserId(Integer.parseInt(userId))
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        List<UserCardEntity> userCardEntityList = userCardRepository.findAllByUserId(
            Integer.parseInt(userId));

        int totalAmt = 0;

        List<PayHistoryListResponse> payHistoryListResponseList = new ArrayList<>();

        for (int i = 0; i < userCardEntityList.size(); i++) {

            // 카드 하나의 모든 결제 내역 불러오기
            MyDataApiResponse<?> response = myDataFeign.searchCardPayList(accessToken,
                userCardEntityList.get(i).getCardIdentifier(), yyyymm);

            if (response.getStatus() != 200) {
                throw new CustomException(400, response.getMessage());
            }

            CardEntity cardEntity = cardRepository.findByCard(userCardEntityList.get(i).getCardId())
                .orElseThrow(() -> new CustomException(ResponseCode.CARD_NOT_FOUND));

            String cardName = cardEntity.getCardName();

            MyDataCardHistoryResponse myDataCardPayList = (MyDataCardHistoryResponse) response.getData();
            log.debug("myDataCardPayList" + myDataCardPayList);
//            System.out.println("myDataCardPayList" + myDataCardPayList.getMyDataCardHistoryList());

            for (int j = 0; j < myDataCardPayList.getMyDataCardHistoryList().size(); j++) {
                String approvedNum = myDataCardPayList.getMyDataCardHistoryList().get(j)
                    .getApprovedNum();
//                System.out.println("approvedNum " + approvedNum);

                // 카드사 결제내역에 있는 승인번호와 페이내역에 있는 승인번호가 일치하는 결제 내역만 조회
//            List<PayHistoryEntity> payHistoryEntityList =
//                    payHistoryRepository.findByApprovedNum(
//                            approvedNum,
//                            yyyymm.substring(0, 4), yyyymm.substring(4, 6));
//            if (payHistoryEntityList.isEmpty()) return null;
                PayHistoryEntity payHistoryEntity = payHistoryRepository.findByApprovedNum(
                    approvedNum);
                if (payHistoryEntity == null) {
                    continue; // 카드 결제 내역엔 있지만 페이 내역엔 없다면
                }

//                System.out.println("payHistoryEntity " + payHistoryEntity);

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
