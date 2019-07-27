package com.telerikacademy.beertag.repositories;

import com.telerikacademy.beertag.models.Beer;
import com.telerikacademy.beertag.models.Country;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeerRepository extends  JpaRepository<Beer, Integer> {

    Beer findBeerByName (@Param("name") String name);
    List<Beer> findAllByDeletedIsFalse(Pageable pageable);
    List<Beer> findAllByDeletedIsTrue(Pageable pageable);

    List<Beer> findBeersByBeerStyle(@Param("style") String beerStyle);
    List<Beer> findBeersByCountry(@Param("country") String country);




}
