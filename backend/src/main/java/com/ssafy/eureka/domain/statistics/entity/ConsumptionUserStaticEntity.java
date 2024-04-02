package com.ssafy.eureka.domain.statistics.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "consumption_user_static")
public class ConsumptionUserStaticEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    private int largeCategoryId;

    @NotNull
    private char ageGroup;

    @NotNull
    private char gender;

    @NotNull
    @Column(length = 4)
    private String year;

    @NotNull
    @Column(length = 2)
    private String month;

    @NotNull
    private BigInteger consumptionAmount;

    @NotNull
    private LocalDate createdDate;


    public static ConsumptionUserStaticEntity register(int largeCategoryId, char ageGroup, char gender, String year, String month, BigInteger consumptionAmount) {
        ConsumptionUserStaticEntity consumptionUserStaticEntity = new ConsumptionUserStaticEntity();
        consumptionUserStaticEntity.setLargeCategoryId(largeCategoryId);
        consumptionUserStaticEntity.setAgeGroup(ageGroup);
        consumptionUserStaticEntity.setGender(gender);
        consumptionUserStaticEntity.setYear(year);
        consumptionUserStaticEntity.setMonth(month);
        consumptionUserStaticEntity.setConsumptionAmount(consumptionAmount);
        consumptionUserStaticEntity.setCreatedDate(LocalDate.now());
        return consumptionUserStaticEntity;
    }
}
