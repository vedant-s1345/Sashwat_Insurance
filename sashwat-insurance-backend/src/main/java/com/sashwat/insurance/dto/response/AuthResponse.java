package com.sashwat.insurance.dto.response;

import com.sashwat.insurance.entity.User;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private Long expiresIn;
    private UserInfo user;

    public AuthResponse() {}

    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }
    public String getTokenType() { return tokenType; }
    public void setTokenType(String tokenType) { this.tokenType = tokenType; }
    public Long getExpiresIn() { return expiresIn; }
    public void setExpiresIn(Long expiresIn) { this.expiresIn = expiresIn; }
    public UserInfo getUser() { return user; }
    public void setUser(UserInfo user) { this.user = user; }

    public static class UserInfo {
        private Long id;
        private String fullName;
        private String email;
        private String phone;
        private User.UserRole role;
        private Boolean isEmailVerified;

        public UserInfo() {}
        public UserInfo(Long id, String fullName, String email, String phone, User.UserRole role, Boolean isEmailVerified) {
            this.id = id; this.fullName = fullName; this.email = email;
            this.phone = phone; this.role = role; this.isEmailVerified = isEmailVerified;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public User.UserRole getRole() { return role; }
        public void setRole(User.UserRole role) { this.role = role; }
        public Boolean getIsEmailVerified() { return isEmailVerified; }
        public void setIsEmailVerified(Boolean isEmailVerified) { this.isEmailVerified = isEmailVerified; }
    }
}
