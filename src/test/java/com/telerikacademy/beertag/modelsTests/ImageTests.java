package com.telerikacademy.beertag.modelsTests;

import com.telerikacademy.beertag.models.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

public class ImageTests {
    private Image image1;
    private Image image2;
    private Beer beer;
    private User user;
    byte[] data;
    @Before
    public void InitVariables() {
        Image image = new Image();
        Set<BeersDrunk> beerDrunks = new HashSet<>();
        Set<Rating> ratings = new HashSet<>();
        Set<BeersWantToDrink> beersWantToDrinks = new HashSet<>();
        Set<Tag> tags = new HashSet<>();
        data = new byte[0];
        user = new User("firstName","lastName","username",
                "email@gmail.com",20,"password","USER",image, beerDrunks, ratings, beersWantToDrinks, tags);
        beer = new Beer("BeerName","BreweryName",4,"Description",
                "BeerStyle","Country",image,beerDrunks,ratings,beersWantToDrinks,tags );
        image1 = new Image("fileName", "contentType", data, beer);
        image2 = new Image("fileName", "contentType", data, user);
    }

    @Test
    public void createImage_ShouldGetFileName_WhenCorrectParsedParameters() {
        Assert.assertEquals("fileName", image1.getFileName());
    }
    @Test
    public void createImage_ShouldGetContentType_WhenCorrectParsedParameters() {
        Assert.assertEquals("contentType", image1.getContentType());
    }
    @Test
    public void createImage_ShouldGetData_WhenCorrectParsedParameters() {
        Assert.assertEquals(data, image1.getData());
    }
}
