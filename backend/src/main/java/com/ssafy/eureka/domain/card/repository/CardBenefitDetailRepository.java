package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import java.util.Optional;

import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import javax.swing.text.html.Option;
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

    @Query(value = "SELECT * FROM (SELECT ranked.*, cb.card_id, ROW_NUMBER() OVER(PARTITION BY cb.card_id ORDER BY ranked.discount_cost DESC) AS card_rn FROM (SELECT cbd.*, ROW_NUMBER() OVER(PARTITION BY cbd.card_benefit_id ORDER BY cbd.discount_cost DESC) AS rn FROM card_benefit_detail cbd INNER JOIN card_benefit cb ON cbd.card_benefit_id = cb.card_benefit_id WHERE cbd.large_category_id = :largeCategoryId) AS ranked INNER JOIN card_benefit cb ON ranked.card_benefit_id = cb.card_benefit_id WHERE ranked.rn = 1) AS final_ranked WHERE final_ranked.card_rn = 1 ORDER BY final_ranked.discount_cost DESC LIMIT 3", nativeQuery = true)
    List<CardBenefitDetailEntity> findTop3ByLargeCategoryIdOrderByDiscountCostDesc(@Param("largeCategoryId") int largeCategoryId);
//    @Query("SELECT c FROM CardBenefitDetailEntity c WHERE c.largeCategoryId = :largeCategoryId ORDER BY c.discountCost DESC limit 3")
//    List<CardBenefitDetailEntity> findTop3ByLargeCategoryIdOrderByDiscountCostDesc(@Param("largeCategoryId") int largeCategoryId);


//    @Query("SELECT c FROM CardBenefitDetailEntity c WHERE c.largeCategoryId = :largeCategoryId ORDER BY c.discountCost DESC limit 3")
//    List<CardBenefitDetailEntity> findTop3ByLargeCategoryIdOrderByDiscountCostDesc(@Param("largeCategoryId") int largeCategoryId);

    @Query("SELECT cbd FROM CardBenefitDetailEntity cbd WHERE cbd.cardBenefitId IN (SELECT cb.cardBenefitId FROM CardBenefitEntity cb WHERE cb.cardId = :cardId) AND (cbd.smallCategoryId = :smallCategoryId OR (cbd.largeCategoryId = :largeCategoryId AND cbd.smallCategoryId IS NULL))")
    Optional<CardBenefitDetailEntity> findCardBenefitDetailsByCardIdAndCategory(@Param("cardId") int cardId, @Param("largeCategoryId") int largeCategoryId, @Param("smallCategoryId") Integer smallCategoryId);
    @Query("SELECT DISTINCT new com.ssafy.eureka.domain.category.dto.LargeCategoryEntity(cbd.largeCategoryId, lc.categoryName ) " +
           "FROM CardBenefitDetailEntity cbd " +
           "JOIN LargeCategoryEntity lc ON cbd.largeCategoryId = lc.largeCategoryId " +
           "JOIN CardBenefitEntity cb ON cbd.cardBenefitId = cb.cardBenefitId " +
           "JOIN CardEntity c ON cb.cardId = c.cardId " +
            "WHERE c.cardId = :cardId AND cbd.largeCategoryId != 26")
    List<LargeCategoryEntity> findByCardId(@Param("cardId") int cardId, Pageable pageable);

    @Query("SELECT cbd FROM CardBenefitDetailEntity cbd WHERE cbd.cardBenefitId IN (SELECT cb.cardBenefitId FROM CardBenefitEntity cb WHERE cb.cardId = :cardId) AND (cbd.smallCategoryId = :smallCategoryId OR (cbd.largeCategoryId = :largeCategoryId AND cbd.smallCategoryId IS NULL))")
    Page<CardBenefitDetailEntity> findCardBenefitDetailsByCardIdAndCategory(@Param("cardId") int cardId, @Param("largeCategoryId") int largeCategoryId, @Param("smallCategoryId") Integer smallCategoryId, Pageable pageable);

    @Query(value = "SELECT * FROM card_benefit_detail cbd WHERE cbd.card_benefit_id IN :cardBenefitIds ORDER BY cbd.discount_cost DESC LIMIT 1", nativeQuery = true)
    Optional<CardBenefitDetailEntity> findHighestDiscountCostByCardBenefitIds(@Param("cardBenefitIds") List<Integer> cardBenefitIds);


    @Query("SELECT cbd FROM CardBenefitDetailEntity cbd WHERE cbd.cardBenefitId IN (SELECT cb.cardBenefitId FROM CardBenefitEntity cb WHERE cb.cardId = :cardId) AND cbd.largeCategoryId = 1")
    Optional<CardBenefitDetailEntity> findTopByCardIdAndLargeCategoryId(@Param("cardId") int cardId, Pageable pageable);
}
