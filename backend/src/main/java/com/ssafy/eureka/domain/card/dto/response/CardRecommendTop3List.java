package com.ssafy.eureka.domain.card.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardRecommendTop3List {

    int cardId;
    String cardName;
    String info;
    String imagePath;
    int imgAttr;
    int discountType;
    double discountCost;
    int afterDiscount;
}
