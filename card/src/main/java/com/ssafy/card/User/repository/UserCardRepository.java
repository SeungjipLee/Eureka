package com.ssafy.card.User.repository;

import com.ssafy.card.User.entity.UserCardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCardRepository extends JpaRepository<UserCardEntity, Integer> {

    Optional<UserCardEntity> findByCardNumber(String cardNumber);
}
