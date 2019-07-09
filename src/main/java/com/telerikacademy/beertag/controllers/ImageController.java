package com.telerikacademy.beertag.controllers;

import com.telerikacademy.beertag.models.Image;
import com.telerikacademy.beertag.repositories.UserRepository;
import com.telerikacademy.beertag.security.AuthenticationService;
import com.telerikacademy.beertag.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/image")
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
public class ImageController {

    private final ImageService imageService;
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;


    @PostMapping("/uploadBeerImage")
    public ResponseEntity<Void> uploadFile(@RequestParam(value = "file")
                                               final MultipartFile file, @RequestParam("beerID")final int beerID) {
        imageService.storeBeerImage(file, beerID);
        URI fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUri();

        return ResponseEntity.created(fileDownloadUri).build();
    }

    @PostMapping("/uploadUserImage")
    public ResponseEntity<Void> uploadFile(@RequestParam("file") final MultipartFile file,
                                           final HttpServletRequest req) {
        imageService.storeUserImage(file, userRepository.findFirstByUsername(authenticationService.getUsername(req)));
        URI fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUri();

        return ResponseEntity.created(fileDownloadUri).build();
    }


    @GetMapping("/downloadImage")
    public ResponseEntity<byte[]> downloadFile(final HttpServletRequest req) {
        Image dbFile = imageService.getFile(userRepository.findFirstByUsername(
                authenticationService.getUsername(req)).getImage().getId());
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf(dbFile.getContentType()));
        header.setContentLength(dbFile.getData().length);
        header.set("Content-Disposition", "attachment; filename=" + dbFile.getFileName());
        return new ResponseEntity<>(dbFile.getData(), header, HttpStatus.OK);
    }
}
