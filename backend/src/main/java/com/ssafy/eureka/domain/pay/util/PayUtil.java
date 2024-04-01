package com.ssafy.eureka.domain.pay.util;

import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import com.ssafy.eureka.domain.card.repository.CardBenefitDetailRepository;
import com.ssafy.eureka.domain.card.repository.CardRepository;
import com.ssafy.eureka.domain.card.repository.MydataTokenRepository;
import com.ssafy.eureka.domain.card.repository.UserCardRepository;
import com.ssafy.eureka.domain.category.repository.LargeCategoryRepository;
import com.ssafy.eureka.domain.category.repository.SmallCategoryRepository;
import com.ssafy.eureka.domain.mydata.feign.MyDataFeign;
import com.ssafy.eureka.domain.pay.dto.PayInfo;
import com.ssafy.eureka.domain.pay.repository.PayHistoryRepository;
import com.ssafy.eureka.domain.pay.repository.PayInfoRepository;
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
import com.ssafy.eureka.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PayUtil {
    private final ConsumptionStaticRepository consumptionStaticRepository;
    private final ConsumptionLargeStaticRepository consumptionLargeStaticRepository;
    private final ConsumptionSmallStaticRepository consumptionSmallStaticRepository;

    private final DiscountStaticRepository discountStaticRepository;
    private final DiscountLargeStaticRepository discountLargeStaticRepository;
    private final DiscountSmallStaticRepository discountSmallStaticRepository;

    @Async
    public void asyncStaticMethod(UserCardEntity userCard, PayInfo payInfo, String year, String month){
        saveStatics(userCard, payInfo, year, month);
    }

    public void saveStatics(UserCardEntity userCard, PayInfo payInfo, String year, String month) {
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

}
