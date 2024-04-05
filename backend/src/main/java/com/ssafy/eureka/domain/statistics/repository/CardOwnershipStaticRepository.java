package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.dto.CardOwnershipDto;
import com.ssafy.eureka.domain.statistics.entity.CardOwnershipStaticEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CardOwnershipStaticRepository extends JpaRepository<CardOwnershipStaticEntity, Integer> {

    @Query("SELECT NEW com.ssafy.eureka.domain.statistics.dto.CardOwnershipDto(co.cardId, c.cardName, c.imagePath, c.imgAttr, COALESCE(SUM(co.ownershipCount), 0)) " +
            "FROM CardOwnershipStaticEntity co JOIN CardEntity c ON co.cardId = c.cardId " +
            "WHERE co.ageGroup = :ageGroup AND co.createdDate = :date " +
            "GROUP BY co.cardId, c.cardName " +
            "ORDER BY COALESCE(SUM(co.ownershipCount), 0) DESC LIMIT 10")
    List<CardOwnershipDto> findCardOwnershipStaticByAgeGroup(@Param("ageGroup") char ageGroup, @Param("date") LocalDate date);


    @Query("SELECT MAX(co.createdDate) FROM CardOwnershipOverviewEntity co")
    LocalDate findLatestCreatedDate();


}
