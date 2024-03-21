package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<CardEntity, String> {

    List<CardEntity> findByCardCompanyId(int companyId);
//    List<CardEntity> findAllByCardCompanyId(int companyId);
}
