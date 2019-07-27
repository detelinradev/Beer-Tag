package com.telerikacademy.beertag.models;

import com.telerikacademy.beertag.models.base.MappedAudibleBase;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Rating extends MappedAudibleBase {

    @ManyToOne
    @JoinColumn(name = "beer", nullable = false)
    private Beer beer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @Column(nullable = false)
    @Range(min = 1, max = 10,message = "Please enter rate in range of 1 to 10")
    private int rating;

}

