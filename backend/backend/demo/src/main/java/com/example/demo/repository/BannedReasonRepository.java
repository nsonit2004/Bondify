package com.example.demo.repository;

import com.example.demo.model.BannedReason;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BannedReasonRepository extends JpaRepository<BannedReason, Long> {

    public Optional<BannedReason> findById(Long bannedReasonId);

}
