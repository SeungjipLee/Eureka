package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "consumption_static")
public class ConsumptionStaticEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int consumptionStaticId;

    @NotNull
    private int userCardId;

    @NotNull
    @Column(length = 4)
    private String year;

    @NotNull
    @Column(length = 2)
    private String month;

    @NotNull
    @Column(columnDefinition = "BIGINT")
    private BigInteger totalConsumption;

    public ConsumptionStaticEntity (int userCardId, String yyyy, String mm, BigInteger totalConsumption){
        this.userCardId = userCardId;
        this.year = yyyy;
        this.month = mm;
        this.totalConsumption = totalConsumption;
    }
}
