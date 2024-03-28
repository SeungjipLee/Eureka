package com.ssafy.eureka.domain.card.dto.response;

import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OwnUserCardResponse {

    private int userCardId;
    private int userId;
    private int cardId;
    private String cardIdentifier;
    private String firstCardNumber;
    private String lastCardNumber;
    private String expired_year;
    private String expired_month;
    private BigInteger currentMonthAmount;
    private boolean isPaymentEnabled;
    private String token;
    private LocalDateTime paymentDate;

    // 카드 Entity
    private String imagePath;
    private String cardName;
    private int imageAttr;

    // 혜택
    List<CardDetailBenefitList> list = new ArrayList<>();

    public OwnUserCardResponse(UserCardEntity userCardEntity,
                               String imagePath, String cardName, int imageAttr,
                               List<CardDetailBenefitList> list){
        this.userCardId = userCardEntity.getUserCardId();
        this.userId = userCardEntity.getUserId();
        this.cardId = userCardEntity.getCardId();
        this.cardIdentifier = userCardEntity.getCardIdentifier();
        this.firstCardNumber = userCardEntity.getFirstCardNumber();
        this.lastCardNumber= userCardEntity.getLastCardNumber();
        this.expired_year = userCardEntity.getExpired_year();
        this.expired_month = userCardEntity.getExpired_month();
        this.currentMonthAmount = userCardEntity.getCurrentMonthAmount();
        this.isPaymentEnabled = userCardEntity.isPaymentEnabled();
        this.token = userCardEntity.getToken();
        this.paymentDate = LocalDateTime.from(userCardEntity.getPaymentDate());
        this.imagePath = imagePath;
        this.cardName = cardName;
        this.imageAttr = imageAttr;
        this.list = list;
    }
}

