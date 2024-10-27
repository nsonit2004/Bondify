package com.example.demo.repository;

import com.example.demo.model.Match;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    boolean existsByUser1AndUser2(User user1, User user2);
    boolean existsByUser2AndUser1(User user2, User user1);
}
