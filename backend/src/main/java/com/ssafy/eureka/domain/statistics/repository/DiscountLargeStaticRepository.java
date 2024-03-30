package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.dto.DiscountStatistics;
import com.ssafy.eureka.domain.statistics.entity.DiscountLargeStaticEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscountLargeStaticRepository extends JpaRepository<DiscountLargeStaticEntity, Integer> {

    @Query("SELECT new com.ssafy.eureka.domain.statistics.dto.DiscountStatistics(lc.largeCategoryId, lc.categoryName, SUM(dls.discountAmount)) " +
            "FROM DiscountLargeStaticEntity dls " +
            "JOIN DiscountStaticEntity ds ON dls.discountStaticId = ds.discountStaticId " +
            "JOIN UserCardEntity uc ON ds.userCardId = uc.userCardId " +
            "JOIN LargeCategoryEntity lc ON dls.largeCategoryId = lc.largeCategoryId " +
            "WHERE uc.userId = :userId AND ds.year = :year AND ds.month = :month " +
            "GROUP BY lc.largeCategoryId, lc.categoryName " +
            "ORDER BY SUM(dls.discountAmount) DESC")
    List<DiscountStatistics> findDiscountStatisticsByUserIdAndDate(@Param("userId") int userId, @Param("year") String year, @Param("month") String month);

    @Query("SELECT new com.ssafy.eureka.domain.statistics.dto.DiscountStatistics(lc.largeCategoryId, lc.categoryName, dls.discountAmount) " +
            "FROM DiscountLargeStaticEntity dls " +
            "JOIN DiscountStaticEntity ds ON dls.discountStaticId = ds.discountStaticId " +
            "JOIN LargeCategoryEntity lc ON dls.largeCategoryId = lc.largeCategoryId " +
            "WHERE ds.year = :year AND ds.month = :month AND ds.userCardId = :userCardId " +
            "ORDER BY dls.discountAmount DESC")
    List<DiscountStatistics> findDiscountStatisticsByUserCardIdAndDate(@Param("userCardId") int userCardId, @Param("year") String year, @Param("month") String month);

    Optional<DiscountLargeStaticEntity> findByDiscountStaticIdAndLargeCategoryId(int discountStaticId, int largeCategoryId);
}
