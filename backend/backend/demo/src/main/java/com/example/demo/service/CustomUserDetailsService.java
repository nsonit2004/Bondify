package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.autoconfigure.task.TaskExecutionProperties;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        System.out.println("User found: " + user.getEmail() + ", Role: " + user.getRole());

        // Handle NULL role and status
        String role = user.getRole() != null ? user.getRole() : "user";
        String status = user.getUserStatus() != null ? user.getUserStatus() : "active"; // Default status
        String isPremium = user.getIsPremium() ? "1" : "0"; // Use "1" or "0"

        // Create a set of authorities
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role)); // Add role authority
        authorities.add(new SimpleGrantedAuthority("STATUS_" + status)); // Add status authority
        authorities.add(new SimpleGrantedAuthority("PREMIUM_" + isPremium)); // Add premium authority

        // Return a UserDetails object with both role and status as authorities
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                authorities // Pass the set of authorities
        );
    }

}
