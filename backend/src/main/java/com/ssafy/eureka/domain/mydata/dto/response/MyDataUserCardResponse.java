package com.ssafy.eureka.domain.mydata.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyDataUserCardResponse {
    List<MyDataUserCard> userCardList;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MyDataUserCard {
        private int cardId;
        private String cardIdentifier;
        private String firstCardNumber;
        private String lastCardNumber;
    }
}
