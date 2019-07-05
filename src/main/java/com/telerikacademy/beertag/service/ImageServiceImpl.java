package com.telerikacademy.beertag.service;

import com.telerikacademy.beertag.exceptions.FileStorageException;
import com.telerikacademy.beertag.exceptions.MyFileNotFoundException;
import com.telerikacademy.beertag.models.Image;
import com.telerikacademy.beertag.repositories.UserImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@Service
public class ImageServiceImpl implements ImageService {

    private final UserImageRepository userImageRepository;

    public Image storeFile(final MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            Image dbFile = new Image(fileName, file.getContentType(),file.getBytes());

            return userImageRepository.save(dbFile);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Image getFile(final int fileId) {
        return userImageRepository.findById(fileId)
                .orElseThrow(() -> new MyFileNotFoundException("File not found with userImageId " + fileId));
    }
}
