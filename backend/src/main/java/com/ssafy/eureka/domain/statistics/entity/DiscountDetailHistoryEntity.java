package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "discount_detail_history")
public class DiscountDetailHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int discountDetailHistoryId;

    @NotNull
    private int discountDetailId;

    @NotNull
    private int smallCategoryId;

    @NotNull
    private int consumption;

    @NotNull
    private int discountCount;

}
