package com.ssafy.eureka.domain.card.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    private int cardCompanyId;

    @NotNull
    private String companyName;

    @NotNull
    @Column(unique = true)
    private String orgCode;

    @NotNull
    private String cardBrand;

    @NotNull
    private String imagePath;
}
