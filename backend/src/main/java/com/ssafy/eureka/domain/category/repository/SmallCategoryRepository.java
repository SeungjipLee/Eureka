package com.ssafy.eureka.domain.category.repository;

import com.ssafy.eureka.domain.category.dto.SmallCategoryEntity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SmallCategoryRepository extends JpaRepository<SmallCategoryEntity, String> {
    Optional<SmallCategoryEntity> findByCategoryName(String categoryName);
}
