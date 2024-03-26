package com.ssafy.card.Card.service;


import com.ssafy.card.Card.dto.response.CardHistoryResponse;
import com.ssafy.card.Card.entity.CardEntity;
import com.ssafy.card.Card.entity.CardHistoryEntity;
import com.ssafy.card.User.dto.response.UserCardResponse;
import com.ssafy.card.User.entity.UserCardEntity;
import com.ssafy.card.common.ApiResponse;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface CardService {

    public List<UserCardResponse> cardList(UserDetails userDetails);
    public List<CardHistoryEntity> cardHistory(String phoneNumber, String cardIdentifier, String yyyymm);

}
