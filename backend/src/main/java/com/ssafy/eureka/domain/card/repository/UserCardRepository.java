package com.ssafy.eureka.domain.card.repository;

import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCardRepository extends JpaRepository<UserCardEntity, String> {
    List<UserCardEntity> findAllByUserId(int userId);

    Optional<UserCardEntity> findByUserCardId(int userCardId);
    List<UserCardEntity> findAllByUserIdAndIsPaymentEnabledTrue(int userId);

    Optional<UserCardEntity> findByCardIdentifier(String cardIdentifier);
}
