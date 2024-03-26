package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "consumption_detail")
public class ConsumptionDetailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int consumptionDetailId;

    @NotNull
    private int consumptionStaticId;

    @NotNull
    private int largeCategoryId;

    @NotNull
    private int consumptionAmount;

    @NotNull
    private int consumptionCount;
}
