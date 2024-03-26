package com.ssafy.eureka.domain.pay.dto.response;

import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import jakarta.persistence.Column;
import java.math.BigInteger;
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
    @Setter
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

        private int discountType;

        private int discountAmount;

        @Column(columnDefinition = "BIGINT")
        private BigInteger currentMonthAmount;

        private int previousPerformance;

        public RecommendCard(CardEntity cardProd, UserCardEntity userCard, CardBenefitDetailEntity cardBenefit) {
            userCardId = userCard.getUserCardId();
            firstCardNumber = userCard.getFirstCardNumber();
            lastCardNumber = userCard.getLastCardNumber();
            currentMonthAmount = userCard.getCurrentMonthAmount();

            cardId = userCard.getCardId();
            cardName = cardProd.getCardName();
            imagePath = cardProd.getImagePath();
            imgAttr = cardProd.getImgAttr();
            previousPerformance = cardProd.getPreviousPerformance();

            if(cardBenefit != null){
                discountCost = cardBenefit.getDiscountCost();
                discountCostType = cardBenefit.getDiscountCostType();
                discountType = cardBenefit.getDiscountType();
            }

            discountAmount = 0;
        }
    }
}
