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
import java.util.Optional;

@CrossOrigin(maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;
    private final UserService userService;


    @GetMapping(value = "api/me")
    public ResponseEntity<User> getUserOwnInfo(final HttpServletRequest req) {

        return Optional
                .ofNullable( userRepository.findFirstByUsername(
                        authenticationService.getUsername(req)) )
                .map( user -> ResponseEntity.ok().body(user) )
                .orElseGet( () -> ResponseEntity.notFound().build() );

    }
    @PatchMapping(value = "api/me/update-password")
    public ResponseEntity<User> updateUserOwnInfo(@RequestParam final String password,final HttpServletRequest req){

        return Optional
                .ofNullable( userService.updateCurrentUserPassword(password,userRepository.findFirstByUsername(
                        authenticationService.getUsername(req))) )
                .map( user -> ResponseEntity.ok().body(user) )
                .orElseGet( () -> ResponseEntity.badRequest().build() );

    }
    @PatchMapping(value = "api/me/update-email")
    public ResponseEntity<User> updateUserOwnEmail(@RequestParam final String email,final HttpServletRequest req){
        return Optional
                .ofNullable( userService.updateCurrentUserEmail(email,userRepository.findFirstByUsername(
                authenticationService.getUsername(req))) )
                .map( user -> ResponseEntity.ok().body(user) )
                .orElseGet( () -> ResponseEntity.badRequest().build() );
    }

    @PostMapping(value = "api/sign-up")
    public ResponseEntity<User> save(@Valid @RequestBody final UserDto user) {
        return new ResponseEntity<>(userService.save(user), HttpStatus.OK);
    }

}
