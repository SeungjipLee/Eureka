package com.ssafy.eureka.domain.tag.repository;

import com.ssafy.eureka.domain.tag.dto.TagEntity;
import com.ssafy.eureka.domain.tag.dto.UserTagEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserTagRepository extends JpaRepository<UserTagEntity, String> {
    @Query("SELECT t FROM TagEntity t INNER JOIN UserTagEntity ut ON t.tagId = ut.tagId WHERE ut.userId = :userId")
    List<TagEntity> findTagsByUserId(@Param("userId") int userId);
}
