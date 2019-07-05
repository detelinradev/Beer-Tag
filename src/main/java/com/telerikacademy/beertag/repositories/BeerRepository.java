package com.telerikacademy.beertag.repositories;

import com.telerikacademy.beertag.models.Beer;
import com.telerikacademy.beertag.models.Country;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeerRepository extends  JpaRepository<Beer, Integer> {

    Beer findByName (String name);
    List<Beer> findAllByActiveIsFalse(Pageable pageable);
    List<Beer> findAllByActiveIsTrue(Pageable pageable);
    List<Beer> findByTagsContent(@Param("description") String description);
    List<Beer> findBeersByBeerStyle(@Param("style") String beerStyle);
    List<Beer> findBeersByCountry(@Param("country") String country);




}
