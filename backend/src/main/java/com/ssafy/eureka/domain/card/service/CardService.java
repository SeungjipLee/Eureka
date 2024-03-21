package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.domain.card.dto.response.CardCompanyListResponse;

public interface CardService {

    void registAllCardProduct();

    CardCompanyListResponse listCardCompany();
}
