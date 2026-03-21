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
import com.taskflow.service.TaskService;

@RestController
@RequestMapping("/api/tasks") // ✅ updated path
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    // ✅ GET all
    @GetMapping
    public ResponseEntity<?> createTask(@RequestBody Task task, HttpServletRequest request) {
        
        if (request.getAttribute("user") == null) {
            return ResponseEntity.status(401).body("Unauthorized");
         }   

        return ResponseEntity.ok(taskService.save(task));
    }

    // ✅ CREATE
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id,
                                        @RequestBody Task task,
                                        HttpServletRequest request) {

        if (request.getAttribute("user") == null) {
            return ResponseEntity.status(401).body("Unauthorized");
         }

        task.setId(id);
        return ResponseEntity.ok(taskService.save(task));
   }

    // ✅ DELETE
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