package com.telerikacademy.beertag.modelsTests;

import com.telerikacademy.beertag.models.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.Set;


public class BeerTests {

    private Beer beer;
    @Before
    public void InitVariables() {
        Image image = new Image();
        Set<BeersDrunk> beerDrunks = new HashSet<>();
        Set<Rating> ratings = new HashSet<>();
        Set<BeersWantToDrink> beersWantToDrinks = new HashSet<>();
        Set<Tag> tags = new HashSet<>();
        beer = new Beer("BeerName","BreweryName",4,"Description",
                "BeerStyle","Country",image,beerDrunks,ratings,beersWantToDrinks,tags );
    }

    @Test
    public void createBeer_ShouldGetName_WhenCorrectParsedParameters() {
        Assert.assertEquals("BeerName", beer.getName());
    }
    @Test
    public void createBeer_ShouldGetBreweryName_WhenCorrectParsedParameters() {
        Assert.assertEquals("BreweryName", beer.getBreweryName());
    }
    @Test
    public void createBeer_ShouldGetABV_WhenCorrectParsedParameters() {
        Assert.assertEquals(4, beer.getAlcoholByVolume());
    }
    @Test
    public void createBeer_ShouldGetDescription_WhenCorrectParsedParameters() {
        Assert.assertEquals("Description", beer.getDescription());
    }
    @Test
    public void createBeer_ShouldGetBeerStyle_WhenCorrectParsedParameters() {
        Assert.assertEquals("BeerStyle", beer.getBeerStyle());
    }
    @Test
    public void createBeer_ShouldGetIsDeleted_WhenCorrectParsedParameters() {
        Assert.assertFalse(beer.isActive());
    }
    @Test
    public void createBeer_ShouldGetCountry_WhenCorrectParsedParameters() {
        Assert.assertEquals("Country", beer.getCountry());
    }

}
