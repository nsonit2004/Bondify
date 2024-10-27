package com.example.demo.repository;

import com.example.demo.model.Hobby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HobbyRepository extends JpaRepository<Hobby, Long> {
    void deleteByUserId(Long userId);
    List<Hobby> findByUserId(Long userId); // Optional: If you want to retrieve hobbies by userId
}
