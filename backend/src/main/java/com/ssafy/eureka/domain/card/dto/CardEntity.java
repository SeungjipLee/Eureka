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
    private String cardName;

    @NotNull
    private String imagePath;

    @NotNull
    private int annualFee;

    @NotNull
    private int priviousPerformance;

    @Column(columnDefinition = "TEXT")
    private String caution;

    private String registerPage;

    @NotNull
    private boolean isExpired = false;

    @NotNull
    private int cardType;

    @NotNull
    private int view = 0;

    @NotNull
    private int imgAttr;

    public static CardEntity regist(Integer cardCompanyId, Integer cardType, CardProductDto cardProduct) {
        CardEntity card = new CardEntity();
        card.cardCompanyId = cardCompanyId;
        card.cardName = cardProduct.getCardName();
        card.imagePath = cardProduct.getImagePath();
        card.annualFee = cardProduct.getAnnualFee();
        card.priviousPerformance = cardProduct.getPreviousPerformance();
        card.caution = cardProduct.getBenefits().get(cardProduct.getBenefits().size() - 1).getDetailedDescription();
        card.registerPage = cardProduct.getRegisterPath();
        card.isExpired = false;
        card.cardType = cardType;
        card.view = 0;
        if(cardProduct.getImageAttribute().equals("가로")){
            card.imgAttr = 0;
        }else{
            card.imgAttr = 1;
        }

        return card;
    }
}
