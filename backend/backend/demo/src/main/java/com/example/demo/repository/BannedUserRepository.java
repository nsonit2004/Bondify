package com.example.demo.repository;

import com.example.demo.model.BannedUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BannedUserRepository extends JpaRepository<BannedUser, Long> {
Optional<BannedUser> findByBannedId(Long bannedId);
void deleteByBannedId(int bannedId);

}
