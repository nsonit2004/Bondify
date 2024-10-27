package com.example.demo;

import com.example.demo.model.BannedUser;
import com.example.demo.model.User;
import com.example.demo.repository.BannedUserRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AuthenticationManager;

import java.util.List;
import java.util.Optional;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.demo.repository")
public class DemoApplication implements CommandLineRunner {

    @Autowired
    JWTService jwtService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    private JWTService jWTService;

    @Autowired
    private BannedUserRepository bannedUserRepository;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
        System.out.println("Hi");
    }
    @Override
    public void run(String... args) throws Exception {
        List<BannedUser> bannedUsers = bannedUserRepository.findAll();
        for (BannedUser bannedUser : bannedUsers) {
            System.out.println(bannedUser.getBannedId());
        }
    }

}
