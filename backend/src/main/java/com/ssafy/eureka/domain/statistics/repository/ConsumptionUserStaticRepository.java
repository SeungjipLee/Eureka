package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.ConsumptionUserStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface ConsumptionUserStaticRepository extends JpaRepository<ConsumptionUserStaticEntity, Integer> {

    @Query("SELECT COALESCE(SUM(c.consumptionAmount), 0) " +
            "FROM ConsumptionUserStaticEntity c " +
            "WHERE c.ageGroup = :ageGroup AND c.gender = :gender AND c.year = :year AND c.month = :month ")
    BigInteger findTotalConsumptionByUserInfoAndDate(@Param("ageGroup") char ageGroup, @Param("gender") char gender, @Param("year") String year, @Param("month") String month);
}
