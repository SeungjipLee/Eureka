package com.ssafy.card.Card.entity.repository;

import com.ssafy.card.Card.entity.CardHistoryEntity;
import java.util.List;

public interface CardHistoryRepositoryCustom {
    List<CardHistoryEntity> findByUserCardIdAndMonthAndYear(int userCardId, String year, String month);
}