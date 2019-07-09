package com.telerikacademy.beertag.modelsTests;

import com.telerikacademy.beertag.models.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

public class UserTests {
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
    }

    @Test
    public void createUser_ShouldGetFirstName_WhenCorrectParsedParameters() {
        Assert.assertEquals("firstName", user.getFirstName());
    }
    @Test
    public void createUser_ShouldGetLastName_WhenCorrectParsedParameters() {
        Assert.assertEquals("lastName", user.getLastName());
    }
    @Test
    public void createUser_ShouldGetUsername_WhenCorrectParsedParameters() {
        Assert.assertEquals("username", user.getUsername());
    }
    @Test
    public void createUser_ShouldGetEmail_WhenCorrectParsedParameters() {
        Assert.assertEquals("email@gmail.com", user.getEmail());
    }
    @Test
    public void createUser_ShouldGetAge_WhenCorrectParsedParameters() {
        Assert.assertEquals(20, user.getAge());
    }
    @Test
    public void createUser_ShouldGetPassword_WhenCorrectParsedParameters() {
        Assert.assertEquals("password", user.getPassword());
    }
    @Test
    public void createUser_ShouldGetRole_WhenCorrectParsedParameters() {
        Assert.assertEquals("USER", user.getRole());
    }
    @Test
    public void createUser_ShouldGetIsDeleted_WhenCorrectParsedParameters() {
        Assert.assertFalse(user.isDeleted());
    }

}
