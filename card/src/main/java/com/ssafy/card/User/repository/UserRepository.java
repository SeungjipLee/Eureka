package com.ssafy.card.User.repository;


import com.ssafy.card.User.entity.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    Boolean existsByName(String name);
    Boolean existsByPhoneNumber(String phoneNumber);
    UserEntity findByName(String username);

    UserEntity findByPhoneNumber(String phoneNumber);

}
