package com.example.demo.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class BanRequest {
    private String bannedReasonId;
    private String userId;
    private String reportId;

    public String getBannedReasonId() {
        return bannedReasonId;
    }

    public void setBannedReasonId(String bannedReasonId) {
        this.bannedReasonId = bannedReasonId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getReportId() {
        return reportId;
    }

    public void setReportId(String reportId) {
        this.reportId = reportId;
    }
}
