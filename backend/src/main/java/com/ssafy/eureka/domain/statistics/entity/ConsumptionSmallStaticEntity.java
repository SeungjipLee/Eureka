package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.math.BigInteger;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "consumption_small_static")
public class ConsumptionSmallStaticEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int consumptionSmallStaticId;

    @NotNull
    private int consumptionLargeStaticId;

    @NotNull
    private int smallCategoryId;

    @NotNull
    @Column(columnDefinition = "BIGINT")
    private BigInteger consumption;

    @NotNull
    private int consumptionCount;

    public ConsumptionSmallStaticEntity(int consumptionLargeStaticId, Integer smallCategoryId) {
        this.consumptionLargeStaticId = consumptionLargeStaticId;
        this.smallCategoryId = smallCategoryId;
        this.consumption = BigInteger.ZERO;
        this.consumptionCount = 0;
    }

    public void addPay(int totalAmount) {
        this.consumption = this.consumption.add(BigInteger.valueOf(totalAmount));
    }

    public ConsumptionSmallStaticEntity(int consumptionLargeStaticId, int smallCategoryId, BigInteger consumption,
                                        int consumptionCount){
        this.consumptionLargeStaticId = consumptionLargeStaticId;
        this.smallCategoryId = smallCategoryId;
        this.consumption = consumption;
        this.consumptionCount = consumptionCount;
    }

}
