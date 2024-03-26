package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Entity
@Getter
@Setter
@Table(name = "discount_static")
public class DiscountStaticEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int discountStaticId;

    @NotNull
    private int userCardId;

    @NotNull
    private String year;

    @NotNull
    private String month;

    @NotNull
    @Column(columnDefinition = "BIGINT")
    private BigInteger totalDiscount;

}
