package com.telerikacademy.beertag.controllersTests;

import com.telerikacademy.beertag.models.dtos.UserDto;
import com.telerikacademy.beertag.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTests {
    @MockBean
    UserService userServiceMock;

    @Autowired
    MockMvc mockMvc;

    @Test
    public void postNewUser_Should_ReturnStatusOK_When_UserIsCreated() throws Exception {
        // Arrange
        RequestBuilder request = MockMvcRequestBuilders
                .post("/api/sign-up")
                .accept(MediaType.APPLICATION_JSON)
                .content("{\"firstName\":\"firstName\",\"lastName\":\"lastName\",\"username\":\"username\",\"password\":\"password\"}")
                .contentType(MediaType.APPLICATION_JSON);

        // Act
        mockMvc.perform(request)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();
    }

    @Test
    public void postNewUser_Should_ReturnStatusOK_When_UserIsNotCreated() throws Exception {
        // Arrange
        UserDto userDto = new UserDto("firstName","lastName","username","password",18);
        Mockito.when(userServiceMock.save(userDto))
                .thenThrow(IllegalArgumentException.class);

        // Act
        mockMvc.perform(MockMvcRequestBuilders.post("/api/sign-up"))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }
}
