package com.ssafy.eureka.domain.category.repository;

import com.ssafy.eureka.domain.category.dto.SmallCategoryEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SmallCategoryRepository extends JpaRepository<SmallCategoryEntity, String> {
    Optional<SmallCategoryEntity> findByCategoryName(String categoryName);
    Optional<SmallCategoryEntity> findBySmallCategoryId(int categoryId);

}
