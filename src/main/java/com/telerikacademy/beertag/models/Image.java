package com.telerikacademy.beertag.models;

import com.telerikacademy.beertag.models.base.MappedAudibleBase;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Image extends MappedAudibleBase {

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String contentType;

    @Lob
    @Column(nullable = false)
    private byte[] data;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user",unique = true)
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "beer",unique = true)
    private Beer beer;

    public Image(String fileName, String contentType, byte[] data, User user) {
        this.fileName = fileName;
        this.contentType = contentType;
        this.data = data;
        this.user = user;
    }

    public Image(String fileName, String contentType, byte[] data, Beer beer) {
        this.fileName = fileName;
        this.contentType = contentType;
        this.data = data;
        this.beer = beer;
    }
}
