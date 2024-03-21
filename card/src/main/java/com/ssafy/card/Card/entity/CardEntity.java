package com.ssafy.card.Card.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@Entity
@Table(name = "card")
public class CardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int cardId;

    @Column(nullable = false)
    int cardCompanyId; // 카드사 PK

    @Column(length = 30, nullable = false)
    String cardName;

    @Column(columnDefinition = "TEXT", nullable = false)
    String imagePath;

    @NotNull
    int annualFee;

    @NotNull
    int previousPerformance;

    @Column(columnDefinition = "TEXT")
    String caution;

    @Column(columnDefinition = "TEXT")
    String joinPath;
    int isExpired;

    @NotNull
    int cardType;

    public CardEntity(CardEntity entity){
        this.cardCompanyId = entity.getCardCompanyId();
        this.cardName = entity.getCardName();
        this.imagePath = entity.getImagePath();
        this.annualFee = entity.getAnnualFee();
        this.previousPerformance = entity.getPreviousPerformance();
        this.caution = entity.getCaution();
        this.joinPath = entity.getJoinPath();
        this.isExpired = entity.getIsExpired();
        this.cardType = entity.getCardType();
    }

    // default
    public CardEntity(){
        this.annualFee = 0;
        this.previousPerformance = 0;
        this.isExpired = 0;
    }
}
