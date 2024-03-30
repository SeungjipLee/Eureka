package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.dto.ConsumptionStatistics;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionLargeStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ConsumptionLargeStaticRepository extends JpaRepository<ConsumptionLargeStaticEntity, Integer> {

    ConsumptionLargeStaticEntity findByConsumptionStaticId(int consumptionStaticId);

    @Query("SELECT new com.ssafy.eureka.domain.statistics.dto.ConsumptionStatistics(lc.largeCategoryId, lc.categoryName, SUM(cls.consumptionAmount)) " +
            "FROM ConsumptionLargeStaticEntity cls " +
            "JOIN ConsumptionStaticEntity cs ON cls.consumptionStaticId = cs.consumptionStaticId " +
            "JOIN UserCardEntity uc ON cs.userCardId = uc.userCardId " +
            "JOIN LargeCategoryEntity lc ON cls.largeCategoryId = lc.largeCategoryId " +
            "WHERE uc.userId = :userId AND cs.year = :year AND cs.month = :month " +
            "GROUP BY lc.largeCategoryId, lc.categoryName " +
            "ORDER BY SUM(cls.consumptionAmount) DESC")
    List<ConsumptionStatistics> findConsumptionStatisticsByUserIdAndDate(@Param("userId") int userId, @Param("year") String year, @Param("month") String month);

    @Query("SELECT new com.ssafy.eureka.domain.statistics.dto.ConsumptionStatistics(lc.largeCategoryId, lc.categoryName, cls.consumptionAmount) " +
            "FROM ConsumptionLargeStaticEntity cls " +
            "JOIN ConsumptionStaticEntity cs ON cls.consumptionStaticId = cs.consumptionStaticId " +
            "JOIN LargeCategoryEntity lc ON cls.largeCategoryId = lc.largeCategoryId " +
            "WHERE cs.year = :year AND cs.month = :month AND cs.userCardId = :userCardId " +
            "ORDER BY cls.consumptionAmount DESC")
    List<ConsumptionStatistics> findConsumptionStatisticsByUserCardIdAndDate(@Param("userCardId") int userCardId, @Param("year") String year, @Param("month") String month);


}
