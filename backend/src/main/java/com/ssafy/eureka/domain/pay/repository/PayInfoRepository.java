package com.ssafy.eureka.domain.pay.repository;

import com.ssafy.eureka.domain.pay.dto.PayInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayInfoRepository extends CrudRepository<PayInfo, String> {
    // 저장.

    // ~~로 찾기
}
