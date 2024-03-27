package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "discount_small_static")
public class DiscountSmallStaticEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int discountSmallStaticId;

    @NotNull
    private int discountLargeStaticId;

    @NotNull
    private int smallCategoryId;

    @NotNull
    private int discount;

    @NotNull
    private int discountCount;

}
