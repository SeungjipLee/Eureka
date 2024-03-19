package com.ssafy.eureka.domain.card.repository;


import com.ssafy.eureka.domain.card.dto.CardCompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardCompanyRepository extends JpaRepository<CardCompanyEntity, String> {

}
