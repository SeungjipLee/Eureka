package com.ssafy.eureka.domain.statistics.dto.response;

import com.ssafy.eureka.domain.statistics.dto.ConsumptionStatistics;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsumptionStatisticsResponse {
    private BigInteger totalConsumption;
    private List<ConsumptionStatistics> consumptionList;
}
