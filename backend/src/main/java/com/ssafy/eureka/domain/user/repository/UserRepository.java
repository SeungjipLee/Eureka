package com.ssafy.eureka.domain.user.repository;

import com.ssafy.eureka.domain.user.dto.UserEntity;

import java.util.List;
import java.util.Optional;

import com.ssafy.eureka.domain.user.dto.UserInfoDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByUserId(int userId);
    Optional<UserEntity> findByPhoneNumber(String phoneNumber);
    @Query("SELECT new com.ssafy.eureka.domain.user.dto.UserInfoDto(u.userId, u.userBirth, u.userGender) " +
            "FROM UserEntity u " +
            "WHERE u.isUnregistered = false")
    List<UserInfoDto> findActiveUserInfo();
}
