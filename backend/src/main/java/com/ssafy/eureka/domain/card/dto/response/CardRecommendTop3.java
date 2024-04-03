package com.ssafy.eureka.domain.card.dto.response;

import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardRecommendTop3 {

    int cardId;
    String cardName;
    String imagePath;
    int imgAttr;
    List<Top3ListAndLargeCategoryNameResponse> tlcnrList;
}
