package com.telerikacademy.beertag.payload;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UploadFileResponse {
    private String fileName;
    private String fileDownloadUri;
    private String fileType;
    private long size;

}
