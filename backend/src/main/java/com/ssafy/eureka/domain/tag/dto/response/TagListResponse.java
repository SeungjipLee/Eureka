package com.ssafy.eureka.domain.tag.dto.response;

import com.ssafy.eureka.domain.tag.dto.TagEntity;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagListResponse {
    private List<TagEntity> tagList;
}
