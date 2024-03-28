package com.ssafy.eureka.domain.pay.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import com.ssafy.eureka.domain.card.repository.CardBenefitDetailRepository;
import com.ssafy.eureka.domain.card.repository.CardRepository;
import com.ssafy.eureka.domain.card.repository.UserCardRepository;
import com.ssafy.eureka.domain.category.repository.SmallCategoryRepository;
import com.ssafy.eureka.domain.pay.dto.PayInfo;
import com.ssafy.eureka.domain.pay.dto.request.AprrovePayRequest;
import com.ssafy.eureka.domain.pay.dto.request.RequestPayRequest;
import com.ssafy.eureka.domain.pay.dto.response.AprrovePayResponse;
import com.ssafy.eureka.domain.pay.dto.response.CardRecommendResponse;
import com.ssafy.eureka.domain.pay.dto.response.CardRecommendResponse.RecommendCard;
import com.ssafy.eureka.domain.pay.repository.PayHistoryRepository;
import com.ssafy.eureka.domain.pay.repository.PayInfoRepository;
import com.ssafy.eureka.domain.payment.dto.request.PayRequest;
import com.ssafy.eureka.domain.payment.feign.PaymentFeign;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PayServiceImpl implements PayService{

    private final UserCardRepository userCardRepository;

    private final PayHistoryRepository payHistoryRepository;
    private final PayInfoRepository payInfoRepository;
    private final PaymentFeign paymentFeign;

    private final CardBenefitDetailRepository cardBenefitDetailRepository;
    private final SmallCategoryRepository smallCategoryRepository;
    private final CardRepository cardRepository;


    @Override
    public CardRecommendResponse requestPay(String userId, RequestPayRequest requestPayRequest) {
        PayInfo payInfo = new PayInfo(userId, requestPayRequest);
        payInfoRepository.save(payInfo);

        Integer largeCategory = requestPayRequest.getLargeCategoryId();
        Integer smallCategory = requestPayRequest.getSmallCategoryId();

        List<UserCardEntity> userCardList = userCardRepository.findAllByUserIdAndIsPaymentEnabledTrue(Integer.parseInt(userId));

        List<RecommendCard> list = new ArrayList<>();

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

            list.add(card);
        }

        // 정렬하기

        return new CardRecommendResponse(list);
    }

    @Override
    public AprrovePayResponse approvePay(String userId, AprrovePayRequest aprrovePayRequest) {

        // 카드 정보, 결제 정보 받음.
        PayInfo payInfo = payInfoRepository.findById(aprrovePayRequest.getOrderId())
            .orElseThrow(() -> new CustomException(ResponseCode.PAY_INFO_NOT_FOUND));

        // redis 에서 결제 정보 가져옴

        UserCardEntity userCard = userCardRepository.findByUserCardId(aprrovePayRequest.getUserCardId())
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        PayRequest payRequest = new PayRequest();

        // card에 결제 요청
        MyDataApiResponse<?> response = paymentFeign.requestPay(userCard.getToken(), payRequest);

        if(response.getStatus() != 200){
            throw new CustomException(400, response.getMessage());
        }

        // 결제 내역 저장

        // 결제 결과 반환

        return null;
    }
}
