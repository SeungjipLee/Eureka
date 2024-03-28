package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.math.BigInteger;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "discount_large_static")
public class DiscountLargeStaticEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int discountLargeStaticId;

    @NotNull
    private int discountStaticId;

    @NotNull
    private int largeCategoryId;

    @NotNull
    private int discountAmount;

    @NotNull
    private int discountCount;

}
