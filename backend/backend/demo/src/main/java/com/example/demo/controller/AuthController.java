package com.example.demo.controller;

import com.example.demo.dto.HobbyRequest;
import com.example.demo.dto.SwipeRequest;
import com.example.demo.dto.UserProfileRequest;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.service.CustomUserDetailsService;
import com.example.demo.service.UserService;
import com.example.demo.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.mail.MessagingException;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")  // Allow requests from the React frontend
public class AuthController {


    private final CustomUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProvinceRepository provinceRepository;
    @Autowired
    private DistrictRepository districtRepository;
    @Autowired
    private ReportedUserRepository reportedUserRepository;
    @Autowired
    private BannedUserRepository bannedUserRepository;
    @Autowired
    private BannedReasonRepository bannedReasonRepository;


    public AuthController(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        // Sử dụng findByEmail và kiểm tra giá trị trả về
        User existingUser = userRepository.findByEmail(user.getEmail()).orElse(null);
        // Tìm kiếm province và district dựa trên ID
        Province province = provinceRepository.findById(user.getProvince().getId()).orElse(null);
        District district = districtRepository.findById(user.getDistrict().getId()).orElse(null);


        if (existingUser != null) {
            return ResponseEntity.badRequest().body("{\"error\": \"Email is already registered.\"}");
        }

        // Gán các đối tượng đã tìm thấy vào user
        user.setProvince(province);
        user.setDistrict(district);

        try {
            User savedUser = userService.registerUser(user);
            return ResponseEntity.ok("{\"message\": \"Registration successful. Verification code sent to email.\"}");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("{\"error\": \"Error sending verification email.\"}");
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestParam String email, @RequestParam String code) {
        boolean isVerified = userService.verifyCode(email, code);
        if (isVerified) {
            User user = userService.getPendingUser(email); // Retrieve the user from the temporary store
            if (user != null) {
                userService.saveUser(user); // Save the user in the database
                return ResponseEntity.ok("{\"message\": \"Verification successful. User registered.\"}");
            } else {
                return ResponseEntity.status(500).body("{\"error\": \"Error fetching user details.\"}");
            }
        } else {
            return ResponseEntity.badRequest().body("{\"error\": \"Invalid verification code.\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return userService.verifyLogin(loginRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("{\"message\": \"Logout successful.\"}");
    }

    @PostMapping("/checklogin")
    public ResponseEntity<String> checkLogin(Principal principal) {
        if (principal != null) {
            return ResponseEntity.ok("{\"loggedIn\": true}");
        } else {
            return ResponseEntity.ok("{\"loggedIn\": false}");
        }
    }


    @PostMapping("/forgotpassword")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("{\"error\": \"Email is required.\"}");
        }

        try {
            userService.sendPasswordResetCode(email);
            return ResponseEntity.ok("{\"message\": \"Verification code sent to email.\"}");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("{\"error\": \"Error sending email.\"}");
        }
    }

    @PostMapping("/resetpassword")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        String newPassword = request.get("newPassword");

        if (email == null || code == null || newPassword == null) {
            return ResponseEntity.badRequest().body("{\"error\": \"Missing email, code, or password.\"}");
        }

        boolean isVerified = userService.verifyResetCode(email, code);
        if (!isVerified) {
            return ResponseEntity.badRequest().body("{\"error\": \"Invalid verification code.\"}");
        }

        userService.updatePassword(email, newPassword);
        return ResponseEntity.ok("{\"message\": \"Password reset successful.\"}");
    }

    @PostMapping("/swipe")
    public ResponseEntity<String> swipe(@RequestBody SwipeRequest swipeRequest) {
        Optional<User> optionalUser = userService.findByEmail(swipeRequest.getUserEmail());
        Optional<User> optionalTargetUser = userService.findByEmail(swipeRequest.getTargetUserEmail());

        // Kiểm tra nếu một trong hai User không tồn tại
        if (!optionalUser.isPresent() || !optionalTargetUser.isPresent()) {
            return ResponseEntity.badRequest().body("{\"error\": \"User not found.\"}");
        }

        // Lấy giá trị User từ Optional
        User user = optionalUser.get();
        User targetUser = optionalTargetUser.get();

        // Gọi phương thức swipe
        userService.swipe(user, targetUser, swipeRequest.getAction());

        return ResponseEntity.ok("{\"message\": \"Swipe recorded.\"}");
    }

    @PostMapping("/hobbies")
    public ResponseEntity<String> saveHobbies(@RequestBody HobbyRequest hobbyRequest) {
        // Log email từ request để kiểm tra xem có được truyền đúng không
        System.out.println("Received email: " + hobbyRequest.getEmail());

        // Kiểm tra trong database có user tương ứng không
        User user = userRepository.findByEmail(hobbyRequest.getEmail()).orElse(null);
        if (user == null) {
            System.out.println("User not found for email: " + hobbyRequest.getEmail());
            return ResponseEntity.badRequest().body("{\"error\": \"User not found.\"}");
        }

        // Nếu tìm thấy user
        try {
            userService.saveUserHobbies(user.getId(), hobbyRequest.getHobbies());
            return ResponseEntity.ok("{\"message\": \"Hobbies saved successfully.\"}");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/saveUserProfile")
    public ResponseEntity<String> saveUserProfile(@RequestBody UserProfileRequest userProfileRequest) {
        try {
            System.out.println("Received User ID: " + userProfileRequest.getUserId()); // In ra userId nhận được
            userService.saveUserProfile(
                    userProfileRequest.getUserId(),
                    userProfileRequest.getFirstName(),
                    userProfileRequest.getBio(),
                    userProfileRequest.getGender(),
                    userProfileRequest.getInterestedIn()
            );

            return ResponseEntity.ok("{\"message\": \"Profile saved successfully.\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\": \"Error saving profile.\"}");
        }
    }

    @PostMapping("/getID")
    public ResponseEntity<?> getID(@RequestParam String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            System.out.println("User not found for email: " + email);
            return ResponseEntity.badRequest().body("{\"error\": \"User not found.\"}");
        }
        return ResponseEntity.ok(Map.of("userID", user.getId()));
    }

    //    @PreAuthorize("hasRole('admin')")
    @PostMapping("/getBannedList")
    public ResponseEntity<List<BannedUser>> getBannedList() {
        List<BannedUser> bannedUsers = userService.getAllBannedUsers(); // Retrieve the list of banned users
        if (bannedUsers.isEmpty())
            return ResponseEntity.noContent().build(); // Return 204 No Content if the list is empty
        return ResponseEntity.ok(bannedUsers); // Return 200 OK with the list of banned users
    }

    @PostMapping("/getReportedList")
    public ResponseEntity<List<ReportedUser>> getReportedList() {
        List<ReportedUser> reportedUsers = userService.getAllReportedUsers();
        if (reportedUsers.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(reportedUsers);
    }

    @PostMapping("/getBannedReasons")
    public ResponseEntity<List<BannedReason>> getBannedReasons() {
        List<BannedReason> bannedReasons = bannedReasonRepository.findAll();
        if (bannedReasons.isEmpty())
            return ResponseEntity.noContent().build();
        return ResponseEntity.ok(bannedReasons);
    }


    @PostMapping("/ban")
    public ResponseEntity<?> ban(@RequestBody BanRequest banRequest) {
        try {
            // Create and set up BannedUser entity
            BannedUser bannedUser = new BannedUser();

            // Validate and parse the user ID
            long userId;
            try {
                userId = Long.parseLong(banRequest.getUserId());
                bannedUser.setUser(userRepository.findById(userId).orElse(null));
            } catch (NumberFormatException e) {
                return ResponseEntity
                        .badRequest()
                        .body("Invalid User ID format.");
            }

            // Find and set the BannedReason
            Optional<BannedReason> bannedReason = bannedReasonRepository.findById(Long.parseLong(banRequest.getBannedReasonId()));
            if (!bannedReason.isPresent()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Banned Reason not found for ID: " + banRequest.getBannedReasonId());
            }
            bannedUser.setBannedReason(bannedReason.get());

            // Save the BannedUser to the database
            bannedUserRepository.save(bannedUser);
            Optional<ReportedUser> reportedUser = reportedUserRepository.findByReportId(Long.parseLong(banRequest.getReportId()));
            if (reportedUser.isPresent())
                reportedUserRepository.delete(reportedUser.get());
            // Return success response
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("User with ID " + userId + " successfully banned.");

        } catch (Exception e) {
            // Handle unexpected errors
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while banning the user: " + e.getMessage());
        }
    }


    @PostMapping("/unban")
    public ResponseEntity<?> unban(@RequestParam String bannedId) {
        Optional<BannedUser> bannedUser = bannedUserRepository.findByBannedId(Long.parseLong(bannedId));
        if (bannedUser.isPresent()) {
            bannedUserRepository.delete(bannedUser.get());
            return ResponseEntity.ok("{\"message\": \"User unbanned successfully.\"}");
        }
        return ResponseEntity.badRequest().body("{\"error\": \"User not found.\"}");
    }


//    @PostMapping("/verifyUser")
//    public ResponseEntity<?> verifyUser(@RequestParam String email) {
//        return updateUserStatus(email, "verified", "Verified successfully.");
//    }
//
//    private ResponseEntity<?> updateUserStatus(String email, String status, String successMessage) {
//        if (email == null || email.isEmpty()) {
//            return ResponseEntity.status(400).body("{\"error\": \"Requesting Email is not specified\"}");
//        }
//
//        userService.findByEmail(email).ifPresent(user -> {
//            user.setUserStatus(status);
//        });
//
//        return ResponseEntity.ok("{\"message\": \"" + successMessage + "\"}");
//    }


    @PostMapping("/reportUser")
    public ResponseEntity<?> reportUser(@RequestBody ReportRequest reportRequest) {
        try {
            // Create and set up BannedUser entity
            ReportedUser reportedUser = new ReportedUser();

            Optional<User> sender = userService.findById(Long.parseLong(reportRequest.getSenderId()));
            if (!sender.isPresent()) {
                return ResponseEntity.status(400).body("{\"error\": \"User not found.\"}");
            }
            reportedUser.setSender(sender.get());

            // Find and set the BannedReason
            Optional<User> target = userService.findById(Long.parseLong(reportRequest.getTargetId()));
            if (!target.isPresent()) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Banned Reason not found for ID: " + reportRequest.getTargetId());
            }
            reportedUser.setTarget(target.get());

            // Save the BannedUser to the database
            reportedUserRepository.save(reportedUser);

            // Return success response
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Your report has been sent");

        } catch (Exception e) {
            // Handle unexpected errors
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred: " + e.getMessage());
        }

    }

    @Autowired
    private VerificationService verificationService;

    @GetMapping("/verifyUser/requests")
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