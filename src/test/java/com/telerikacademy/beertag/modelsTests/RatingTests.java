package com.telerikacademy.beertag.modelsTests;

import com.telerikacademy.beertag.models.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

public class RatingTests {
    private Rating rating;
    private Beer beer;
    private User user;
    @Before
    public void InitVariables() {
        Image image = new Image();
        Set<BeersDrunk> beerDrunks = new HashSet<>();
        Set<Rating> ratings = new HashSet<>();
        Set<BeersWantToDrink> beersWantToDrinks = new HashSet<>();
        Set<Tag> tags = new HashSet<>();
        user = new User("firstName","lastName","username",
                "email@gmail.com",20,"password","USER",image, beerDrunks, ratings, beersWantToDrinks, tags);
        beer = new Beer("BeerName","BreweryName",4,"Description",
                "BeerStyle","Country",image,beerDrunks,ratings,beersWantToDrinks,tags );
        rating = new Rating(beer, user, 5);
    }

    @Test
    public void createTag_ShouldGetBeerName_WhenCorrectParsedParameters() {
        Assert.assertEquals("BeerName", rating.getBeer().getName());
    }
    @Test
    public void createUser_ShouldGetContent_WhenCorrectParsedParameters() {
        Assert.assertEquals(5, rating.getRating());
    }
    @Test
    public void createUser_ShouldGetUserName_WhenCorrectParsedParameters() {
        Assert.assertEquals("firstName", rating.getUser().getFirstName());
    }
}
