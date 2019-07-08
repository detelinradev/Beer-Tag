package com.telerikacademy.beertag.serviceTests;

import com.telerikacademy.beertag.models.User;
import com.telerikacademy.beertag.models.dtos.UserDto;
import com.telerikacademy.beertag.repositories.UserRepository;
import com.telerikacademy.beertag.service.UserServiceImpl;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceImplTests {
    @Mock
    private UserRepository userRepositoryMock;
    @Mock
    private BCryptPasswordEncoder bCryptEncoder;

    @InjectMocks
    private UserServiceImpl service;
    @Test
    public void getByUserName_Should_ReturnUser_When_UserWithSameUserNameExit() {
        // Arrange

        UserDto user = new UserDto("firstName","lastName","username",
                "password",18,"email@email.com",true);
        User user1 = new User();

        Mockito.when(userRepositoryMock.findFirstByUsername("username"))
                .thenReturn(user1);


        // Assert
        Assert.assertEquals(user1, service.save(user));
    }

    @Test(expected = Exception.class)
    public void getById_Should_ThrowException_When_UserNotExist() {
        // Arrange
        UserDto user = new UserDto("firstName","lastName","username",
                "password",18,"email@email.com",true);
        User user1 = new User();
        Mockito.when(userRepositoryMock.findFirstByUsername("username"))
                .thenReturn(null);

       //  Act
        User result = service.save(user);
        // Assert
        userRepositoryMock.findFirstByUsername("username");
    }

    @Test
    public void create_Should_CallRepositoryCreate_When_EmployeeNameIsUnique() {
        // Arrange
        UserDto user = new UserDto("firstName","lastName","username",
                "password",18,"email@email.com",true);
        User user1 = new User();
        // Act
        service.save(user);

        // Assert
        Mockito.verify(userRepositoryMock, Mockito.times(1)).save(user1);
    }

//    @Test(expected = IllegalArgumentException.class)
//    public void create_Should_ThrowException_When_EmployeeNameIsNotUnique() {
//        // Arrange
//        Employee newEmployee = new Employee(1, "Name");
//        Mockito.when(userRepositoryMock.getAll())
//                .thenReturn(Arrays.asList(
//                        new Employee(1, "Name1"),
//                        new Employee(2, "Name"),
//                        new Employee(3, "Name3")
//                ));
//
//        // Act
//        service.create(newEmployee);
//
//        // Assert
//        Mockito.verify(userRepositoryMock, Mockito.never()).create(newEmployee);
//    }

}
