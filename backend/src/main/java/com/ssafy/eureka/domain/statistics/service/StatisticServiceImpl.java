package com.ssafy.eureka.domain.statistics.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import com.ssafy.eureka.domain.card.repository.UserCardRepository;
import com.ssafy.eureka.domain.statistics.dto.TotalStatistics;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.DiscountStaticEntity;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountStaticRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class StatisticServiceImpl implements StatisticService {

    private final UserCardRepository userCardRepository;
    private final ConsumptionStaticRepository consumptionStaticRepository;
    private final DiscountStaticRepository discountStaticRepository;

    @Override
    public TotalStatistics totalStatistics(String userId, String yyyyMM){

        // 보유 카드 조회
        List<UserCardEntity> userCardEntityList = userCardRepository.findAllByUserId(Integer.parseInt(userId));
        if(userCardEntityList == null) throw new CustomException(ResponseCode.USER_CARD_NOT_FOUND);

        BigInteger totalConsumption = BigInteger.valueOf(0);
        int totalDiscount = 0;

        // 보유카드들의 통계 값 조회
        for (UserCardEntity userCardEntity : userCardEntityList) {
            int userCardId = userCardEntity.getUserCardId();

            log.debug("통계 조회, 카드 번호 : " + userCardId);

            // 소비 통계 값 저장
            Optional<ConsumptionStaticEntity> consumptionStaticEntity =
                    consumptionStaticRepository.findByUserCardIdAndMonthAndYear(userCardId, yyyyMM.substring(0, 4), yyyyMM.substring(4, 6));
            if(consumptionStaticEntity.isPresent()) {
                log.debug("소비 금액 : " + consumptionStaticEntity.get().getTotalConsumption());
                totalConsumption = totalConsumption.add(consumptionStaticEntity.get().getTotalConsumption());
            } else {
                log.debug("소비 금액 : 0");
            }

            // 할인 통계 값 저장
            Optional<DiscountStaticEntity> discountStaticEntity =
                    discountStaticRepository.findByUserCardIdAndMonthAndYear(userCardId, yyyyMM.substring(0, 4), yyyyMM.substring(4, 6));
            if (discountStaticEntity.isPresent()) {
                log.debug("할인 금액 : " + discountStaticEntity.get().getTotalDiscount());
                totalDiscount += discountStaticEntity.get().getTotalDiscount();
            } else {
                log.debug("할인 금액 : 0");
            }
        }

        return new TotalStatistics(totalConsumption, totalDiscount);
    }
}
