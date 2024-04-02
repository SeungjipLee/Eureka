package com.ssafy.eureka.domain.card.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayUserCardResponse {

    int userCardId;
    int userId;
    int cardId;
    String cardName;
    int previousPerformance;
    // ++ 현재까지 사용 금액
    String firstCardNumber;
    String lastCardNumber;
    String imagePath;
    int imgAttr;
    int cardType;
    int cardCompanyId;
    int totalAmt;
}
