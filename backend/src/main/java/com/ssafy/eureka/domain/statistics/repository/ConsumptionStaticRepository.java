package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.pay.dto.PayHistoryEntity;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConsumptionStaticRepository extends JpaRepository<ConsumptionStaticEntity, Integer> {

    @Query("SELECT cs " +
            "from ConsumptionStaticEntity cs " +
            "WHERE cs.userCardId = :userCardId " +
            "AND cs.month = :month")
    ConsumptionStaticEntity findByUserCardAndMonth(@Param("userCardId") int userCardId, @Param("month") String month);



    @Query("SELECT COALESCE(SUM(cs.totalConsumption), 0) " +
            "FROM ConsumptionStaticEntity cs " +
            "JOIN UserCardEntity uc ON cs.userCardId = uc.userCardId " +
            "WHERE uc.userId = :userId AND cs.year = :year AND cs.month = :month")
    BigInteger findTotalConsumptionByUserIdAndDate(@Param("userId") int userId, @Param("year") String year, @Param("month") String month);

    Optional<ConsumptionStaticEntity> findByUserCardIdAndMonthAndYear(int userCardId, String year, String month);
}
