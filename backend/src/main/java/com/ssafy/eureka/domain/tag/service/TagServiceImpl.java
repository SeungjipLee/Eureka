package com.ssafy.eureka.domain.tag.service;

import com.ssafy.eureka.domain.tag.dto.TagEntity;
import com.ssafy.eureka.domain.tag.dto.response.TagListResponse;
import com.ssafy.eureka.domain.tag.repository.UserTagRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService{

    private final UserTagRepository userTagRepository;

    @Override
    public TagListResponse searchList(String userId) {
        List<TagEntity> list = userTagRepository.findTagsByUserId(Integer.parseInt(userId));
        return new TagListResponse(list);
    }
}
