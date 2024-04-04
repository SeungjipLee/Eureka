package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.dto.CardOwnershipDto;
import com.ssafy.eureka.domain.statistics.entity.CardOwnershipOverviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CardOwnershipOverviewRepository extends JpaRepository<CardOwnershipOverviewEntity, Integer> {

    @Query("SELECT new com.ssafy.eureka.domain.statistics.dto.CardOwnershipDto(co.cardId, c.cardName, c.imagePath, c.imgAttr, co.ownershipCount) " +
            "FROM CardOwnershipOverviewEntity co JOIN CardEntity c ON co.cardId = c.cardId " +
            "WHERE co.createdDate = :date " +
            "ORDER BY co.ownershipCount DESC LIMIT 10")
    List<CardOwnershipDto> findCardOwnershipOverviews(@Param("date") LocalDate date);

//    @Query("SELECT new com.ssafy.eureka.domain.statistics.dto.CardOwnershipDto(co.cardId, c.cardName, cb.info, c.imagePath, c.imgAttr, co.ownershipCount) " +
//            "FROM CardOwnershipOverviewEntity co " +
//            "JOIN CardEntity c ON co.cardId = c.cardId " +
//            "JOIN CardBenefitEntity cb ON c.cardId = cb.cardId " +
//            "WHERE co.createdDate = :date " +
//            "ORDER BY co.ownershipCount DESC LIMIT 10")
//    List<CardOwnershipDto> findCardOwnershipOverviews(@Param("date") LocalDate date);

    @Query("SELECT MAX(co.createdDate) FROM CardOwnershipOverviewEntity co")
    LocalDate findLatestCreatedDate();
}
