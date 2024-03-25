package com.ssafy.eureka.domain.pay.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import com.ssafy.eureka.domain.card.repository.CardBenefitDetailRepository;
import com.ssafy.eureka.domain.card.repository.UserCardRepository;
import com.ssafy.eureka.domain.category.dto.SmallCategoryEntity;
import com.ssafy.eureka.domain.category.repository.SmallCategoryRepository;
import com.ssafy.eureka.domain.pay.dto.PayInfo;
import com.ssafy.eureka.domain.pay.dto.request.AprrovePayRequest;
import com.ssafy.eureka.domain.pay.dto.request.RequestPayRequest;
import com.ssafy.eureka.domain.pay.dto.response.AprrovePayResponse;
import com.ssafy.eureka.domain.pay.dto.response.CardRecommendResponse;
import com.ssafy.eureka.domain.pay.repository.PartnershipStoreRepository;
import com.ssafy.eureka.domain.pay.repository.PayHistoryRepository;
import com.ssafy.eureka.domain.pay.repository.PayInfoRepository;
import com.ssafy.eureka.domain.payment.dto.request.PayRequest;
import com.ssafy.eureka.domain.payment.feign.PaymentFeign;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
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
    private final PartnershipStoreRepository partnershipStoreRepository;
    private final SmallCategoryRepository smallCategoryRepository;


    @Override
    public CardRecommendResponse requestPay(String userId, RequestPayRequest requestPayRequest) {
        PayInfo payInfo = new PayInfo(userId, requestPayRequest);
        payInfoRepository.save(payInfo);

        SmallCategoryEntity category = smallCategoryRepository.findSmallCategoryByStoreCode(payInfo.getStoreCode())
            .orElseThrow(() -> new CustomException(ResponseCode.STORE_NOT_FOUND));

        int largeCategory = category.getLargeCategoryId();
        int smallCategory = category.getSmallCategoryId();

        List<UserCardEntity> userCardList = userCardRepository.findAllByUserIdAndIsPaymentEnabledTrue(Integer.parseInt(userId));

        CardRecommendResponse cardRecommandResponse = new CardRecommendResponse();

        for(UserCardEntity userCard : userCardList){
            CardBenefitDetailEntity cardBenefit = cardBenefitDetailRepository.findCardBenefitDetailsByCardIdAndCategory(userCard.getCardId(), largeCategory, smallCategory)
                .orElse(null);

            // 카드 정보

//            private int userCardId;
//            private int cardId;

//            private String firstCardNumber;
//            private String lastCardNumber;

//            private BigInteger currentMonthAmount;
//            private LocalDate paymentDate;

            // 혜택 정보

//            private int cardBenefitDetailId;
//            private int discountType;
//            private String discountCostType;
//            private float discountCost;

//            private int discountMax;
//            private int dailyLimitCount;
//            private int monthlyLimitCount;
//            private int discountLimit;
//            private int payMin;
        }


        // 우선 순위 정하기


        return cardRecommandResponse;
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
            throw new CustomException(ResponseCode.PAY_APRROVE_ERROR);
        }

        // 결제 내역 저장

        // 결제 결과 반환

        return null;
    }
}
