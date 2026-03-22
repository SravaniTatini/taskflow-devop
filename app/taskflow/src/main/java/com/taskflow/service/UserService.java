package com.taskflow.service;

import com.taskflow.entity.User;
import com.taskflow.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User register(User user) {
        return repository.save(user);
    }

    public Optional<User> login(String username, String password) {
        Optional<User> user = repository.findByUsername(username);

        if (user.isPresent() && user.get().getPassword().equals(password)) {
            return user;
        }

        return Optional.empty();
    }
}