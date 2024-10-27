package com.example.demo.repository;

import com.example.demo.model.VerifyRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VerifyRequestRepository extends JpaRepository<VerifyRequest, Long> {
    List<VerifyRequest> findByStatus(String status);
}
