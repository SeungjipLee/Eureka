package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.entity.DiscountSmallStaticEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountSmallStaticRepository extends JpaRepository<DiscountSmallStaticEntity, String> {

    Optional<DiscountSmallStaticEntity> findByDiscountLargeStaticIdAndSmallCategoryId(int discountLargeStaticId, Integer smallCategoryId);
}
