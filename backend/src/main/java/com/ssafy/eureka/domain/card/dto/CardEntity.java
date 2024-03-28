package com.ssafy.eureka.domain.card.dto;


import jakarta.persistence.Column;
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
@Table(name = "card")
public class CardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cardId;

    @NotNull
    private int cardCompanyId;

    @NotNull
    private int cardType;

    @NotNull
    @Column(length = 300)
    private String cardName;

    @NotNull
    private int annualFee;

    @NotNull
    private int previousPerformance;

    @Column(columnDefinition = "TEXT")
    private String caution;

    @NotNull
    @Column(length = 255)
    private String imagePath;

    @NotNull
    private int imgAttr;

    @NotNull
    private int view;

    @Column(columnDefinition = "TEXT")
    private String joinPath;

    @NotNull
    private boolean isExpired = false;


    public static CardEntity regist(Integer cardCompanyId, Integer cardType, CardProductDto cardProduct) {
        CardEntity card = new CardEntity();
        card.cardCompanyId = cardCompanyId;
        card.cardName = cardProduct.getCardName();
        card.imagePath = cardProduct.getImagePath();
        card.annualFee = cardProduct.getAnnualFee();
        card.previousPerformance = cardProduct.getPreviousPerformance();
        card.caution = cardProduct.getBenefits().get(cardProduct.getBenefits().size() - 1).getDetailedDescription();
        card.joinPath = cardProduct.getRegisterPath();
        card.isExpired = false;
        card.cardType = cardType;
        card.view = 0;
        if(cardProduct.getImageAttribute().equals("가로")){
            card.imgAttr = 0;
        }else if(cardProduct.getImageAttribute().equals("세로")){
            card.imgAttr = 1;
        }

        return card;
    }
}
