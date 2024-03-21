package com.ssafy.eureka.domain.category.service;

import com.ssafy.eureka.domain.category.dto.response.LargeCategoryListResponse;
import com.ssafy.eureka.domain.category.repository.LargeCategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private LargeCategoryRepository largeCategoryRepository;

    @Override
    public LargeCategoryListResponse listLargeCategory() {
        return  new LargeCategoryListResponse(largeCategoryRepository.findAll());
    }
}
