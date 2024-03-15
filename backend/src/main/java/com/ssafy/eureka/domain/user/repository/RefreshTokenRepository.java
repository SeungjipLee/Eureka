package com.ssafy.eureka.domain.user.repository;

import com.ssafy.eureka.domain.user.dto.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository  extends JpaRepository<RefreshToken, String> {

}
