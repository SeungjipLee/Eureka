package com.ssafy.eureka.domain.card.dto;

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

    @Column(columnDefinition = "BIGINT")
    private BigInteger currentMonthAmount;

    private boolean isPaymentEnabled = false;

    private String token;

    private LocalDate paymentDate;
}
