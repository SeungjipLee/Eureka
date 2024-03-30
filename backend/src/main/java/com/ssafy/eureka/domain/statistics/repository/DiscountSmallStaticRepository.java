package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.DiscountSmallStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountSmallStaticRepository extends JpaRepository<DiscountSmallStaticEntity, String> {
}
