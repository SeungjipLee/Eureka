package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<CardEntity, String> {

    CardEntity findByCardId(int cardId);
}
