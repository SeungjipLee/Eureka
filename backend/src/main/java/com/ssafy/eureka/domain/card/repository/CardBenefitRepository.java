package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardBenefitEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CardBenefitRepository extends JpaRepository<CardBenefitEntity, String> {

    List<CardBenefitEntity> findByCardId(int cardId);
    Optional<CardBenefitEntity> findTopByCardId(int cardBenefitId);

    CardBenefitEntity findFirstByCardBenefitId(int cardBenefitId);
    @Query("SELECT c FROM CardBenefitEntity c WHERE c.cardBenefitId = :cardBenefitId")
    CardBenefitEntity findByCardBenefit(@Param("cardBenefitId") int cardBenefitId);

    @Query("SELECT cb FROM CardBenefitEntity cb WHERE cb.cardId = :cardId")
    List<CardBenefitEntity> findAllCardBenefitIdsByCardId(@Param("cardId") int cardId);

}
