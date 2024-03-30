package com.ssafy.eureka.domain.statistics.dto;

import lombok.*;

import java.math.BigInteger;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TotalStatistics {
    private BigInteger totalConsumption;
    private Long totalDiscount;
    private BigInteger payApprovedAmt;
}
