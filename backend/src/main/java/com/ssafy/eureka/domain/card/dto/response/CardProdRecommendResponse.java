package com.ssafy.eureka.domain.card.dto.response;

import com.ssafy.eureka.domain.card.dto.CardEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardProdRecommendResponse {

    CardEntity cardEntity;
    int getBenefitCost;
}
