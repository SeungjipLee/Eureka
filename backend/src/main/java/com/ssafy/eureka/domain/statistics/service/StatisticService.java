package com.ssafy.eureka.domain.statistics.service;

import com.ssafy.eureka.domain.statistics.dto.TotalStatistics;
import com.ssafy.eureka.domain.statistics.dto.response.*;

public interface StatisticService {

    TotalStatistics totalStatistics(String userId, String yyyyMM);

    ConsumptionStatisticsResponse consumptionStatisticsResponse(String userId, String yyyyMM);

    DiscountStatisticsResponse discountStatisticsResponse(String userId, String yyyyMM);

    ConsumptionStatisticsResponse consumptionStatisticsByUserCardResponse(int userCardId, String yyyyMM);

    DiscountStatisticsResponse discountStatisticsByUserCardResponse(int userCardId, String yyyyMM);

    BestCardStatisticsResponse bestCardStatisticsResponse(String userId, String yyyyMM);

    void updateCardOwnershipOverview();

    void updateCardOwnershipStatic();

    CardOwnershipResponse cardOwnershipOverviewResponse();
    CardOwnershipResponse cardOwnershipStaticResponse(String userId, int userCardId);

    void updateConsumptionUserStatic();

    ConsumptionCompareResponse consumptionCompareResponse(String userId);

}
