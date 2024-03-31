package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import java.util.Optional;

import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CardBenefitDetailRepository extends JpaRepository<CardBenefitDetailEntity, String> {

    List<CardBenefitDetailEntity> findByCardBenefitId(int cardBenefitId);
    List<CardBenefitDetailEntity> findByLargeCategoryId(int categoryId);

    @Query("SELECT cbd FROM CardBenefitDetailEntity cbd WHERE cbd.cardBenefitId IN (SELECT cb.cardBenefitId FROM CardBenefitEntity cb WHERE cb.cardId = :cardId) AND (cbd.smallCategoryId = :smallCategoryId OR (cbd.largeCategoryId = :largeCategoryId AND cbd.smallCategoryId IS NULL))")
    Optional<CardBenefitDetailEntity> findCardBenefitDetailsByCardIdAndCategory(@Param("cardId") int cardId, @Param("largeCategoryId") int largeCategoryId, @Param("smallCategoryId") Integer smallCategoryId);
    @Query("SELECT DISTINCT new com.ssafy.eureka.domain.category.dto.LargeCategoryEntity(cbd.largeCategoryId, lc.categoryName ) " +
           "FROM CardBenefitDetailEntity cbd " +
           "JOIN LargeCategoryEntity lc ON cbd.largeCategoryId = lc.largeCategoryId " +
           "JOIN CardBenefitEntity cb ON cbd.cardBenefitId = cb.cardBenefitId " +
           "JOIN CardEntity c ON cb.cardId = c.cardId " +
            "WHERE c.cardId = :cardId AND cbd.largeCategoryId != 26")
    List<LargeCategoryEntity> findByCardId(@Param("cardId") int cardId, Pageable pageable);

}
