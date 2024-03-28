package com.ssafy.card.User.repository;

import com.ssafy.card.User.entity.UserCardEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCardRepository extends JpaRepository<UserCardEntity, Integer> {
    Optional<UserCardEntity> findByCardNumber(String cardNumber);
    List<UserCardEntity> findAllByUserId(int userId);

    @Query("SELECT u FROM UserCardEntity u")
    List<UserCardEntity> findAllById();

    @Query("SELECT u FROM UserCardEntity u WHERE u.cardIdentifier = :cardIdentifier")
    Optional<UserCardEntity> findByCardIdentifier(@Param("cardIdentifier") String cardIdentifier);

    @Query(value = "SELECT uc.* FROM user_card uc INNER JOIN card c ON uc.card_id = c.card_id WHERE uc.user_id = :userId AND c.card_company_id = :cardCompanyId", nativeQuery = true)
    List<UserCardEntity> findAllByUserIdAndCardCompanyId(@Param("userId") int userId, @Param("cardCompanyId") int cardCompanyId);
}
