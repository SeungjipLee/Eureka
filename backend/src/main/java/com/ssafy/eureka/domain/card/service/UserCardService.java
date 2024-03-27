package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest;
import com.ssafy.eureka.domain.card.dto.request.SearchUserCardRequest;
import com.ssafy.eureka.domain.card.dto.response.CardHistoryListResponse;
import com.ssafy.eureka.domain.card.dto.response.MyDataCardListResponse;
import com.ssafy.eureka.domain.card.dto.response.OwnUserCardResponse;

import java.util.List;

public interface UserCardService {

    MyDataCardListResponse searchUserCard(String userId, SearchUserCardRequest searchUserCardRequest);

    List<OwnUserCardResponse> ownUserCardList(String userId);

    List<CardHistoryListResponse> listCardHistory(String userId, String yyyymm);

    void registUserCard(String userId, RegistUserCardRequest registUserCardRequest);

    void registPayCard(String userId, RegistPayCardRequest registPayCardRequest);

    void deleteUserCard(String userId, int userCardId);
}
