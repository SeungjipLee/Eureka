package com.ssafy.eureka.domain.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DiscountStatistics {
    private int categoryId;
    private String categoryName;
    private Long discount;

    public DiscountStatistics(int categoryId, String categoryName, int discountAmount) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.discount = (long) discountAmount;
    }
}
