package com.telerikacademy.beertag.service;

import com.telerikacademy.beertag.models.Image;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    Image storeFile(MultipartFile file);

    Image getFile(int fileId);
}
