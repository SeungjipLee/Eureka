package com.ssafy.card.Auth.repository;

import com.ssafy.card.Auth.dto.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {

    boolean existsByUserId(String userId);
    void deleteByUserId(String userId);
}
