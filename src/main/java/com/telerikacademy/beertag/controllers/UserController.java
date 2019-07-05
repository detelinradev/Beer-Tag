package com.telerikacademy.beertag.controllers;

import com.telerikacademy.beertag.models.User;
import com.telerikacademy.beertag.models.dtos.UserDto;
import com.telerikacademy.beertag.repositories.UserRepository;
import com.telerikacademy.beertag.security.AuthenticationService;
import com.telerikacademy.beertag.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;
    private final UserService userService;


    @GetMapping(value = "api/me")
    public ResponseEntity<User> getUserOwnInfo(final HttpServletRequest req) {

        return new ResponseEntity<>(userRepository.findFirstByUsername(
                authenticationService.getUsername(req)), HttpStatus.OK);
    }
    @PatchMapping(value = "api/me/update-password")
    public ResponseEntity<User> updateUserOwnInfo(@Valid @RequestParam final String password,final HttpServletRequest req){
       return new ResponseEntity<>(userService.updateCurrentUserPassword(password,userRepository.findFirstByUsername(
                authenticationService.getUsername(req))), HttpStatus.OK);
    }
    @PatchMapping(value = "api/me/update-email")
    public ResponseEntity<User> updateUserOwnEmail(@Valid @RequestParam final String email,final HttpServletRequest req){
        return new ResponseEntity<>( userService.updateCurrentUserEmail(email,userRepository.findFirstByUsername(
                authenticationService.getUsername(req))), HttpStatus.OK);
    }

    @PostMapping(value = "api/sign-up")
    public ResponseEntity<User> save(@Valid @RequestBody final UserDto user) {
        return new ResponseEntity<>(userService.save(user), HttpStatus.OK);
    }

}
