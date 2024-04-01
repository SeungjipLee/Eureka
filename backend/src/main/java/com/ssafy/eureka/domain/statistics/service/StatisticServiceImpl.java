package com.ssafy.eureka.domain.statistics.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.repository.UserCardRepository;
import com.ssafy.eureka.domain.pay.repository.PayHistoryRepository;
import com.ssafy.eureka.domain.statistics.dto.BestCardStatistics;
import com.ssafy.eureka.domain.statistics.dto.ConsumptionStatistics;
import com.ssafy.eureka.domain.statistics.dto.DiscountStatistics;
import com.ssafy.eureka.domain.statistics.dto.TotalStatistics;
import com.ssafy.eureka.domain.statistics.dto.response.BestCardStatisticsResponse;
import com.ssafy.eureka.domain.statistics.dto.response.ConsumptionStatisticsResponse;
import com.ssafy.eureka.domain.statistics.dto.response.DiscountStatisticsResponse;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.DiscountStaticEntity;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionLargeStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountLargeStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountStaticRepository;
import com.ssafy.eureka.util.DateParserUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class StatisticServiceImpl implements StatisticService {

    private final UserCardRepository userCardRepository;
    private final ConsumptionStaticRepository consumptionStaticRepository;
    private final ConsumptionLargeStaticRepository consumptionLargeStaticRepository;
    private final DiscountStaticRepository discountStaticRepository;
    private final DiscountLargeStaticRepository discountLargeStaticRepository;
    private final PayHistoryRepository payHistoryRepository;

    private void checkUserCardExistsByUserId(String userId) {
        int parsedUserId = Integer.parseInt(userId);
        if(!userCardRepository.existsByUserId(parsedUserId)) {
            log.debug("보유카드 없음");
            throw new CustomException(ResponseCode.USER_CARD_NOT_FOUND);
        }
    }

    private void checkUserCardExistsByUserCardId(int userCardId) {
        if (!userCardRepository.existsByUserCardId(userCardId)) {
            log.debug("보유카드 없음");
            throw new CustomException(ResponseCode.USER_CARD_NOT_FOUND);
        }
    }

    @Override
    public TotalStatistics totalStatistics(String userId, String yyyyMM){
        // 보유 카드 조회
        checkUserCardExistsByUserId(userId);

        DateParserUtil parser = new DateParserUtil(yyyyMM);
        String year = parser.getYear();
        String month = parser.getMonth();

        BigInteger totalConsumption = consumptionStaticRepository.findTotalConsumptionByUserIdAndDate(Integer.parseInt(userId), year, month);
        Long totalDiscount = discountStaticRepository.findTotalDiscountByUserIdAndDate(Integer.parseInt(userId), year, month);
        BigInteger payApprovedAmt = payHistoryRepository.findPayApprovedAmtByUserIdAndDate(Integer.parseInt(userId), year, month);

        return new TotalStatistics(totalConsumption, totalDiscount, payApprovedAmt);
    }

    @Override
    public ConsumptionStatisticsResponse consumptionStatisticsResponse(String userId, String yyyyMM) {
        // 보유 카드 조회
        checkUserCardExistsByUserId(userId);

        DateParserUtil parser = new DateParserUtil(yyyyMM);
        String year = parser.getYear();
        String month = parser.getMonth();


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
        checkUserCardExistsByUserId(userId);

        DateParserUtil parser = new DateParserUtil(yyyyMM);
        String year = parser.getYear();
        String month = parser.getMonth();

        Long totalDiscount = discountStaticRepository.findTotalDiscountByUserIdAndDate(Integer.parseInt(userId), year, month);
        List<DiscountStatistics> discountStatisticsList =
                discountLargeStaticRepository.findDiscountStatisticsByUserIdAndDate(Integer.parseInt(userId), year, month);

        DiscountStatisticsResponse response = new DiscountStatisticsResponse();
        response.setTotalDiscount(totalDiscount);
        response.setDiscountList(discountStatisticsList);
        return response;
    }

    @Override
    public ConsumptionStatisticsResponse consumptionStatisticsByUserCardResponse(int userCardId, String yyyyMM) {
        checkUserCardExistsByUserCardId(userCardId);

        DateParserUtil parser = new DateParserUtil(yyyyMM);
        String year = parser.getYear();
        String month = parser.getMonth();

        Optional<ConsumptionStaticEntity> consumptionStaticEntity =
                consumptionStaticRepository.findByUserCardIdAndYearAndMonth(userCardId, year, month);
        BigInteger totalConsumption = consumptionStaticEntity
                .map(ConsumptionStaticEntity::getTotalConsumption).orElse(BigInteger.ZERO);

        List<ConsumptionStatistics> consumptionStatisticsList =
                consumptionLargeStaticRepository.findConsumptionStatisticsByUserCardIdAndDate(userCardId, year, month);

        ConsumptionStatisticsResponse response = new ConsumptionStatisticsResponse();
        response.setTotalConsumption(totalConsumption);
        response.setConsumptionList(consumptionStatisticsList);
        return response;
    }

    @Override
    public DiscountStatisticsResponse discountStatisticsByUserCardResponse(int userCardId, String yyyyMM) {
        checkUserCardExistsByUserCardId(userCardId);

        DateParserUtil parser = new DateParserUtil(yyyyMM);
        String year = parser.getYear();
        String month = parser.getMonth();

        Optional<DiscountStaticEntity> discountStaticEntity =
                discountStaticRepository.findByUserCardIdAndYearAndMonth(userCardId, year, month);
        Long totalDiscount = Long.valueOf(discountStaticEntity
                .map(DiscountStaticEntity::getTotalDiscount).orElse(0));

        List<Object[]> rawResults =
                discountLargeStaticRepository.findDiscountStatisticsByUserCardIdAndDate(userCardId, year, month);
        List<DiscountStatistics> discountStatisticsList = new ArrayList<>();
        for (Object[] result : rawResults) {
            int largeCategoryId = (int) result[0];
            String categoryName = (String) result[1];
            int discount = (int) result[2];
            discountStatisticsList.add(new DiscountStatistics(largeCategoryId, categoryName, (long) discount));
        }

        DiscountStatisticsResponse response = new DiscountStatisticsResponse();
        response.setTotalDiscount(totalDiscount);
        response.setDiscountList(discountStatisticsList);
        return response;
    }

    public BestCardStatisticsResponse bestCardStatisticsResponse(String userId, String yyyyMM) {
        checkUserCardExistsByUserId(userId);

        DateParserUtil parser = new DateParserUtil(yyyyMM);
        String year = parser.getYear();
        String month = parser.getMonth();

        List<BestCardStatistics> bestCardStatisticsList =
                discountStaticRepository.findCardStatisticsByUserIdAndDate(Integer.parseInt(userId), year, month);

        BestCardStatisticsResponse response = new BestCardStatisticsResponse();
        response.setBestCardStatisticsList(bestCardStatisticsList);
        return response;
    }
}
