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
    private String orderId;

    @NotNull
    private int userId;

    @NotNull
    private int userCardId;

    @NotNull
    private int recommendCardId;

    @NotNull
    private int partnershipStoreId;

    @NotNull
    private String approvedNum;

    @Column(columnDefinition = "DATETIME", nullable = false)
    private LocalDateTime approvedDateTime;

    @NotNull
    private int status;

    @NotNull int payType;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime transDateTime;

    @NotNull
    private String merchantName;

    @NotNull
    private String merchantRegno;

    @NotNull
    private int approvedAmt;

    private int modifiedAmt;

    @NotNull
    private int discount;

    @NotNull
    private int recommendDiscount;
}
