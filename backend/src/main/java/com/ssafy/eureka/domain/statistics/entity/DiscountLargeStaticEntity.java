package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.math.BigInteger;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    public DiscountLargeStaticEntity(int discountStaticId, int largeCategoryId) {
        this.discountStaticId = discountStaticId;
        this.largeCategoryId = largeCategoryId;
        this.discountAmount = 0;
        this.discountCount = 0;
    }

    public void addPay(Integer integer) {
        this.discountAmount += integer;
        this.discountCount += 1;
    }
}
