package com.ssafy.eureka.domain.pay.repository;

import com.ssafy.eureka.domain.pay.dto.PayHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface PayHistoryRepository extends JpaRepository<PayHistoryEntity, Integer> {

    @Query("SELECT p " +
           "from PayHistoryEntity p " +
           "WHERE p.userId = :userId " +
           "AND YEAR(p.approvedDateTime) = :year " +
           "AND MONTH(p.approvedDateTime) = :month")
    List<PayHistoryEntity> findByUserId(@Param("userId") int userId, @Param("year") String year, @Param("month") String month);

    @Query("SELECT p " +
            "from PayHistoryEntity p " +
            "WHERE p.approvedNum = :approvedNum " +
            "AND YEAR(p.approvedDateTime) = :year " +
            "AND MONTH(p.approvedDateTime) = :month")
    List<PayHistoryEntity> findByApprovedNum(@Param("approvedNum") String approvedNum, @Param("year") String year, @Param("month") String month);

    PayHistoryEntity findByApprovedNum(String approvedNum);


}
