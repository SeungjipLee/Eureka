package com.ssafy.eureka.domain.card.dto;

import com.ssafy.eureka.domain.card.dto.CardProductDto.Benefit;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "card_benefit")
public class CardBenefitEntity {
    @Id
    private int cardBenefitId;

    @NotNull
    private int cardId;

    private String title;

    private String info;

    private String infoDetail;

    public static CardBenefitEntity regist(int cardId, Benefit benefit) {
        CardBenefitEntity cardBenefit = new CardBenefitEntity();
        cardBenefit.cardId = cardId;
        cardBenefit.title = benefit.getTitle();
        cardBenefit.info = benefit.getDescription();
        cardBenefit.infoDetail = benefit.getDetailedDescription();
        return cardBenefit;
    }
}
