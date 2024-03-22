package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardRepository extends JpaRepository<CardEntity, String> {

    CardEntity findByCardId(int cardId);
    List<CardEntity> findByCardCompanyId(int companyId);
    @Query("SELECT c FROM CardEntity c WHERE c.cardId = :cardId")
    CardEntity findByCard(@Param("cardId") int cardId);
}
