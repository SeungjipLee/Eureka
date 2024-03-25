package com.ssafy.eureka.domain.user.dto;


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

@Table(name="pay_history")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PayHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payHistoryId;

    @NotNull
    private int userId;

    @NotNull
    private int userCardId;

    @NotNull
    private int recommendCardId;

    @NotNull
    private int partnershipStoreId;

    @NotNull
    private int storeId;

    @NotNull
    private String aprrovedNum;

    @NotNull
    private LocalDateTime approvedDateTime;

    @NotNull
    private Long approvedAmt;

    @NotNull
    private int status;

    private LocalDateTime transDateTime;

    private Long modifiedAmt;

    @NotNull
    private Long discount;

    @NotNull
    private Long recommendDiscount;
}
