package com.telerikacademy.beertag.service;

import com.telerikacademy.beertag.models.Image;
import com.telerikacademy.beertag.models.User;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    Image storeFile(MultipartFile file, User user);

    Image getFile(int fileId);
}
