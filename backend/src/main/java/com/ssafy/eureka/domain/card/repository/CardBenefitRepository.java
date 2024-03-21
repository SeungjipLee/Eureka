package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardBenefitEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardBenefitRepository extends JpaRepository<CardBenefitEntity, String> {

    List<CardBenefitEntity> findByCardId(int cardId);
}
