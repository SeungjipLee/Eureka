package com.ssafy.eureka.domain.statistics.service;

import com.ssafy.eureka.domain.statistics.dto.TotalStatistics;

public interface StatisticService {

    TotalStatistics totalStatistics(String userId, String yyyyMM);

}
