package com.ssafy.eureka.domain.pay.repository;

import com.ssafy.eureka.domain.pay.dto.PayHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PayHistoryRepository extends JpaRepository<PayHistoryEntity, String> {

}
