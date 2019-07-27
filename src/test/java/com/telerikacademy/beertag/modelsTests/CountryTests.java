package com.telerikacademy.beertag.modelsTests;

import com.telerikacademy.beertag.models.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.util.HashSet;
import java.util.Set;

public class CountryTests {
    private Country country;
    @Before
    public void InitVariables() {
        country = new Country("countryCode", "countryName", "code");
    }
    @Test
    public void createCountry_ShouldGetCountryCode_WhenCorrectParsedParameters() {
        Assert.assertEquals("countryCode", country.getCountryCode());
    }
    @Test
    public void createCountry_ShouldGetCountryName_WhenCorrectParsedParameters() {
        Assert.assertEquals("countryName", country.getCountryName());
    }
    @Test
    public void createCountry_ShouldGetCode_WhenCorrectParsedParameters() {
        Assert.assertEquals("code", country.getCode());
    }
}
