package com.ssafy.eureka.domain.card.repository;

import com.ssafy.eureka.domain.mydata.dto.MyDataToken;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MydataTokenRepository extends CrudRepository<MyDataToken, String> {
    Optional<MyDataToken> findById(String userId);
}
