package com.example.demo.model;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "verified_dates")
public class VerifiedDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "profile_id", nullable = false)
    private Long profileId;

    @Column(name = "verified_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date verifiedDate;

    // Constructors
    public VerifiedDate() {
        // Default constructor
    }

    public VerifiedDate(Long profileId) {
        this.profileId = profileId;
        this.verifiedDate = Timestamp.valueOf(LocalDateTime.now()); // Gán ngày hiện tại
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProfileId() {
        return profileId;
    }

    public void setProfileId(Long profileId) {
        this.profileId = profileId;
    }

    public Date getVerifiedDate() {
        return verifiedDate;
    }

    public void setVerifiedDate(LocalDateTime verifiedDate) {
        this.verifiedDate = Timestamp.valueOf(verifiedDate);
    }
}
