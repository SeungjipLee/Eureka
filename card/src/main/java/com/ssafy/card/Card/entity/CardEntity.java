package com.ssafy.card.Card.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "card")
public class CardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int cardId;

    @Column(nullable = false)
    int cardCompanyId;

    @NotNull
    int cardType;

    @Column(length = 30, nullable = false)
    String cardName;

    @NotNull
    int annualFee;

    @NotNull
    int previousPerformance;

    @Column(columnDefinition = "TEXT")
    String caution;

    @Column(columnDefinition = "TEXT", nullable = false)
    String imagePath;

    @NotNull
    int imgAttr;

    @Column(columnDefinition = "TEXT")
    String joinPath;

    @NotNull
    boolean isExpired;
}
