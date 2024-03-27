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
    int userId;

    @Column(nullable = false)
    int cardId;

    @Column(length = 64, nullable = false)
    String cardIdentifier;

    @Column(length = 16, nullable = false)
    String cardNumber;

    @Column(length = 3, nullable = false)
    String cardCvc;

    @Column(length = 4, nullable = false)
    String cardPassword;

    @NotNull
    int cardMember;

    @NotNull
    String expired_year;

    @NotNull
    String expired_month;

    @Column(columnDefinition = "TEXT", nullable = true)
    String token;
}
