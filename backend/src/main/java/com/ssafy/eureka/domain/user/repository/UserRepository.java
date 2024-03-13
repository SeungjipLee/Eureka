package com.ssafy.eureka.domain.user.repository;

import com.ssafy.eureka.domain.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, String> {

}
