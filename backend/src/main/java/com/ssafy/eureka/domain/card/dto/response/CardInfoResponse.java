package com.ssafy.eureka.domain.card.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardInfoResponse {

    int userCardId;
    int cardId;
    String cardName;
    int cardType;
    int previousPerformance;
    boolean isPaymentEnabled;
}
