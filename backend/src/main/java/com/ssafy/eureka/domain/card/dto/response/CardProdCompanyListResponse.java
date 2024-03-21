package com.ssafy.eureka.domain.card.dto.response;

import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import com.ssafy.eureka.domain.card.dto.CardBenefitEntity;
import com.ssafy.eureka.domain.card.dto.CardCompanyEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardProdCompanyListResponse {

    private String companyName;
    private String cardName;
    private int cardBenefitId;
    private int cardBenefitDetailId;
    private int largeCategoryId;
    private int smallCategoryId;
    private String discountCostType;
    private float discountCost;
    private String largeCategoryName;

    public CardProdCompanyListResponse(String companyName, String cardName, String discountCostType,
                                       float discountCost, String largeCategoryName
    ){
        this.companyName = companyName;
        this.cardName = cardName;
        this.discountCostType = discountCostType;
        this.discountCost = discountCost;
        this.largeCategoryName = largeCategoryName;
    }

}
