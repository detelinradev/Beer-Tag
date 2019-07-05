package com.telerikacademy.beertag;

import com.telerikacademy.beertag.controllers.UserController;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BeerTagApplicationTests {

    @Autowired
    private UserController controller;


    @Test
    public void contextLoads() {
        assertNotNull(controller);
    }

}
