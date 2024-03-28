package com.ssafy.card.Card.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "card_history")
public class CardHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int cardHistoryId;

    @Column(nullable = false)
    int userCardId;

    @NotNull
    int status;

    @NotNull
    int payType;

    @Column(length = 8)
    String approvedNum;

    @Column(columnDefinition = "DATETIME", nullable = false)
    LocalDateTime approvedDateTime;

    @NotNull
    int approvedAmt;

    @Column(columnDefinition = "DATETIME")
    LocalDateTime transDateTime;

    Integer modifiedAmt;

    @Column(length = 75, nullable = false)
    String merchantName;

    @Column(length = 12, nullable = false)
    String merchantRegNo;

    Integer totalInstallCnt;

    @NotNull
    int largeCategoryId;

    Integer smallCategoryId;
}
