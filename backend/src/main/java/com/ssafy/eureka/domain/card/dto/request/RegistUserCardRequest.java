package com.ssafy.eureka.domain.card.dto.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegistUserCardRequest {
    private List<RegistUserCard> registerUserCard;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RegistUserCard{
        private int cardId;
        private String cardIdentifier;
    }
}
