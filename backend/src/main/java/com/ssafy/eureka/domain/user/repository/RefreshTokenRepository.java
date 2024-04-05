package com.ssafy.eureka.domain.user.repository;

import com.ssafy.eureka.domain.user.dto.RefreshToken;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
    boolean existsByUserId(String userId);
    void deleteByUserId(String userId);
}

