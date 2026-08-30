package com.skillintel.platform.dto;

import com.skillintel.platform.domain.enums.RoleEnum;

public class AuthDtos {

    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest() {}
        public LoginRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String username;
        private String email;
        private String password;
        private String fullName;
        private RoleEnum role;
        private Long targetRoleId;

        public RegisterRequest() {}

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public RoleEnum getRole() { return role; }
        public void setRole(RoleEnum role) { this.role = role; }
        public Long getTargetRoleId() { return targetRoleId; }
        public void setTargetRoleId(Long targetRoleId) { this.targetRoleId = targetRoleId; }
    }

    public static class AuthResponse {
        private String token;
        private Long userId;
        private String username;
        private String email;
        private String fullName;
        private RoleEnum role;
        private Long studentProfileId;

        public AuthResponse() {}
        public AuthResponse(String token, Long userId, String username, String email, String fullName, RoleEnum role, Long studentProfileId) {
            this.token = token;
            this.userId = userId;
            this.username = username;
            this.email = email;
            this.fullName = fullName;
            this.role = role;
            this.studentProfileId = studentProfileId;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private String token;
            private Long userId;
            private String username;
            private String email;
            private String fullName;
            private RoleEnum role;
            private Long studentProfileId;

            public Builder token(String token) { this.token = token; return this; }
            public Builder userId(Long userId) { this.userId = userId; return this; }
            public Builder username(String username) { this.username = username; return this; }
            public Builder email(String email) { this.email = email; return this; }
            public Builder fullName(String fullName) { this.fullName = fullName; return this; }
            public Builder role(RoleEnum role) { this.role = role; return this; }
            public Builder studentProfileId(Long studentProfileId) { this.studentProfileId = studentProfileId; return this; }

            public AuthResponse build() {
                return new AuthResponse(token, userId, username, email, fullName, role, studentProfileId);
            }
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public RoleEnum getRole() { return role; }
        public void setRole(RoleEnum role) { this.role = role; }
        public Long getStudentProfileId() { return studentProfileId; }
        public void setStudentProfileId(Long studentProfileId) { this.studentProfileId = studentProfileId; }
    }

    public static class UserDto {
        private Long id;
        private String username;
        private String email;
        private String fullName;
        private RoleEnum role;

        public UserDto() {}
        public UserDto(Long id, String username, String email, String fullName, RoleEnum role) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.fullName = fullName;
            this.role = role;
        }

        public static Builder builder() { return new Builder(); }

        public static class Builder {
            private Long id;
            private String username;
            private String email;
            private String fullName;
            private RoleEnum role;

            public Builder id(Long id) { this.id = id; return this; }
            public Builder username(String username) { this.username = username; return this; }
            public Builder email(String email) { this.email = email; return this; }
            public Builder fullName(String fullName) { this.fullName = fullName; return this; }
            public Builder role(RoleEnum role) { this.role = role; return this; }

            public UserDto build() {
                return new UserDto(id, username, email, fullName, role);
            }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public RoleEnum getRole() { return role; }
        public void setRole(RoleEnum role) { this.role = role; }
    }
}
