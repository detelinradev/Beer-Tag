package com.telerikacademy.beertag.modelsTests;

import com.telerikacademy.beertag.models.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

public class TagTests {
    private Tag tag;
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
        tag = new Tag(beer, user, "content");
    }

    @Test
    public void createTag_ShouldGetBeerName_WhenCorrectParsedParameters() {
        Assert.assertEquals("BeerName", tag.getBeer().getName());
    }
    @Test
    public void createTag_ShouldGetContent_WhenCorrectParsedParameters() {
        Assert.assertEquals("content", tag.getContent());
    }
    @Test
    public void createTag_ShouldGetUserName_WhenCorrectParsedParameters() {
        Assert.assertEquals("firstName", tag.getUser().getFirstName());
    }


    @Test
    public void createTag_ShouldGetFirstName_WhenCorrectParsedParameters() {
        Assert.assertEquals("firstName", tag.getUser().getFirstName());
    }
    @Test
    public void createTag_ShouldGetLastName_WhenCorrectParsedParameters() {
        Assert.assertEquals("lastName", tag.getUser().getLastName());
    }
    @Test
    public void createTag_ShouldGetUsername_WhenCorrectParsedParameters() {
        Assert.assertEquals("username", tag.getUser().getUsername());
    }
    @Test
    public void createTag_ShouldGetEmail_WhenCorrectParsedParameters() {
        Assert.assertEquals("email@gmail.com", tag.getUser().getEmail());
    }
    @Test
    public void createTag_ShouldGetAge_WhenCorrectParsedParameters() {
        Assert.assertEquals(20, tag.getUser().getAge());
    }
    @Test
    public void createTag_ShouldGetPassword_WhenCorrectParsedParameters() {
        Assert.assertEquals("password", tag.getUser().getPassword());
    }
    @Test
    public void createTag_ShouldGetRole_WhenCorrectParsedParameters() {
        Assert.assertEquals("USER", tag.getUser().getRole());
    }
    @Test
    public void createTag_ShouldGetIsDeleted_WhenCorrectParsedParameters() {
        Assert.assertFalse(tag.isDeleted());
    }

}
