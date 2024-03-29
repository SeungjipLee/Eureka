package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.ConsumptionLargeStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConsumptionLargeStaticRepository extends JpaRepository<ConsumptionLargeStaticEntity, Integer> {

    List<ConsumptionLargeStaticEntity> findAllByConsumptionStaticId(int consumptionStaticId);
    ConsumptionLargeStaticEntity findByConsumptionStaticId(int consumptionStaticId);




}
