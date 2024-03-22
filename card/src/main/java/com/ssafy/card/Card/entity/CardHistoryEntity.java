package com.ssafy.card.Card.entity;

import com.ssafy.card.User.entity.UserCardEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
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
    int userCardId; // 유저 카드 PK

    @Column(length = 21)
    String approvedNum;

    @Column(columnDefinition = "DATETIME", nullable = false)
    LocalDateTime approvedDtime;

    @NotNull
    int status;

    @NotNull
    int payType;

    @Column(columnDefinition = "DATETIME", nullable = false)
    LocalDateTime transDtime;

    @Column(length = 75, nullable = false)
    String merchantName;

    @Column(length = 12, nullable = false)
    String merchantRegno;

    @NotNull
    int approvedAmt;
    int modifiedAmt;
    int totalInstallCnt;

    @Column(length = 75, nullable = false)
    String categoryName;

    public CardHistoryEntity(CardHistoryEntity entity){
        LocalDateTime now = LocalDateTime.now();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.userCardId = entity.getUserCardId();
        this.approvedNum = entity.getApprovedNum();
        this.approvedDtime = now;
        this.status = entity.getStatus();
        this.payType = entity.getPayType();
        this.transDtime = now;
        this.merchantRegno = entity.getMerchantRegno();
        this.approvedAmt = entity.getApprovedAmt();
        this.modifiedAmt = entity.getModifiedAmt();
        this.totalInstallCnt = entity.getTotalInstallCnt();
        this.categoryName = entity.getCategoryName();
    }

}
