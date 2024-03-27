package com.ssafy.eureka.domain.pay.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int partnershipStoreId;

    @NotNull
    private int smallCategoryId;

    @NotNull
    @Column(unique = true, length = 20)
    private String storeCode;

    @NotNull
    @Column(unique = true, length = 300)
    private String storeName;

    @NotNull
    @Column(length = 12)
    private String storeRegNo;
}
