package com.ssafy.card.User.dto.response;

import com.ssafy.card.Card.entity.CardHistoryEntity;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardPayHistoryResponse {
    private List<CardHistoryEntity> cardHistoryList;
}
