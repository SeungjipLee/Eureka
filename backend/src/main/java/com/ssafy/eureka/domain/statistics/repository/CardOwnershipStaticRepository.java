package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.CardOwnershipStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardOwnershipStaticRepository extends JpaRepository<CardOwnershipStaticEntity, Integer> {
}
