package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.DiscountStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DiscountStaticRepository extends JpaRepository<DiscountStaticEntity, Integer> {

    @Query(value = "SELECT * FROM discount_static " +
            "WHERE user_card_id = :userCardId AND year = :year AND month = :month", nativeQuery = true)
    Optional<DiscountStaticEntity> findByUserCardIdAndMonthAndYear(@Param("userCardId") int userCardId, @Param("year") String year, @Param("month") String month);

}
