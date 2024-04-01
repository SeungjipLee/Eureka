package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "card_ownership_overview")
public class CardOwnershipOverviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int overviewId;

    @NotNull
    private int cardId;

    @NotNull
    private int ownershipCount;

    @NotNull
    private LocalDate createdDate;

    public static CardOwnershipOverviewEntity registerOverview(int cardId, int ownershipCount) {
        CardOwnershipOverviewEntity cardOwnershipOverview = new CardOwnershipOverviewEntity();
        cardOwnershipOverview.setCardId(cardId);
        cardOwnershipOverview.setOwnershipCount(ownershipCount);
        cardOwnershipOverview.setCreatedDate(LocalDate.now());
        return cardOwnershipOverview;
    }
}
