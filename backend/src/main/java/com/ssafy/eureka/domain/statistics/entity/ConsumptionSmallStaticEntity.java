package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.math.BigInteger;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
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

}
