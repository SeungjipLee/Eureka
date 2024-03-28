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
    @Column(length = 4)
    private String year;

    @NotNull
    @Column(length = 2)
    private String month;

    @NotNull
    private int totalDiscount;

}
