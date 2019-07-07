package com.telerikacademy.beertag.controllers;

import com.telerikacademy.beertag.models.Beer;
import com.telerikacademy.beertag.models.Image;
import com.telerikacademy.beertag.payload.UploadFileResponse;
import com.telerikacademy.beertag.repositories.UserRepository;
import com.telerikacademy.beertag.security.AuthenticationService;
import com.telerikacademy.beertag.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/userImage")
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
public class ImageController {

    private final ImageService imageService;
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;


    @PostMapping("/uploadImage")
    public ResponseEntity<Void> uploadFile(@RequestParam("file") final MultipartFile file,
                                           final HttpServletRequest req,@RequestParam(name = "name",required = false) String beerName) {
        System.out.println(11111);
        imageService.storeFile(file, userRepository.findFirstByUsername(authenticationService.getUsername(req)),beerName);
        System.out.println(22222);
        URI fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUri();

        System.out.println(33333);
        return ResponseEntity.created(fileDownloadUri).build();
    }

//    @PostMapping("/uploadMultipleImages")
//    public ResponseEntity<Void> uploadMultipleFiles(@RequestParam("files") final MultipartFile[] files, final HttpServletRequest req) {
//        return Arrays.stream(files)
//                .map(k -> uploadFile(k, req))
//                .collect(Collectors.toList());
//    }

    @GetMapping("/downloadImage")
    public ResponseEntity<byte[]>  downloadFile(final HttpServletRequest req) {
        System.out.println(222222);
        Image dbFile = imageService.getFile(userRepository.findFirstByUsername(
                authenticationService.getUsername(req)).getImage().getId());
        System.out.println(11111);
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.valueOf(dbFile.getFileType()));
        header.setContentLength(dbFile.getData().length);
        header.set("Content-Disposition", "attachment; filename=" + dbFile.getFileName());
        return new ResponseEntity<>(dbFile.getData(), header, HttpStatus.OK);
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(dbFile.getFileType()))
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
//                .body(new ByteArrayResource(dbFile.getData()));
    }
}
