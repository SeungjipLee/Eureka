package com.ssafy.eureka.domain.pay.repository;

import com.ssafy.eureka.domain.pay.dto.PayInfo;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayInfoRepository extends CrudRepository<PayInfo, String> {
    Optional<PayInfo> findByOrderId(String OrderId);

}
