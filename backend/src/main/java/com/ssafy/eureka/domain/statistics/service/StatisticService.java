package com.ssafy.eureka.domain.statistics.service;

import com.ssafy.eureka.domain.statistics.dto.TotalStatistics;
import com.ssafy.eureka.domain.statistics.dto.response.BestCardStatisticsResponse;
import com.ssafy.eureka.domain.statistics.dto.response.ConsumptionStatisticsResponse;
import com.ssafy.eureka.domain.statistics.dto.response.DiscountStatisticsResponse;

public interface StatisticService {

    TotalStatistics totalStatistics(String userId, String yyyyMM);
    ConsumptionStatisticsResponse consumptionStatisticsResponse(String userId, String yyyyMM);
    DiscountStatisticsResponse discountStatisticsResponse(String userId, String yyyyMM);
    ConsumptionStatisticsResponse consumptionStatisticsByUserCardResponse(int userCardId, String yyyyMM);
    DiscountStatisticsResponse discountStatisticsByUserCardResponse(int userCardId, String yyyyMM);
    BestCardStatisticsResponse bestCardStatisticsResponse(String userId, String yyyyMM);
    void updateCardOwnershipOverview();

    void updateCardOwnershipStatic();

}
