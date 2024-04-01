package com.ssafy.eureka.domain.card.repository;

import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserCardRepository extends JpaRepository<UserCardEntity, String> {
    List<UserCardEntity> findAllByUserId(int userId);

    Optional<UserCardEntity> findByUserId(int userId);
    Optional<UserCardEntity> findByUserCardId(int userCardId);
    List<UserCardEntity> findAllByUserIdAndIsPaymentEnabledTrue(int userId);

    @Query("SELECT u FROM UserCardEntity u WHERE u.userId = ?1 AND u.isPaymentEnabled = false")
    List<UserCardEntity> findAllByUserIdAndIsPaymentEnabled(int userId);

    Optional<UserCardEntity> findByCardIdentifier(String cardIdentifier);

    boolean existsByUserId(int userId);
    boolean existsByUserCardId(int userCardId);

    @Query("SELECT uc.cardId, COUNT(uc) FROM UserCardEntity uc GROUP BY uc.cardId")
    List<Object[]> countTotalCardOwnership();
    @Query("SELECT u.cardId FROM UserCardEntity u WHERE u.userId = :userId")
    List<Integer> findCardIdByUserId(@Param("userId") int userId);

    @Query("SELECT u.userCardId FROM UserCardEntity u WHERE u.userId = :userId")
    List<Integer> findUserCardIdByUserId(@Param("userId") int userId);
}
