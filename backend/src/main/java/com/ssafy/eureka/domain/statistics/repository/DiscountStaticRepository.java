package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.DiscountStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface DiscountStaticRepository extends JpaRepository<DiscountStaticEntity, Integer> {

    Optional<DiscountStaticEntity> findByUserCardId(int userCardId);
    @Query("SELECT COALESCE(SUM(ds.totalDiscount), 0) " +
            "FROM DiscountStaticEntity ds " +
            "JOIN UserCardEntity uc ON ds.userCardId = uc.userCardId " +
            "WHERE uc.userId = :userId AND ds.year = :year AND ds.month = :month")
    Long findTotalDiscountByUserIdAndDate(@Param("userId") int userId, @Param("year") String year, @Param("month") String month);

}
