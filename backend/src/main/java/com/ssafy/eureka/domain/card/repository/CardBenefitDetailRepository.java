package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import java.util.Optional;

import com.ssafy.eureka.domain.statistics.entity.ConsumptionLargeStaticEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CardBenefitDetailRepository extends JpaRepository<CardBenefitDetailEntity, String> {

    List<CardBenefitDetailEntity> findByCardBenefitId(int cardBenefitId);
    List<CardBenefitDetailEntity> findByLargeCategoryId(int categoryId);

    CardBenefitDetailEntity findTopByLargeCategoryIdOrderByDiscountCostDesc(int largeCategoryId);

    @Query("SELECT c FROM CardBenefitDetailEntity c WHERE c.largeCategoryId = :largeCategoryId ORDER BY c.discountCost DESC limit 3")
    List<CardBenefitDetailEntity> findTop3ByLargeCategoryIdOrderByDiscountCostDesc(@Param("largeCategoryId") int largeCategoryId);

    @Query("SELECT cbd FROM CardBenefitDetailEntity cbd WHERE cbd.cardBenefitId IN (SELECT cb.cardBenefitId FROM CardBenefitEntity cb WHERE cb.cardId = :cardId) AND (cbd.smallCategoryId = :smallCategoryId OR (cbd.largeCategoryId = :largeCategoryId AND cbd.smallCategoryId IS NULL))")
    Optional<CardBenefitDetailEntity> findCardBenefitDetailsByCardIdAndCategory(@Param("cardId") int cardId, @Param("largeCategoryId") int largeCategoryId, @Param("smallCategoryId") Integer smallCategoryId);

    @Query("SELECT cbd FROM CardBenefitDetailEntity cbd WHERE cbd.cardBenefitId IN (SELECT cb.cardBenefitId FROM CardBenefitEntity cb WHERE cb.cardId = :cardId) AND (cbd.smallCategoryId = :smallCategoryId OR (cbd.largeCategoryId = :largeCategoryId AND cbd.smallCategoryId IS NULL))")
    Page<CardBenefitDetailEntity> findCardBenefitDetailsByCardIdAndCategory(@Param("cardId") int cardId, @Param("largeCategoryId") int largeCategoryId, @Param("smallCategoryId") Integer smallCategoryId, Pageable pageable);
}
