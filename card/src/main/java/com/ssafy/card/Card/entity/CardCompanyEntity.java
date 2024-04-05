package com.ssafy.card.Card.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "card_company")
public class CardCompanyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int cardCompanyId;

    @Column(length = 30, nullable = false)
    String companyName;

    @Column(length = 10, nullable = false)
    String orgCode;

    @Column(length = 3, nullable = false)
    String cardBrand;

    @Column(columnDefinition = "TEXT", nullable = false)
    String imagePath;

}
