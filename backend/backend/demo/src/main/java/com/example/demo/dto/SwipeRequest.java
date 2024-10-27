package com.example.demo.dto;

public class SwipeRequest {
    private String userEmail;
    private String targetUserEmail;
    private String action; // "like" or "pass"

    // Getters and Setters
    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getTargetUserEmail() {
        return targetUserEmail;
    }

    public void setTargetUserEmail(String targetUserEmail) {
        this.targetUserEmail = targetUserEmail;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}
