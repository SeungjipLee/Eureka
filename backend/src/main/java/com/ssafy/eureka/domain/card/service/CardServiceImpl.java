package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.domain.card.repository.CardRepository;
import com.ssafy.eureka.domain.card.util.CardDataUtil;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CardServiceImpl implements CardService{

    private CardRepository cardRepository;
    private CardDataUtil cardDatautil;

    @Override
    public void registAllCardProduct() {
        cardDatautil.cardProductFileLoad();
    }
}
