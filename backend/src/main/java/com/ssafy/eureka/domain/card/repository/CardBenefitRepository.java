package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardBenefitEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardBenefitRepository extends JpaRepository<CardBenefitEntity, String> {

    List<CardBenefitEntity> findByCardId(int cardId);
    List<CardBenefitEntity> findByCardBenefitId(int cardBenefitId);

    CardBenefitEntity findFirstByCardBenefitId(int cardBenefitId);
    @Query("SELECT c FROM CardBenefitEntity c WHERE c.cardBenefitId = :cardBenefitId")
    CardBenefitEntity findByCardBenefit(@Param("cardBenefitId") int cardBenefitId);

    List<CardBenefitEntity> findAllByCardId(int cardId);

    @Query("SELECT cb.cardBenefitId FROM CardBenefitEntity cb WHERE cb.cardId = :cardId")
    List<Integer> findAllCardBenefitIdsByCardId(@Param("cardId") int cardId);

}
