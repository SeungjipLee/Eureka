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
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.ssafy.eureka.domain.user.dto.UserEntity;
import com.ssafy.eureka.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
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
        long startTime = System.nanoTime();

        Integer largeCategory = requestPayRequest.getLargeCategoryId();
        Integer smallCategory = requestPayRequest.getSmallCategoryId();

        List<UserCardEntity> userCardList = userCardRepository.findAllByUserIdAndIsPaymentEnabledTrue(
            Integer.parseInt(userId));

        List<RecommendCard> list = new ArrayList<>();
        Map<Integer, Integer> cardToDiscount = new HashMap<>();

        if(userCardList.isEmpty()){
            throw new CustomException(ResponseCode.PAY_CARD_NOT_FOUND);
        }

        LocalDate lastMonth = LocalDate.now().minusMonths(1);

        String yearStr = lastMonth.format(DateTimeFormatter.ofPattern("yyyy"));
        String monthStr = lastMonth.format(DateTimeFormatter.ofPattern("MM"));

        for (UserCardEntity userCard : userCardList) {
            CardEntity cardProd = cardRepository.findByCardId(userCard.getCardId());

            CardBenefitDetailEntity cardBenefitDetail = cardBenefitDetailRepository.findCardBenefitDetailsByCardIdAndCategory(userCard.getCardId(), largeCategory, smallCategory, PageRequest.of(0, 1))
                .stream()
                .findFirst()
                .orElse(cardBenefitDetailRepository.findCardBenefitDetailsByCardIdAndCategory(userCard.getCardId(), largeCategory, null, PageRequest.of(0, 1))
                    .stream()
                    .findFirst().orElse(null));

            if(cardBenefitDetail == null){
                List<CardBenefitDetailEntity> results = cardBenefitDetailRepository.findTopByCardIdAndLargeCategoryId(userCard.getCardId(), PageRequest.of(0, 1));
                if(!results.isEmpty()){
                    cardBenefitDetail = results.get(0);
                }
            }

            RecommendCard card = new RecommendCard(cardProd, userCard, cardBenefitDetail);
            if (cardBenefitDetail != null) {
                if (cardBenefitDetail.getDiscountCostType().equals("원")) {
                    card.setDiscountAmount((int) cardBenefitDetail.getDiscountCost());
                } else if (cardBenefitDetail.getDiscountCostType().equals("%")) {
                    card.setDiscountAmount((int) (requestPayRequest.getTotalAmount() * (cardBenefitDetail.getDiscountCost() / 100.0)));
                } else if (cardBenefitDetail.getDiscountCostType().equals("L")) {
                    card.setDiscountAmount((int) cardBenefitDetail.getDiscountCost() * (requestPayRequest.getTotalAmount() / 2000));
                }

                ConsumptionStaticEntity consumptionStatic = consumptionStaticRepository.findByUserCardIdAndYearAndMonth(
                    userCard.getUserCardId(), yearStr, monthStr).orElse(null);

                if ((consumptionStatic == null) || (consumptionStatic.getTotalConsumption().compareTo(
                    BigInteger.valueOf(card.getPreviousPerformance())) < 0)) {
                    card.setDiscountAmount(0);
                } else {
                    String year = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy"));
                    String month = LocalDate.now().format(DateTimeFormatter.ofPattern("MM"));

                    ConsumptionStaticEntity curConsumptionStatic = consumptionStaticRepository.findByUserCardIdAndYearAndMonth(
                        userCard.getUserCardId(), year, month).orElse(null);

                    if(curConsumptionStatic != null){
                        card.setCurrentMonthAmount(curConsumptionStatic.getTotalConsumption());
                    }

                    DiscountStaticEntity discountStatic = discountStaticRepository.findByUserCardIdAndYearAndMonth(
                        userCard.getUserCardId(), year, month).orElse(null);

                    DiscountLargeStaticEntity discountLargeStatic = null;
                    DiscountSmallStaticEntity discountSmallStatic = null;

                    if (discountStatic != null) {
                        discountLargeStatic = discountLargeStaticRepository.findByDiscountStaticIdAndLargeCategoryId(
                            discountStatic.getDiscountStaticId(), largeCategory).orElse(null);

                        if (discountLargeStatic != null) {
                            discountSmallStatic = discountSmallStaticRepository.findByDiscountLargeStaticIdAndSmallCategoryId(
                                discountLargeStatic.getDiscountLargeStaticId(), smallCategory).orElse(null);
                        }
                    }

                    if (card.getDiscountAmount() > requestPayRequest.getTotalAmount()) {
                        card.setDiscountAmount(requestPayRequest.getTotalAmount());
                    }

                    if (cardBenefitDetail.getPayMin() > requestPayRequest.getTotalAmount()) {
                        card.setDiscountAmount(0);
                    } else {
                        if (discountSmallStatic != null) {
                            if ((cardBenefitDetail.getMonthlyLimitCount() != 0 && (discountSmallStatic.getDiscountCount() >= cardBenefitDetail.getMonthlyLimitCount())) ||
                                (cardBenefitDetail.getDiscountLimit() != 0 && (discountSmallStatic.getDiscount() > cardBenefitDetail.getDiscountLimit()))) {
                                card.setDiscountAmount(0);
                            }
                        }
                        else if(discountLargeStatic != null){
                            if ((cardBenefitDetail.getMonthlyLimitCount() != 0&& (discountLargeStatic.getDiscountCount() >= cardBenefitDetail.getMonthlyLimitCount())) ||
                                (cardBenefitDetail.getDiscountLimit() != 0 && (discountLargeStatic.getDiscountAmount() > cardBenefitDetail.getDiscountLimit()))) {
                                card.setDiscountAmount(0);
                            }
                        }
                    }
                }
            } else {
                card.setDiscountAmount(0);
            }

            if(cardBenefitDetail != null){
                System.out.println(cardBenefitDetail.getDiscountCost() + " / " + cardBenefitDetail.getDiscountCostType() + " / ");
            }

            System.out.println(card.getCardName() + " : " + card.getDiscountAmount());

            cardToDiscount.put(card.getUserCardId(), card.getDiscountAmount());
            list.add(card);
        }

        Collections.sort(list);

        PayInfo payInfo = new PayInfo(userId, requestPayRequest, cardToDiscount,
            list.get(0).getUserCardId(), list.get(0).getDiscountAmount());
        payInfoRepository.save(payInfo);

        long endTime = System.nanoTime();
        long executionTime = (endTime - startTime) / 1_000_000;
        log.debug("카드 추천 경과 시간 : " + executionTime);

        return new CardRecommendResponse(requestPayRequest.getOrderId(), list);
    }

    @Override
    public void approvePay(String userId, AprrovePayRequest aprrovePayRequest) {
        long startTime = System.currentTimeMillis();

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

        saveStatics(userCard, payInfo, year, month);
//        payUtil.asyncStaticMethod(userCard, payInfo, year, month);

        long endTime = System.currentTimeMillis();
        log.debug("결제 완료(통계 처리 완료 X), time : " + (endTime - startTime));
    }

    public void saveStatics(UserCardEntity userCard, PayInfo payInfo, String year, String month){
        ConsumptionStaticEntity consumptionStaticEntity = consumptionStaticRepository.findByUserCardIdAndYearAndMonth(
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

        List<PayHistoryEntity> payHistoryList = payHistoryRepository.findByUserIdAndYearAndMonthAsString
            (Integer.parseInt(userId), yyyymm.substring(0, 4), yyyymm.substring(4, 6));

        List<PayHistoryListResponse> list = new ArrayList<>();

        int totalAmount = 0;
        int totalDiscount = 0;
        for (PayHistoryEntity payHistory : payHistoryList){
            totalAmount += payHistory.getApprovedAmt();
            totalDiscount += payHistory.getDiscount();

            payHistory.getUserCardId();

            UserCardEntity userCard = userCardRepository.findByUserCardId(payHistory.getUserCardId())
                .orElse(null);
            CardEntity card = cardRepository.findByCardId(userCard.getCardId());

            LargeCategoryEntity largeCategory = largeCategoryRepository.findByLargeCategoryId(payHistory.getLargeCategoryId());
            SmallCategoryEntity smallCategory = smallCategoryRepository.findBySmallCategoryId(payHistory.getSmallCategoryId())
                .orElse(null);

            String largeCategoryName = largeCategory.getCategoryName();
            String smallCategoryName = smallCategory == null ? "" : smallCategory.getCategoryName();

            list.add(new PayHistoryListResponse(
                card.getCardName(), payHistory, largeCategoryName, smallCategoryName
            ));


        }

        return new PayHistoryResponse(
            totalAmount, totalDiscount, list
        );
    }
}
