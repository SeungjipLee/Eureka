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
public class ConsumptionStatistics {
    private int categoryId;
    private String categoryName;
    private BigInteger consumption;
}
