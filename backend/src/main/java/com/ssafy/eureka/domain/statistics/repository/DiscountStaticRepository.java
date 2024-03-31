package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.dto.BestCardStatistics;
import com.ssafy.eureka.domain.statistics.entity.DiscountStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface DiscountStaticRepository extends JpaRepository<DiscountStaticEntity, Integer> {

    Optional<DiscountStaticEntity> findByUserCardId(int userCardId);
    @Query("SELECT COALESCE(SUM(ds.totalDiscount), 0) " +
            "FROM DiscountStaticEntity ds " +
            "JOIN UserCardEntity uc ON ds.userCardId = uc.userCardId " +
            "WHERE uc.userId = :userId AND ds.year = :year AND ds.month = :month")
    Long findTotalDiscountByUserIdAndDate(@Param("userId") int userId, @Param("year") String year, @Param("month") String month);
    @Query("SELECT new com.ssafy.eureka.domain.statistics.dto.BestCardStatistics(uc.userCardId, c.cardName, c.imagePath, c.imgAttr, COALESCE(ds.totalDiscount, 0)) " +
            "FROM UserCardEntity uc " +
            "LEFT JOIN DiscountStaticEntity ds ON uc.userCardId = ds.userCardId AND ds.year = :year AND ds.month = :month " +
            "JOIN CardEntity c ON uc.cardId = c.cardId " +
            "WHERE uc.userId = :userId " +
            "ORDER BY ds.totalDiscount DESC " +
            "LIMIT 3")
    List<BestCardStatistics> findCardStatisticsByUserIdAndDate(@Param("userId") int userId, @Param("year") String year, @Param("month") String month);

}
