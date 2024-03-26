package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "consumption_detail_history")
public class ConsumptionDetailHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int consumptionDetailHistoryId;

    @NotNull
    private int consumptionDetailId;

    @NotNull
    private int smallCategoryId;

    @NotNull
    private int consumption;

    @NotNull
    private int consumptionCount;

}
