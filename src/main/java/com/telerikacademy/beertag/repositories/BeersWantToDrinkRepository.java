package com.telerikacademy.beertag.repositories;

import com.telerikacademy.beertag.models.BeersWantToDrink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeersWantToDrinkRepository extends JpaRepository<BeersWantToDrink,Integer> {
}
