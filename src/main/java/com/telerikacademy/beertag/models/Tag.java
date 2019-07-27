package com.telerikacademy.beertag.models;

import com.telerikacademy.beertag.models.base.MappedAudibleBase;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Tag extends MappedAudibleBase {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "beer",nullable = false)
    private Beer beer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user",nullable = false)
    private User user;

    @Column(unique = true,nullable = false)
    @NotEmpty(message = "Please write some content")
    private String content;

}
