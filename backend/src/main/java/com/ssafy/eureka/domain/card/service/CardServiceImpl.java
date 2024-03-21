package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.domain.card.dto.response.CardCompanyListResponse;
import com.ssafy.eureka.domain.card.repository.CardCompanyRepository;
import com.ssafy.eureka.domain.card.repository.CardRepository;
import com.ssafy.eureka.domain.card.util.CardDataUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService{

    private final CardRepository cardRepository;
    private final CardCompanyRepository cardCompanyRepository;
    private final CardDataUtil cardDatautil;

    @Override
    public void registAllCardProduct() {
        cardDatautil.cardProductFileLoad();
    }

    @Override
    public CardCompanyListResponse listCardCompany() {
        return new CardCompanyListResponse(cardCompanyRepository.findAll());
    }
}
