package com.ssafy.eureka.domain.pay.dto;

import com.ssafy.eureka.domain.payment.dto.response.PayResponse;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Objects;
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

    private Integer smallCategoryId;

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

    private Integer modifiedAmt;

    @NotNull
    private int totalInstallCnt;

    @NotNull
    private int discount;

    @NotNull
    private int recommendDiscount;

    public static PayHistoryEntity regist(String userId, int userCardId, PayResponse payResponse, PayInfo payInfo, Integer discount) {
        PayHistoryEntity payHistory = new PayHistoryEntity();
        payHistory.orderId = payInfo.getOrderId();
        payHistory.userId = Integer.parseInt(userId);
        payHistory.userCardId = userCardId;
        payHistory.recommendCardId = payInfo.getRecommendCardId();
        payHistory.largeCategoryId = payResponse.getLargeCategoryId();
        payHistory.smallCategoryId = payResponse.getSmallCategoryId();
        payHistory.approvedNum = payResponse.getApprovedNum();
        payHistory.approvedDateTime = payResponse.getApprovedDateTime();
        payHistory.approvedAmt = payResponse.getApprovedAmt();
        payHistory.status = payResponse.getStatus();
        payHistory.transDateTime = payResponse.getTransDateTime();
        payHistory.modifiedAmt = payResponse.getModifiedAmt();
        payHistory.totalInstallCnt = payResponse.getTotalInstallCnt();
        payHistory.discount = Objects.requireNonNullElse(discount, 0);
        return payHistory;
    }
}
