package com.telerikacademy.beertag.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.telerikacademy.beertag.models.base.MappedAudibleBase;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity

public class Beer extends MappedAudibleBase {

    @Column(nullable = false,unique = true)
    @Size(min = 1,max = 20,message = "Please enter name between 1 and 20 characters")
    @Pattern(regexp = "^[A-Za-z]+$",message = "Beer name must contain only letters")
    private String name;

    @Size(max = 20,message = "Please enter brewery name between 1 and 20 characters")
    @Pattern(regexp = "^[A-Za-z]+$",message = "Brewery name must contain only letters")
    private String breweryName;

    @Column
    @Range(max = 20)
    private int alcoholByVolume;

    @Column(nullable = false)
    @Size(min = 1,max = 200,message = "Please enter description between 1 and 200 characters")
    private String description;

    private String beerStyle;

    private String country;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image",unique = true)
    private Image image;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "beer")
    @JsonIgnore
    private Set<BeersDrunk> beerDrunks = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "beer")
    @JsonIgnore
    private Set<Rating> ratings = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "beer")
    @JsonIgnore
    private Set<BeersWantToDrink> beersWantToDrinks = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "beer")
    @JsonIgnore
    private Set<Tag> tags = new HashSet<>();

}
