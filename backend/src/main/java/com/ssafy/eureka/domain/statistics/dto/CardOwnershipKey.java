package com.ssafy.eureka.domain.statistics.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Objects;

@Getter
@Setter
public class CardOwnershipKey {
    private int cardId;
    private char ageGroup;
    private char gender;

    public CardOwnershipKey(int cardId, char ageGroup, char gender) {
        this.cardId = cardId;
        this.ageGroup = ageGroup;
        this.gender = gender;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CardOwnershipKey that)) return false;
        return Objects.equals(cardId, that.cardId) &&
                Objects.equals(ageGroup, that.ageGroup) &&
                Objects.equals(gender, that.gender);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cardId, ageGroup, gender);
    }
}
