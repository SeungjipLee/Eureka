package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.ConsumptionStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Optional;

@Repository
public interface ConsumptionStaticRepository extends JpaRepository<ConsumptionStaticEntity, Integer> {

    Optional<ConsumptionStaticEntity> findByUserCardId(int userCardId);

    @Query("SELECT COALESCE(SUM(cs.totalConsumption), 0) " +
            "FROM ConsumptionStaticEntity cs " +
            "JOIN UserCardEntity uc ON cs.userCardId = uc.userCardId " +
            "WHERE uc.userId = :userId AND cs.year = :year AND cs.month = :month")
    BigInteger findTotalConsumptionByUserIdAndDate(@Param("userId") int userId, @Param("year") String year, @Param("month") String month);
}
