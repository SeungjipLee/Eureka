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

    String cardName;
    String imagePath;
    int imgAttr;
    String largeCategoryName;
    int discountType;
    double discountCost;
}
