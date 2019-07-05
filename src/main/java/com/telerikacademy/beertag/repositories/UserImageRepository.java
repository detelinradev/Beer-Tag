package com.telerikacademy.beertag.repositories;

import com.telerikacademy.beertag.models.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserImageRepository extends JpaRepository<Image,Integer> {

}
