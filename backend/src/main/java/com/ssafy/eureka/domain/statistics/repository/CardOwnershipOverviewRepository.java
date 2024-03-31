package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.CardOwnershipOverviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardOwnershipOverviewRepository extends JpaRepository<CardOwnershipOverviewEntity, Integer> {
}
