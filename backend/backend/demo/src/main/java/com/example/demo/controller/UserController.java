package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/premium")
    public List<User> getPremiumUsers() {
        return userService.findPremiumUsers();
    }

    @PutMapping("/{userId}/premium")
    public User togglePremium(@PathVariable Long userId) {
        // Tìm User từ userId
        User user = userService.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Gọi phương thức togglePremiumStatus với user đã tìm được
        userService.togglePremiumStatus(user);

        // Lưu lại User sau khi thay đổi trạng thái
        return userService.save(user);
    }

    @GetMapping("/allCards")
    public List<Map<String, Object>> getAllCards() {
        return userService.getAllCards();
    }

}
