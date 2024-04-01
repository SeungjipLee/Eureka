package com.ssafy.eureka.domain.card.dto.response;

import com.ssafy.eureka.domain.card.dto.CardEntity;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CardCompareResponse {

    private int myCardId;
    private int myCardCompanyId;
    private int myCardType;
    private String myCardName;
    private int myAnnualFee;
    private int myPreviousPerformance;
    private String myCaution;
    private String myImagePath;
    private int myImgAttr;
    private int myView;
    private String myJoinPath;
    private boolean myIsExpired = false;

    private int recommendCardId;
    private int recommendCardCompanyId;
    private int recommendCardType;
    private String recommendCardName;
    private int recommendAnnualFee;
    private int recommendPreviousPerformance;
    private String recommendCaution;
    private String recommendImagePath;
    private int recommendImgAttr;
    private int recommendView;
    private String recommendJoinPath;
    private boolean recommendIsExpired = false;

    public CardCompareResponse(CardEntity entity1, CardEntity entity2){
        this.myCardId = entity1.getCardId();
        this.myCardCompanyId = entity1.getCardCompanyId();
        this.myCardType = entity1.getCardType();
        this.myCardName = entity1.getCardName();
        this.myAnnualFee = entity1.getAnnualFee();
        this.myPreviousPerformance = entity1.getPreviousPerformance();
        this.myCaution = entity1.getCaution();
        this.myImagePath = entity1.getImagePath();
        this.myImgAttr = entity1.getImgAttr();
        this.myView = entity1.getView();
        this.myJoinPath = entity1.getJoinPath();

        this.recommendCardId = entity2.getCardId();
        this.recommendCardCompanyId = entity2.getCardCompanyId();
        this.recommendCardType = entity2.getCardType();
        this.recommendCardName = entity2.getCardName();
        this.recommendAnnualFee = entity2.getAnnualFee();
        this.recommendPreviousPerformance = entity2.getPreviousPerformance();
        this.recommendCaution = entity2.getCaution();
        this.recommendImagePath = entity2.getImagePath();
        this.recommendImgAttr = entity2.getImgAttr();
        this.recommendView = entity2.getView();
        this.recommendJoinPath = entity2.getJoinPath();

    }
}
