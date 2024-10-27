package com.example.demo.model;

import com.fasterxml.jackson.databind.util.JSONWrappedObject;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "banned_users")
public class BannedUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bannedId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_USER"))
    private  User user;

    @ManyToOne
    @JoinColumn(name = "banned_reason_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_REASON"))
    private BannedReason bannedReason;

    @Column(name = "banned_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date bannedDate;

    public Date getBannedDate() {
        return bannedDate;
    }

    public void setBannedDate(Date bannedDate) {
        this.bannedDate = bannedDate;
    }

    public BannedReason getBannedReason() {
        return bannedReason;
    }

    public void setBannedReason(BannedReason bannedReason) {
        this.bannedReason = bannedReason;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getBannedId() {
        return bannedId;
    }

    public void setBannedId(Long bannedId) {
        this.bannedId = bannedId;
    }
}


