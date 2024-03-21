package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.domain.card.dto.response.CardCompanyListResponse;
import com.ssafy.eureka.domain.card.dto.response.CardProdCompanyListResponse;

import java.util.List;

public interface CardService {

    void registAllCardProduct();
    CardCompanyListResponse listCardCompany();
    List<CardProdCompanyListResponse> cardProdCompanyList(int companyId);
}
