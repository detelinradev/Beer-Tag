package com.telerikacademy.beertag.service;

import com.telerikacademy.beertag.models.User;
import com.telerikacademy.beertag.models.dtos.UserDto;

public interface UserService {

    User save(UserDto user);

    User updateCurrentUserPassword(String password, User user);

    User updateCurrentUserEmail(String password,User user);
}
