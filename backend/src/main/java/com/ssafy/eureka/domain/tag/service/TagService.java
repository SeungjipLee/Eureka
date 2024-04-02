package com.ssafy.eureka.domain.tag.service;

import com.ssafy.eureka.domain.tag.dto.response.TagListResponse;

public interface TagService {

    TagListResponse searchList(String userId);
}
