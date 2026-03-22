package com.taskflow.controller;

import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.taskflow.service.TaskService;

import com.taskflow.dto.TaskDTO;
import com.taskflow.entity.Task;
import com.taskflow.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/tasks") // ✅ updated path
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    // ✅ GET all
    @GetMapping
    public ResponseEntity<?> getAllTasks(HttpServletRequest request) {
        
        if (request.getAttribute("user") == null) {
            return ResponseEntity.status(401).body("Unauthorized");
         }   

        return ResponseEntity.ok(taskService.getAllTasks());
    }

    // ✅ CREATE
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {

        Task existing = taskService.getTaskById(id);

        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setStatus(updatedTask.getStatus());

        return taskService.save(existing);
    }

    // ✅ CREATE TASK
    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task, HttpServletRequest request) {

        if (request.getAttribute("user") == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        return ResponseEntity.ok(taskService.save(task));
    }

    // ✅ DELETE TASK
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id,
                                        HttpServletRequest request) {

        if (request.getAttribute("user") == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        taskService.delete(id);
        return ResponseEntity.ok("Deleted");
    }
}
