package com.ssafy.eureka.domain.card.dto;

import com.ssafy.eureka.domain.card.dto.CardProductDto.Benefit.BenefitDetail;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "card_benefit_detail")
public class CardBenefitDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cardBenefitDetailId;

    @NotNull
    private int cardBenefitId;

    private int largeCategoryId;

    private int smallCategoryId;

    // 0 : 즉시, 1 : 청구, 2 : 포인트
    @NotNull
    private int discountType;

    // %, 원, L
    @NotNull
    private String discountCostType;

    @NotNull
    private float discountCost;

    private int discountMax;

    private int dailyLimitCount;

    private int monthlyLimitCount;

    private int discountLimit;

    private int payMin;

    public static CardBenefitDetailEntity regist(int cardBenefitId, int largeCategoryId,
        int smallCategoryId, BenefitDetail detail) {
        CardBenefitDetailEntity cardBenefitDetail = new CardBenefitDetailEntity();
        cardBenefitDetail.cardBenefitId = cardBenefitId;
        cardBenefitDetail.largeCategoryId = largeCategoryId;
        if (smallCategoryId != 0) {
            cardBenefitDetail.smallCategoryId = smallCategoryId;
        }
        if (detail.getDiscountType().equals("즉시할인")) {
            cardBenefitDetail.discountType = 0;
        } else if (detail.getDiscountType().equals("청구할인")) {
            cardBenefitDetail.discountType = 1;
        } else {
            cardBenefitDetail.discountType = 2;
        }
        cardBenefitDetail.discountCostType = detail.getDiscountAmountType();
        cardBenefitDetail.discountCost = detail.getDiscountAmount();

        if (detail.getMaxDiscount() != 0) {
            cardBenefitDetail.discountMax = detail.getMaxDiscount();
        }
        if (detail.getDailyDiscountLimit() != 0) {
            cardBenefitDetail.dailyLimitCount = detail.getDailyDiscountLimit();
        }
        if (detail.getMonthlyDiscountLimit() != 0) {
            cardBenefitDetail.monthlyLimitCount = detail.getMonthlyDiscountLimit();
        }
        if (detail.getDiscountLimit() != 0) {
            cardBenefitDetail.discountLimit = detail.getDiscountLimit();
        }
        if (detail.getMinimumPaymentAmount() != 0) {
            cardBenefitDetail.payMin = detail.getMinimumPaymentAmount();
        }

        return cardBenefitDetail;
    }
}
