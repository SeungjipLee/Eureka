package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.domain.card.dto.CardBenefitEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.card.dto.response.CardCompanyListResponse;
import com.ssafy.eureka.domain.card.dto.response.CardProdDetailResponse;
import com.ssafy.eureka.domain.card.dto.response.CardProdListResponse;
import com.ssafy.eureka.domain.card.dto.response.CardProdRecommendResponse;

import java.util.List;

public interface CardService {

    void registAllCardProduct();
    CardCompanyListResponse listCardCompany();
    List<CardProdListResponse> cardProdCompanyList(int companyId);
    List<CardProdListResponse> cardProdCategoryList(int categoryId);
    List<CardBenefitEntity> cardProdDetail(int cardId);

    CardEntity cardProdRecommend();
}
