package com.ssafy.eureka.domain.card.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardProdListResponse {

    private int cardId;
    private String companyName;
    private String cardName;
    private String cardImagePath;
    private String info;
    private List<CardDetailBenefitList> list = new ArrayList<>();

}

