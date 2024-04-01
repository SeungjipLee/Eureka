package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    public DiscountSmallStaticEntity(int discountLargeStaticId, Integer smallCategoryId) {
        this.discountLargeStaticId = discountLargeStaticId;
        this.smallCategoryId = smallCategoryId;
        this.discount = 0;
        this.discountCount = 0;
    }

    public void addPay(Integer integer) {
        this.discount += integer;
        this.discountCount += 1;
    }
}
