package com.ssafy.card.User.entity;

import com.ssafy.card.Card.entity.CardEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "user_card")
public class UserCardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int userCardId;

    @Column(nullable = false)
    int userId; // User PK

    @Column(nullable = false)
    int cardId; // Card PK

    @Column(length = 64, nullable = false)
    String cardIdentifier;

    @NotNull
    int cardMember;

    @Column(length = 16, nullable = false)
    String cardNumber;

    String expired_year;

    String expired_month;

    @Column(length = 3, nullable = false)
    String cardCvc;

    @Column(length = 4, nullable = false)
    String cardPassword;

    @Column(columnDefinition = "TEXT", nullable = true)
    String token;

    public UserCardEntity(UserCardEntity entity){
        this.userId = entity.getUserId();
        this.cardId = entity.getCardId();
        this.cardIdentifier = entity.getCardIdentifier();
        this.cardMember = entity.getCardMember();
        this.cardNumber = entity.getCardNumber();
        this.expired_year = entity.getExpired_year();
        this.expired_month = entity.getExpired_month();
        this.cardCvc = entity.getCardCvc();
    }

}
