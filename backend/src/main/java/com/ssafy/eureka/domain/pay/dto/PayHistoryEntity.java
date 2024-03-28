package com.ssafy.eureka.domain.pay.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "pay_history")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PayHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int payHistoryId;

    @NotNull
    @Column(unique = true, length = 64)
    private String orderId;

    @NotNull
    private int userId;

    @NotNull
    private int userCardId;

    @NotNull
    private int recommendCardId;

    @NotNull
    private int largeCategoryId;

    private int smallCategoryId;

    @NotNull
    @Column(length = 8)
    private String approvedNum;

    @NotNull
    @Column(columnDefinition = "DATETIME")
    private LocalDateTime approvedDateTime;

    @NotNull
    private int approvedAmt;

    @NotNull
    private int status;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime transDateTime;

    @NotNull
    private int modifiedAmt;

    @NotNull
    private int totalInstallCnt;

    @NotNull
    private int discount;

    @NotNull
    private int recommendDiscount;
}
