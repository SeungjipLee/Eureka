package com.ssafy.eureka.domain.statistics.service;

import com.ssafy.eureka.domain.statistics.dto.TotalStatistics;
import com.ssafy.eureka.domain.statistics.dto.response.ConsumptionStatisticsResponse;

public interface StatisticService {

    TotalStatistics totalStatistics(String userId, String yyyyMM);
    ConsumptionStatisticsResponse consumptionStatisticsResponse(String userId, String yyyyMM);


}
