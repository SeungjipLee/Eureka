package com.ssafy.eureka.domain.pay.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardRecommendResponse {
    List<RecommendCard> cardList;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecommendCard{
        private int userCardId;

        private int cardId;

        private String cardName;

        private String imagePath;

        private int imgAttr;

        private String firstCardNumber;

        private String lastCardNumber;

        private double discountCost;

        private String discountCostType;

        private String discountType;

        private int discountAmount;

        private int currentMonthAmount;

        private int previousPerformance;
    }
}
