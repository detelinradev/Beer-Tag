package com.telerikacademy.beertag.service;

import com.telerikacademy.beertag.models.User;
import com.telerikacademy.beertag.models.dtos.UserDto;
import com.telerikacademy.beertag.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptEncoder;

    @Override
    public User save(final UserDto user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(bCryptEncoder.encode(user.getPassword()));
        newUser.setAge(user.getAge());
        newUser.setEmail(user.getEmail());
        newUser.setRole("USER");
        newUser.setDeleted(false);
        return userRepository.save(newUser);
    }

    @Override
    public User updateCurrentUserPassword(final String password,final User user){
        user.setPassword(bCryptEncoder.encode(password));
        return userRepository.save(user);
    }
    @Override
    public User updateCurrentUserEmail(final String email,final User user){
        user.setEmail(email);
        return userRepository.save(user);
    }
}
