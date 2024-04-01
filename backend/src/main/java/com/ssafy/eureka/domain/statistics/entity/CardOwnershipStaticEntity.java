package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "card_ownership_static")
public class CardOwnershipStaticEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ownershipStaticId;

    @NotNull
    private int cardId;

    @NotNull
    private char ageGroup;

    @NotNull
    private char gender;

    @NotNull
    private int ownershipCount;

    @NotNull
    private LocalDate createdDate;

    public static CardOwnershipStaticEntity registerStatic(int cardId, char ageGroup, char gender, int ownershipCount) {
        CardOwnershipStaticEntity cardOwnershipStatic = new CardOwnershipStaticEntity();
        cardOwnershipStatic.setCardId(cardId);
        cardOwnershipStatic.setAgeGroup(ageGroup);
        cardOwnershipStatic.setGender(gender);
        cardOwnershipStatic.setOwnershipCount(ownershipCount);
        cardOwnershipStatic.setCreatedDate(LocalDate.now());
        return cardOwnershipStatic;
    }
}
