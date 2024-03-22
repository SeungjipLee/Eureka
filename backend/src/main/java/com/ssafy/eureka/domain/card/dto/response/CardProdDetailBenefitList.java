package com.ssafy.eureka.domain.card.dto.response;

import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardProdDetailBenefitList {


    private String largeCategoryName;
    private int cardBenefitDetailId;
    private int cardBenefitId;
    private int largeCategoryId;
    private int smallCategoryId;
    private int discountType;
    private String discountCostType;
    private float discountCost;
    private int discountMax;
    private int dailyLimitCount;
    private int monthlyLimitCount;
    private int discountLimit;
    private int payMin;

    public CardProdDetailBenefitList(CardBenefitDetailEntity cardBenefitDetailEntity, String largeCategoryName){
        this.largeCategoryName = largeCategoryName;
        this.cardBenefitDetailId = cardBenefitDetailEntity.getCardBenefitDetailId();
        this.cardBenefitId = cardBenefitDetailEntity.getCardBenefitId();
        this.largeCategoryId = cardBenefitDetailEntity.getLargeCategoryId();
        this.smallCategoryId = cardBenefitDetailEntity.getSmallCategoryId();
        this.discountCostType = cardBenefitDetailEntity.getDiscountCostType();
        this.discountCost = cardBenefitDetailEntity.getDiscountCost();
        this.discountMax = cardBenefitDetailEntity.getDiscountMax();
        this.dailyLimitCount = cardBenefitDetailEntity.getDailyLimitCount();
        this.monthlyLimitCount = cardBenefitDetailEntity.getMonthlyLimitCount();
        this.discountLimit = cardBenefitDetailEntity.getDiscountLimit();
        this.payMin = cardBenefitDetailEntity.getPayMin();
    }

}
