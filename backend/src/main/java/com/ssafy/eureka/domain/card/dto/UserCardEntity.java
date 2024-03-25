package com.ssafy.eureka.domain.card.dto;

import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest.RegistUserCard;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.math.BigInteger;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "user_card")
public class UserCardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userCardId;

    @NotNull
    private int userId;

    @NotNull
    private int cardId;

    @NotNull
    private String cardIdentifier;

    private String firstCardNumber;

    private String lastCardNumber;

    private String expired_year;

    private String expired_month;

    @Column(columnDefinition = "BIGINT")
    private BigInteger currentMonthAmount;

    private boolean isPaymentEnabled;

    private String token;

    private LocalDate paymentDate;

    public static UserCardEntity registUserCard(String userId, RegistUserCard registUserCard) {
        UserCardEntity userCard = new UserCardEntity();
        userCard.userId = Integer.parseInt(userId);
        userCard.cardId = registUserCard.getCardId();
        userCard.cardIdentifier = registUserCard.getCardIdentifier();
        userCard.currentMonthAmount = new BigInteger("0");
        userCard.isPaymentEnabled = false;
        return userCard;
    }

    public void registPayCard(RegistPayCardRequest registPayCardRequest, String accessToken) {
        isPaymentEnabled = true;
        expired_year = registPayCardRequest.getExpired_year();
        expired_month = registPayCardRequest.getExpired_month();
        token = accessToken;
    }
}
