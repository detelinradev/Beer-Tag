package com.telerikacademy.beertag.repositories;

import com.telerikacademy.beertag.models.Beer;
import com.telerikacademy.beertag.models.BeersWantToDrink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeersWantToDrinkRepository extends JpaRepository<BeersWantToDrink,Integer> {


    @Query("SELECT b.beer FROM BeersWantToDrink b JOIN User u ON b.user = u.id " +
            "WHERE b.deleted = false AND u.id =:userID ")
    List<Beer> findBeersWantToDrinkByUser(@Param("userID") int userID);
}
