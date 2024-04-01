package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.ConsumptionSmallStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsumptionSmallStaticRepository extends JpaRepository<ConsumptionSmallStaticEntity, Integer> {

    ConsumptionSmallStaticEntity findByConsumptionLargeStaticId(int consumptionLargeStaticId);
    ConsumptionSmallStaticEntity findByConsumptionLargeStaticIdAndSmallCategoryId(int consumptionLargeStaticId, int smallCategoryId);

}
