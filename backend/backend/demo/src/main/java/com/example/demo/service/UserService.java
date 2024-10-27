package com.example.demo.service;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    private SwipeRepository swipeRepository;
    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private BannedUserRepository bannedUserRepository;

    @Autowired
    private ReportedUserRepository reportedUserRepository;

    @Autowired
    JWTService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    private Map<String, String> verificationCodes = new HashMap<>();
    private Map<String, User> pendingUsers = new HashMap<>(); // Bộ nhớ tạm cho người dùng chưa xác minh
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean isEmailRegistered(String email) {
        return userRepository.findByEmail(email) != null;
    }

    public User registerUser(User user) throws MessagingException {
        String verificationCode = generateRandomCode();
        verificationCodes.put(user.getEmail(), verificationCode);

        pendingUsers.put(user.getEmail(), user);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        emailSenderService.sendSimpleEmail(user.getEmail(),
                "Email Verification",
                "Your Email Verification Code Is: " + verificationCode);
        return user; // Trả về đối tượng User đã lưu
    }

    public void sendPasswordResetCode(String email) throws MessagingException {
        String resetCode = generateRandomCode();
        verificationCodes.put(email, resetCode);
        emailSenderService.sendSimpleEmail(email, "Password Reset Code", "Your password reset code is: " + resetCode);
    }

    public boolean verifyResetCode(String email, String code) {
        String storedCode = verificationCodes.get(email);
        return storedCode != null && storedCode.equals(code.trim());
    }

    public void updatePassword(String email, String newPassword) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Mã hóa mật khẩu mới
            String encodedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(encodedPassword);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }


    public boolean verifyCode(String email, String code) {
        String storedCode = verificationCodes.get(email);


        System.out.println("Stored code: " + storedCode);
        System.out.println("User code: " + code.trim());

        if (storedCode != null && storedCode.equals(code.trim())) {
            verificationCodes.remove(email);
            return true;
        }
        return false;
    }

    public ResponseEntity<?> verifyLogin(LoginRequest loginRequest) {
        try {
            // Authenticate the user using the authentication manager
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            if (authentication.isAuthenticated()) {
                UserDetails userDetails = (UserDetails) authentication.getPrincipal();
                String email = userDetails.getUsername();
                String status = userDetails.getAuthorities().stream()
                        .filter(grantedAuthority -> grantedAuthority.getAuthority().startsWith("STATUS_")) // Filter by status
                        .findFirst()
                        .map(GrantedAuthority::getAuthority)
                        .orElse("STATUS_active") // Fallback to "active" if no status found
                        .replace("STATUS_", "");

                // Lấy role từ authorities
                String role = userDetails.getAuthorities().stream()
                        .filter(grantedAuthority -> grantedAuthority.getAuthority().startsWith("ROLE_"))
                        .findFirst()
                        .map(grantedAuthority -> grantedAuthority.getAuthority().replace("ROLE_", ""))
                        .orElse("user");

                // Kiểm tra trạng thái premium
                String isPremium = userDetails.getAuthorities().stream()
                        .filter(grantedAuthority -> grantedAuthority.getAuthority().startsWith("PREMIUM_"))
                        .findFirst()
                        .map(GrantedAuthority::getAuthority)
                        .orElse("0")
                        .replace("PREMIUM_", "");

                return ResponseEntity.ok(Map.of("token", jwtService.generateToken(email, role, status, isPremium)));

            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Invalid username or password\"}");

        } catch (BadCredentialsException e) {
            // Handle incorrect email or password
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Invalid email or password\"}");

        } catch (LockedException e) {
            // Handle locked account
            return ResponseEntity.status(HttpStatus.LOCKED).body("{\"error\": \"Account is locked\"}");

        } catch (DisabledException e) {
            // Handle disabled account
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("{\"error\": \"Account is disabled\"}");

        } catch (AuthenticationException e) {
            // Catch-all for other authentication failures
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Login Failure!\"}");
        }
    }


    public User getPendingUser(String email) {
        return pendingUsers.get(email);
    }

    public void saveUser(User user) {
        userRepository.save(user);
        pendingUsers.remove(user.getEmail());
    }

    private String generateRandomCode() {
        SecureRandom random = new SecureRandom();
        int verificationCode = 1000 + random.nextInt(9000);
        return String.valueOf(verificationCode);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }



    public void swipe(User user, User targetUser, String action) {
        Swipe swipe = new Swipe();
        swipe.setUser(user);
        swipe.setTargetUser(targetUser);
        swipe.setAction(action);
        swipeRepository.save(swipe);

        // Only process match logic for "like" actions
        if ("like".equals(action)) {
            // Check if user has liked targetUser and if targetUser has liked user
            boolean userLikedTarget = swipeRepository.existsByUserAndTargetUserAndAction(user, targetUser, "like");
            boolean targetUserLikedUser = swipeRepository.existsByUserAndTargetUserAndAction(targetUser, user, "like");

            // Only create match if both users have liked each other
            if (userLikedTarget && targetUserLikedUser) {
                // Check if a match already exists
                if (!matchRepository.existsByUser1AndUser2(user, targetUser) &&
                        !matchRepository.existsByUser2AndUser1(targetUser, user)) {
                    createMatch(user, targetUser);
                } else {
                    System.out.println("Match already exists between " + user.getEmail() + " and " + targetUser.getEmail());
                }
            }
        }
    }


    private void createMatch(User user, User targetUser) {
        if (user == null || targetUser == null || user.getId().equals(targetUser.getId())) {
            System.out.println("Cannot create match: one of the users is null or they are the same user.");
            return;
        }

        // Check if a match already exists between the two users
        if (matchRepository.existsByUser1AndUser2(user, targetUser) || matchRepository.existsByUser2AndUser1(targetUser, user)) {
            System.out.println("Match already exists between " + user.getEmail() + " and " + targetUser.getEmail());
            return;
        }

        Match match = new Match();
        match.setUser1(user);
        match.setUser2(targetUser);

        try {
            matchRepository.save(match); // Save the match
            System.out.println("Match created between " + user.getEmail() + " and " + targetUser.getEmail());
        } catch (Exception e) {
            System.err.println("Error creating match: " + e.getMessage());
        }
    }

    @Autowired
    private HobbyRepository hobbyRepository;

    public void saveUserHobbies(Long userId, List<String> hobbies) {
        // Validate the number of hobbies
        if (hobbies.size() > 5) {
            throw new IllegalArgumentException("You can select a maximum of 5 hobbies.");
        }

        // Save selected hobbies
        for (String hobby : hobbies) {
            Hobby userHobby = new Hobby();
            userHobby.setUserId(userId);
            userHobby.setHobby(hobby);
            hobbyRepository.save(userHobby);
        }
    }

    public void saveUserProfile(Long userId, String firstName, String bio, String gender, String interestedIn) {
        // Kiểm tra xem người dùng có tồn tại hay không
        Optional<User> userOptional = userRepository.findById(userId);

        if (!userOptional.isPresent()) {
            throw new RuntimeException("Không tìm thấy người dùng với id: " + userId);
        }

        User user = userOptional.get(); // Lấy người dùng từ Optional

        // Tìm kiếm hồ sơ người dùng đã tồn tại
        UserProfile userProfile = userProfileRepository.findByUserId(userId);

        if (userProfile == null) {
            // Nếu không tìm thấy, tạo hồ sơ mới
            userProfile = new UserProfile();
            userProfile.setUser(user);  // Gán người dùng cho hồ sơ
        }

        // Cập nhật thông tin trong hồ sơ người dùng
        userProfile.setFirstName(firstName);
        userProfile.setBio(bio);
        userProfile.setGender(gender);
        userProfile.setInterestedIn(interestedIn);

        try {
            System.out.println("Đang lưu hồ sơ cho người dùng ID: " + userId);
            System.out.println("Chi tiết hồ sơ: " + firstName + ", " + bio + ", " + gender + ", " + interestedIn);
            // Lưu hồ sơ người dùng vào cơ sở dữ liệu
            userProfileRepository.save(userProfile);
        } catch (Exception e) {
            // Ghi lại lỗi và ném ra ngoại lệ tùy chỉnh
            System.err.println("Lỗi khi lưu hồ sơ người dùng: " + e.getMessage());
            throw new RuntimeException("Lỗi khi lưu hồ sơ.");
        }
    }

    public List<BannedUser> getAllBannedUsers() {
        return bannedUserRepository.findAll();
    }

    public List<ReportedUser> getAllReportedUsers() {
        return reportedUserRepository.findAll();
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public List<User> findPremiumUsers() {
        return userRepository.findByIsPremiumTrue();
    }

//    public User togglePremiumStatus(Long userId) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
//        user.setIsPremium(!user.getIsPremium());
//        return userRepository.save(user); // Lưu thay đổi vào cơ sở dữ liệu
//    }
        public void togglePremiumStatus(User user) {
            if (user.getIsPremium() == null) {
                user.setIsPremium(false);  // hoặc một giá trị mặc định khác
            }
            user.setIsPremium(!user.getIsPremium());
        }

    private final JdbcTemplate jdbcTemplate;

    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> getAllCards() {
        String sql = """
    SELECT 
        u.id,
        u.email,
        u.phone_number,
        u.date_of_birth,
        u.role,
        u.user_status,
        u.is_premium,
        p.name AS province,
        d.name AS district,
        STRING_AGG(h.hobby, ', ') AS hobbies,
        up.first_name,
        up.bio,
        up.gender,
        up.interested_in,
        up.verified,
        up.ava,    -- Thêm trường hình đại diện
        up.img1,   -- Thêm trường hình ảnh thứ nhất
        up.img2,   -- Thêm trường hình ảnh thứ hai
        up.img3,   -- Thêm trường hình ảnh thứ ba
        up.img4,   -- Thêm trường hình ảnh thứ tư
        up.img5    -- Thêm trường hình ảnh thứ năm
    FROM 
        users u
    LEFT JOIN 
        province p ON u.province_id = p.id
    LEFT JOIN 
        district d ON u.district_id = d.id
    LEFT JOIN 
        user_hobbies h ON u.id = h.user_id
    LEFT JOIN 
        user_profiles up ON u.id = up.user_id
    GROUP BY 
        u.id, u.email, u.phone_number, u.date_of_birth, u.role, u.user_status, 
        u.is_premium, p.name, d.name, up.first_name, up.bio, up.gender, 
        up.interested_in, up.verified, up.ava, up.img1, up.img2, up.img3, up.img4, up.img5;
    """;

        return jdbcTemplate.queryForList(sql);
    }

}

