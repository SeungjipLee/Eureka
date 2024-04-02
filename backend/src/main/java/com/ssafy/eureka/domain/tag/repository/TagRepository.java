package com.ssafy.eureka.domain.tag.repository;

import com.ssafy.eureka.domain.tag.dto.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<TagEntity, String> {

}
