package com.ssafy.eureka.domain.card.dto.response;

import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataUserCardResponse.MyDataUserCard;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyDataCardListResponse {
    private List<MyDataCard> cardList;

    @Getter
    @Setter
    @AllArgsConstructor
    public static class MyDataCard {
        private CardEntity card;
        private String cardIdentifier;
        private String firstCardNumber;
        private String lastCardNumber;

        public MyDataCard(CardEntity card, MyDataUserCard myDataUserCard) {
            this.card = card;
            this.card.setCaution(null);
            this.cardIdentifier = myDataUserCard.getCardIdentifier();
            this.firstCardNumber = myDataUserCard.getFirstCardNumber();
            this.lastCardNumber = myDataUserCard.getLastCardNumber();
        }
    }
}
