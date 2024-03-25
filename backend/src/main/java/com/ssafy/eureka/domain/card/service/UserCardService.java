package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest;
import com.ssafy.eureka.domain.card.dto.request.SearchUserCardRequest;
import com.ssafy.eureka.domain.card.dto.response.CardHistoryListResponse;
import com.ssafy.eureka.domain.card.dto.response.MyDataCardListResponse;
import com.ssafy.eureka.domain.card.dto.response.UserCardListResponse;

public interface UserCardService {

    MyDataCardListResponse searchUserCard(String userId, SearchUserCardRequest searchUserCardRequest);

    UserCardListResponse listUserCard(String userId, int status);

    CardHistoryListResponse listCardHistory(String userId, int userCardId, String yyyymm);

    void registUserCard(String userId, RegistUserCardRequest registUserCardRequest);

    void registPayCard(String userId, RegistPayCardRequest registPayCardRequest);

    void deleteUserCard(String userId, int userCardId);
}
