package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.ConsumptionSmallStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumptionSmallStaticRepository extends JpaRepository<ConsumptionSmallStaticEntity, String> {
}
