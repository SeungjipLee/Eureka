package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardRepository extends JpaRepository<CardEntity, String> {

    List<CardEntity> findByCardCompanyId(int companyId);
    List<CardEntity> findByCardId(int cardId);
    @Query("SELECT c FROM CardEntity c WHERE c.cardId = :cardId")
    CardEntity findByCard(@Param("cardId") int cardId);

//    List<CardEntity> findAllByCardCompanyId(int companyId);
}
