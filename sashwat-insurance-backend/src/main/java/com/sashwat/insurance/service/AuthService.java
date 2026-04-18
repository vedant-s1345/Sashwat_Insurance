package com.sashwat.insurance.service;

import com.sashwat.insurance.dto.request.AuthRequest;
import com.sashwat.insurance.dto.response.AuthResponse;
import com.sashwat.insurance.entity.User;

public interface AuthService {
    AuthResponse register(AuthRequest.Register request);
    AuthResponse login(AuthRequest.Login request);
    void forgotPassword(String email);
    void resetPassword(AuthRequest.ResetPassword request);
    void changePassword(String email, AuthRequest.ChangePassword request);
    void verifyEmail(String token);
    User getCurrentUser(String email);
}
