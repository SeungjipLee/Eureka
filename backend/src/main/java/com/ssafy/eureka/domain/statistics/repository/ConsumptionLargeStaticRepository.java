package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.ConsumptionLargeStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumptionLargeStaticRepository extends JpaRepository<ConsumptionLargeStaticEntity, String> {
}
