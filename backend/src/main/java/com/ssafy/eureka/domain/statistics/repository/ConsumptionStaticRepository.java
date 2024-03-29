package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.ConsumptionStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.DiscountStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ConsumptionStaticRepository extends JpaRepository<ConsumptionStaticEntity, Integer> {

    ConsumptionStaticEntity findByUserCardId(int userCardId);

    @Query(value = "SELECT * FROM consumption_static " +
            "WHERE user_card_id = :userCardId AND year = :year AND month = :month", nativeQuery = true)
    Optional<ConsumptionStaticEntity> findByUserCardIdAndMonthAndYear(@Param("userCardId") int userCardId, @Param("year") String year, @Param("month") String month);

}
