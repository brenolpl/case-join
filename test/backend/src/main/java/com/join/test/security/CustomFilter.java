package com.join.test.security;


import java.io.IOException;

import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

public class CustomFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String token = request.getHeader(AUTHORIZATION);
        try {
            if(!request.getServletPath().equals("/api/security/auth") && !request.getServletPath().equals("/api/security/registrar") && token != null) {
                JWTUtils.verifyToken(token);
            }
            filterChain.doFilter(request, response);
        } catch (JWTVerificationException ex) {
            throw new AccessDeniedException("Access denied");
        }
    }

}