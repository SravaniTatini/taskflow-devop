package com.taskflow.controller;

import org.springframework.web.bind.annotation.*;
import com.taskflow.entity.User;
import com.taskflow.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserRepository repo;

    public AuthController(UserRepository repo) {
        this.repo = repo;
    }

    // SIGNUP
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return repo.save(user);
    }

    // LOGIN
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existing = repo.findByUsername(user.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!existing.getPassword().equals(user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return "LOGIN_SUCCESS";
    }
}