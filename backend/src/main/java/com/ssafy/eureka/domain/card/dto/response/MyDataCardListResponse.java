package com.ssafy.eureka.domain.card.dto.response;

import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyDataCardListResponse implements Serializable {
    private List<MyDataCard> cardList;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MyDataCard {
        private String companyName;
        private List<Card> list;

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Card{
            private int cardId;
            private String cardIdentifier;
            private String cardName;
            private String imagePath;
            private int imgAttr;
        }
    }
}
