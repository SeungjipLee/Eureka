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
@Table(name = "card_company")
public class CardCompanyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cardCompanyId;

    @NotNull
    @Column(length = 30)
    private String companyName;

    @NotNull
    @Column(length = 10, unique = true)
    private String orgCode;

    @NotNull
    @Column(length = 3)
    private String cardBrand;

    @NotNull
    @Column(length = 255)
    private String imagePath;
}
