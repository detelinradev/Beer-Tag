package com.telerikacademy.beertag.repositories;

import com.telerikacademy.beertag.models.BeersDrunk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeersDrunkRepository extends JpaRepository<BeersDrunk,Integer> {
}
