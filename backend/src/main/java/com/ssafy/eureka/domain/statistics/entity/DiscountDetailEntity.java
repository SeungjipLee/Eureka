package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "discount_detail")
public class DiscountDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int discountDetailId;

    @NotNull
    private int discountStaticId;

    @NotNull
    private int largeCategoryId;

    @NotNull
    private int discountAmount;

    @NotNull
    private int discountCount;

}
