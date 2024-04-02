package com.ssafy.eureka.domain.statistics.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class ConsumptionUserStaticKey {
    private int categoryId;
    private char ageGroup;
    private char gender;
    private String year;
    private String month;

    public ConsumptionUserStaticKey(int categoryId, char ageGroup, char gender, String year, String month) {
        this.categoryId = categoryId;
        this.ageGroup = ageGroup;
        this.gender = gender;
        this.year = year;
        this.month = month;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ConsumptionUserStaticKey that)) return false;
        return Objects.equals(categoryId, that.categoryId) &&
                Objects.equals(ageGroup, that.ageGroup) &&
                Objects.equals(gender, that.gender) &&
                Objects.equals(year, that.year) &&
                Objects.equals(month, that.month);
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, ageGroup, gender, year, month);
    }
}
