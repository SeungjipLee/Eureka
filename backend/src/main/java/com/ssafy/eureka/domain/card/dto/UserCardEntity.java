package com.ssafy.eureka.domain.card.dto;

import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest.RegistUserCard;
import com.ssafy.eureka.domain.payment.dto.response.PayTokenResponse;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    @Column(length = 100)
    private String cardIdentifier;

    @Column(length = 4)
    private String firstCardNumber;

    @Column(length = 4)
    private String lastCardNumber;

    @Column(columnDefinition = "BIGINT")
    private BigInteger currentMonthAmount;

    @NotNull
    private boolean isPaymentEnabled;

    private LocalDateTime paymentDate;

    @Column(length = 2)
    private String expired_year;

    @Column(length = 2)
    private String expired_month;

    @Column(length = 255)
    private String token;

    public UserCardEntity(int userId, RegistPayCardRequest registPayCardRequest, PayTokenResponse payTokenResponse) {
        this.userId = userId;
        this.cardId = payTokenResponse.getCardId();
        this.cardIdentifier = payTokenResponse.getCardIdentifier();
        this.firstCardNumber = registPayCardRequest.getCardNumber().substring(0, 4);
        this.lastCardNumber = registPayCardRequest.getCardNumber().substring(12, 16);
        this.expired_year = registPayCardRequest.getExpired_year();
        this.expired_month = registPayCardRequest.getExpired_month();
        this.currentMonthAmount = new BigInteger("0");
        this.isPaymentEnabled = true;
        this.token = payTokenResponse.getAccessToken();
    }

    public static UserCardEntity registUserCard(String userId, RegistUserCard registUserCard) {
        UserCardEntity userCard = new UserCardEntity();
        userCard.userId = Integer.parseInt(userId);
        userCard.cardId = registUserCard.getCardId();
        userCard.cardIdentifier = registUserCard.getCardIdentifier();
        userCard.currentMonthAmount = new BigInteger("0");
        userCard.isPaymentEnabled = false;
        return userCard;
    }

    public void registPayCard(RegistPayCardRequest registPayCardRequest,
        PayTokenResponse payTokenResponse) {
        isPaymentEnabled = true;
        expired_year = registPayCardRequest.getExpired_year();
        expired_month = registPayCardRequest.getExpired_month();
        firstCardNumber = registPayCardRequest.getCardNumber().substring(0, 4);
        lastCardNumber = registPayCardRequest.getCardNumber().substring(12, 16);
        token = payTokenResponse.getAccessToken();
    }
}
