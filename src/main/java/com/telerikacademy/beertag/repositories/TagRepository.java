package com.telerikacademy.beertag.repositories;

import com.telerikacademy.beertag.models.Beer;
import com.telerikacademy.beertag.models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag,Integer> {
    @Query("SELECT t.beer FROM Tag t JOIN Beer b ON t.beer = b.id " +
            "WHERE t.deleted = false AND t.content =:content ")
    List<Beer> findByTagsContent(@Param("content") String content);

}
