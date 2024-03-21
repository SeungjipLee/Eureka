package com.ssafy.eureka.domain.category.dto.response;

import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LargeCategoryListResponse {
    private List<LargeCategoryEntity> largeCategory;
}
