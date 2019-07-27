package com.telerikacademy.beertag.models;

import com.telerikacademy.beertag.models.base.MappedAudibleBase;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class BeersWantToDrink extends MappedAudibleBase {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "beer",nullable = false)
    private Beer beer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user",nullable = false)
    private User user;


}
