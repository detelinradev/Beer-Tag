package com.telerikacademy.beertag.repositories;

import com.telerikacademy.beertag.models.Beer;
import com.telerikacademy.beertag.models.Rating;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.validation.Valid;
import java.util.List;

@Valid
public interface RatingRepository extends JpaRepository<Rating, Integer> {


    @Query("SELECT AVG(r.rating) from Rating r join Beer b " +
            "on b.id = r.beer  where b.id=:beerID")
    int findAverageRatingByBeer(@Param("beerID") int beerID);

    @Query("select r.rating from Rating r join Beer b on b.id = r.beer join User u " +
            "on u.id = r.user where b.id =:beerID and u.id = :userID")
    int findRatingByUser(@Param("beerID") int beerID, @Param("userID") int userID);

    @Query("SELECT r.beer from Rating r join User u on" +
            " r.user = u.id  where u.id =:userID order by r.rating desc ")
    List<Beer> findTop3BeersByUser(@Param("userID")int userID, Pageable pageable);

    @Query("select r.rating from Rating r join Beer b on b.id = r.beer join User u " +
            "on u.id = r.user where b.id =:beerID and u.id = :userID")
    int findRatingIdByUserAndBeer(@Param("beerID") int beerID, @Param("userID") int userID);


}
