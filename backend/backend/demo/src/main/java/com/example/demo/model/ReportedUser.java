package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reported_users")
public class ReportedUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @ManyToOne
    @JoinColumn(name = "sender_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_SENDER"))
    private User sender;

    @ManyToOne
    @JoinColumn(name = "target_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_TARGET"))
    private User target;

    @Column(length = 250)
    private String reason;

    // Getters and Setters

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public User getTarget() {
        return target;
    }

    public void setTarget(User target) {
        this.target = target;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}

