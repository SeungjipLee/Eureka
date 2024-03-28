package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.ConsumptionStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumptionStaticRepository extends JpaRepository<ConsumptionStaticEntity, String> {

}
