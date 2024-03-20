package com.ssafy.eureka.domain.category.repository;

import com.ssafy.eureka.domain.category.dto.SmallCategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SmallCategoryRepository extends JpaRepository<SmallCategoryEntity, String> {

}
