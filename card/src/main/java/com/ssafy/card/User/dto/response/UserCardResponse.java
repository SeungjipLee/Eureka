package com.ssafy.card.User.dto.response;

import com.ssafy.card.User.entity.UserCardEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserCardResponse {
    private int cardId;
    private String cardIdentifier;
    private String firstCardNumber;
    private String lastCardNumber;

    public UserCardResponse(UserCardEntity entity){
        this.cardId = entity.getCardId();
        this.cardIdentifier = entity.getCardIdentifier();
        this.firstCardNumber = getFirstCardNumber();
        this.lastCardNumber = getLastCardNumber();
    }
}