package com.ssafy.eureka.domain.statistics.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.repository.UserCardRepository;
import com.ssafy.eureka.domain.statistics.dto.ConsumptionStatistics;
import com.ssafy.eureka.domain.statistics.dto.DiscountStatistics;
import com.ssafy.eureka.domain.statistics.dto.TotalStatistics;
import com.ssafy.eureka.domain.statistics.dto.response.ConsumptionStatisticsResponse;
import com.ssafy.eureka.domain.statistics.dto.response.DiscountStatisticsResponse;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionLargeStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountLargeStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountStaticRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StatisticServiceImpl implements StatisticService {

    private final UserCardRepository userCardRepository;
    private final ConsumptionStaticRepository consumptionStaticRepository;
    private final ConsumptionLargeStaticRepository consumptionLargeStaticRepository;
    private final DiscountStaticRepository discountStaticRepository;
    private final DiscountLargeStaticRepository discountLargeStaticRepository;

    private void checkUserCardExists(String userId) {
        int parsedUserId = Integer.parseInt(userId);
        if(!userCardRepository.existsByUserId(parsedUserId)) {
            log.debug("보유카드 없음");
            throw new CustomException(ResponseCode.USER_CARD_NOT_FOUND);
        }
    }

    @Override
    public TotalStatistics totalStatistics(String userId, String yyyyMM){
        // 보유 카드 조회
        checkUserCardExists(userId);

        String year = yyyyMM.substring(0, 4);
        String month = yyyyMM.substring(4, 6);

        BigInteger totalConsumption = consumptionStaticRepository.findTotalConsumptionByUserIdAndDate(Integer.parseInt(userId), year, month);
        Long totalDiscount = discountStaticRepository.findTotalDiscountByUserIdAndDate(Integer.parseInt(userId), year, month);

        return new TotalStatistics(totalConsumption, totalDiscount);
    }

    @Override
    public ConsumptionStatisticsResponse consumptionStatisticsResponse(String userId, String yyyyMM) {
        // 보유 카드 조회
        checkUserCardExists(userId);

        String year = yyyyMM.substring(0, 4);
        String month = yyyyMM.substring(4, 6);


        BigInteger totalConsumption = consumptionStaticRepository.findTotalConsumptionByUserIdAndDate(Integer.parseInt(userId), year, month);

        List<ConsumptionStatistics> consumptionStatisticsList =
                consumptionLargeStaticRepository.findConsumptionStatisticsByUserIdAndDate(Integer.parseInt(userId), year, month);

        ConsumptionStatisticsResponse response = new ConsumptionStatisticsResponse();
        response.setTotalConsumption(totalConsumption);
        response.setConsumptionList(consumptionStatisticsList);
        return response;
    }

    @Override
    public DiscountStatisticsResponse discountStatisticsResponse(String userId, String yyyyMM) {
        // 보유 카드 조회
        checkUserCardExists(userId);

        String year = yyyyMM.substring(0, 4);
        String month = yyyyMM.substring(4, 6);

        Long totalDiscount = discountStaticRepository.findTotalDiscountByUserIdAndDate(Integer.parseInt(userId), year, month);
        List<DiscountStatistics> discountStatisticsList =
                discountLargeStaticRepository.findDiscountStatisticsByUserIdAndDate(Integer.parseInt(userId), year, month);

        DiscountStatisticsResponse response = new DiscountStatisticsResponse();
        response.setTotalDiscount(totalDiscount);
        response.setDiscountList(discountStatisticsList);
        return response;

    }
}
