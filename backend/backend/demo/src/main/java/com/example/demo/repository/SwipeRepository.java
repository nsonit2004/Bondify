package com.example.demo.repository;

import com.example.demo.model.Swipe;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SwipeRepository extends JpaRepository<Swipe, Long> {
    List<Swipe> findByUserAndAction(User user, String action);
    List<Swipe> findByTargetUserAndAction(User targetUser, String action);

    // New method to check for a specific action (like) between two users
    boolean existsByUserAndTargetUserAndAction(User user, User targetUser, String action);
}
