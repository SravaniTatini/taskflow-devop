package com.taskflow.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

public class JwtUtil {

    // 🔑 Secret key used to sign token
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // ✅ Generate JWT token
    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // who the user is
                .setIssuedAt(new Date()) // current time
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .signWith(key) // sign token
                .compact();
    }

    // ✅ Validate token and extract username
    public static String validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}