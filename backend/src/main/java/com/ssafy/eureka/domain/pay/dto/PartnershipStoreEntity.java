package com.ssafy.eureka.domain.pay.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "partnership_store")
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PartnershipStoreEntity {
    @Id
    private int partnershipStoreId;

    private int categoryId;

    private String storeCode;

    private String storeName;

    private String storeRegNo;
}
