package com.example.demo.controller;

import com.example.demo.model.VerifyRequest;
import com.example.demo.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/verification")
@CrossOrigin(origins = "http://localhost:3000")
public class VerificationController {
    @Autowired
    private VerificationService verificationService;

    @GetMapping("/requests")
    public ResponseEntity<List<VerifyRequest>> getVerifyRequests() {
        List<VerifyRequest> requests = verificationService.getVerifyRequests();
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/verify/{requestId}")
    public ResponseEntity<Void> verifyProfile(@PathVariable Long requestId) {
        verificationService.verifyProfile(requestId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/reject/{requestId}")
    public ResponseEntity<Void> deleteVerifyRequest(@PathVariable Long requestId) {
        verificationService.deleteVerifyRequest(requestId);
        return ResponseEntity.noContent().build();
    }
}
