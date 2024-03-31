package com.ssafy.eureka.domain.statistics.repository;

import com.ssafy.eureka.domain.statistics.dto.CardOwnershipOverview;
import com.ssafy.eureka.domain.statistics.entity.CardOwnershipOverviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardOwnershipOverviewRepository extends JpaRepository<CardOwnershipOverviewEntity, Integer> {

    @Query("SELECT new com.ssafy.eureka.domain.statistics.dto.CardOwnershipOverview(co.cardId, c.cardName, c.imagePath, c.imgAttr, co.ownershipCount) " +
            "FROM CardOwnershipOverviewEntity co JOIN CardEntity c ON co.cardId = c.cardId " +
            "ORDER BY co.ownershipCount DESC LIMIT 10")
    List<CardOwnershipOverview> findCardOwnershipOverviews();
}
