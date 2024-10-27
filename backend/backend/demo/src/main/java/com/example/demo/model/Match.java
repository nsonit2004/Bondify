package com.example.demo.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "matches") // Table name in the database
public class Match {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user1_id", nullable = false) // Correct mapping for user1
    private User user1;

    @ManyToOne
    @JoinColumn(name = "user2_id", nullable = false) // Correct mapping for user2
    private User user2;


    private LocalDateTime createdAt; // Timestamp of when the match was created

    // Default constructor
    public Match() {
        this.createdAt = LocalDateTime.now(); // Set the creation time automatically
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser1() {
        return user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return user2;
    }

    public void setUser2(User user2) {
        this.user2 = user2;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    // Optional: Override toString for better logging
    @Override
    public String toString() {
        return "Match{" +
                "id=" + id +
                ", user1=" + (user1 != null ? user1.getEmail() : "null") +
                ", user2=" + (user2 != null ? user2.getEmail() : "null") +
                ", createdAt=" + createdAt +
                '}';
    }

    // Override equals and hashCode for correct comparison
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Match)) return false;
        Match match = (Match) o;
        return Objects.equals(id, match.id) &&
                Objects.equals(user1, match.user1) &&
                Objects.equals(user2, match.user2);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user1, user2);
    }
    }


