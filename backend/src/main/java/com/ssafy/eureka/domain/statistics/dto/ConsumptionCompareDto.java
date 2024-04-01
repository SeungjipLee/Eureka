package com.ssafy.eureka.domain.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsumptionCompareDto {
    private int categoryId;
    private String categoryName;
    private BigInteger userPay;
    private BigInteger comparePay;

    public ConsumptionCompareDto(int categoryId, String categoryName, BigInteger userPay, int comparePay) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.userPay = userPay;
        this.comparePay = BigInteger.valueOf(comparePay);
    }
}
