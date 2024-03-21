package com.ssafy.eureka.domain.category.repository;

import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LargeCategoryRepository extends JpaRepository<LargeCategoryEntity, String> {

    @Override
    List<LargeCategoryEntity> findAll();
}
