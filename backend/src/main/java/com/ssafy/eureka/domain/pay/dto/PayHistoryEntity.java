package com.ssafy.eureka.domain.pay.dto;

import jakarta.persistence.Entity;
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
    private int payHistoryId;

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

    @NotNull
    private LocalDateTime approvedDateTime;

    @NotNull
    private int status;

    private LocalDateTime transDateTime;

    @NotNull
    private int approvedAmt;

    private int modifiedAmt;

    @NotNull
    private int discount;

    @NotNull
    private int recommendDiscount;
}
