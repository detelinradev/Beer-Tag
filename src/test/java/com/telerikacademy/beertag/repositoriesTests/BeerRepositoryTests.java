package com.telerikacademy.beertag.repositoriesTests;

import com.telerikacademy.beertag.models.*;
import com.telerikacademy.beertag.repositories.BeerRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class BeerRepositoryTests {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private BeerRepository repository;

    @Before
    public void setUp(){
        Image image = new Image();
        Set<BeersDrunk> beerDrunks = new HashSet<>();
        Set<Rating> ratings = new HashSet<>();
        Set<BeersWantToDrink> beersWantToDrinks = new HashSet<>();
        Set<Tag> tags = new HashSet<>();
        Beer beer = new Beer("BeerName","BreweryName",4,"Description",
                "BeerStyle",true,"Country",image,beerDrunks,ratings,beersWantToDrinks,tags );

        entityManager.persist(beer);
    }
    @Test
    public void whenFindByName_thenReturnBeer() {
        Beer beer = repository.findByName("BeerName");
        assertThat(beer.getDescription()).isEqualTo("Description");
    }

    @Test
    public void whenFindAll_thenReturnBeersList() {
        List<Beer> beers = repository.findAll();
        assertThat(beers).hasSize(1);
    }
}
