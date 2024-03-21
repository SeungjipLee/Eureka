package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardBenefitDetailRepository extends JpaRepository<CardBenefitDetailEntity, String> {

    List<CardBenefitDetailEntity> findByCardBenefitId(int cardBenefitId);
}
