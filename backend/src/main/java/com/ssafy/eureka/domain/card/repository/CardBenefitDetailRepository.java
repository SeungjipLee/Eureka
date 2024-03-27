package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CardBenefitDetailRepository extends JpaRepository<CardBenefitDetailEntity, String> {

    List<CardBenefitDetailEntity> findByCardBenefitId(int cardBenefitId);
    List<CardBenefitDetailEntity> findByLargeCategoryId(int categoryId);

    @Query("SELECT cbd FROM CardBenefitDetailEntity cbd WHERE cbd.cardBenefitId IN (SELECT cb.cardBenefitId FROM CardBenefitEntity cb WHERE cb.cardId = :cardId) AND (cbd.smallCategoryId = :smallCategoryId OR (cbd.largeCategoryId = :largeCategoryId AND cbd.smallCategoryId IS NULL))")
    Optional<CardBenefitDetailEntity> findCardBenefitDetailsByCardIdAndCategory(@Param("cardId") int cardId, @Param("largeCategoryId") int largeCategoryId, @Param("smallCategoryId") Integer smallCategoryId);

}
