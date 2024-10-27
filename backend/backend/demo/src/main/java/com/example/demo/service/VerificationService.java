package com.example.demo.service;

import com.example.demo.model.UserProfile;
import com.example.demo.model.VerifiedDate;
import com.example.demo.model.VerifyRequest;
import com.example.demo.repository.UserProfileRepository;
import com.example.demo.repository.VerifiedDateRepository;
import com.example.demo.repository.VerifyRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.exception.ResourceNotFoundException; // Điều chỉnh theo gói của bạn

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VerificationService {
    @Autowired
    private VerifyRequestRepository verifyRequestRepository;

    @Autowired
    private VerifiedDateRepository verifiedDateRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;


    public List<VerifyRequest> getVerifyRequests() {
        return verifyRequestRepository.findByStatus("unverified");
    }

    public void verifyProfile(Long requestId) {
        VerifyRequest request = verifyRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));

        VerifiedDate verifiedDate = new VerifiedDate();
        verifiedDate.setProfileId(request.getProfileId());
        verifiedDate.setVerifiedDate(LocalDateTime.now());
        verifiedDateRepository.save(verifiedDate);

        verifyRequestRepository.delete(request);

    }

    public void deleteVerifyRequest(Long requestId) {

        VerifyRequest request = verifyRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found"));
        verifyRequestRepository.delete(request);

    }
}
