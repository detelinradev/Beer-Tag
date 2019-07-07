package com.telerikacademy.beertag.service;

import com.telerikacademy.beertag.models.Beer;
import com.telerikacademy.beertag.models.Image;
import com.telerikacademy.beertag.models.User;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    void storeFile(MultipartFile file, User user, String beerName);

    Image getFile(int fileId);
}
