package com.ssafy.eureka.domain.pay.repository;

import com.ssafy.eureka.domain.pay.dto.PayHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
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

    @Query("SELECT COALESCE(SUM(ph.approvedAmt), 0) FROM PayHistoryEntity ph WHERE ph.userId = :userId AND ph.status <> 1 " +
            "AND FUNCTION('YEAR', ph.approvedDateTime) = :year AND FUNCTION('MONTH', ph.approvedDateTime) = :month")
    BigInteger findPayApprovedAmtByUserIdAndDate(@Param("userId") int userId,
                                                   @Param("year") String year,
                                                   @Param("month") String month);

    @Query(value = "SELECT ph.* FROM pay_history ph " +
        "JOIN user_card uc ON ph.user_card_id = uc.user_card_id " +
        "WHERE uc.user_id = :userId " +
        "AND DATE_FORMAT(ph.approved_date_time, '%Y') = :year " +
        "AND DATE_FORMAT(ph.approved_date_time, '%m') = :month",
        nativeQuery = true)
    List<PayHistoryEntity> findByUserIdAndYearAndMonthAsString(int userId, String year, String month);

}
