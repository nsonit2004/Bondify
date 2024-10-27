package com.example.demo.repository;

import com.example.demo.model.ReportedUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReportedUserRepository extends JpaRepository<ReportedUser, Long> {
    Optional<ReportedUser> findByReportId(Long id);
}
