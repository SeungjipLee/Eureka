package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.ConsumptionLargeStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsumptionLargeStaticRepository extends JpaRepository<ConsumptionLargeStaticEntity, Integer> {

    List<ConsumptionLargeStaticEntity> findAllByConsumptionStaticId(int consumptionStaticId);

}
