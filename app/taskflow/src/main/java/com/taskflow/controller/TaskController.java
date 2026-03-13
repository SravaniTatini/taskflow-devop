package com.taskflow.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.taskflow.dto.TaskDTO;
import com.taskflow.entity.Task;
import com.taskflow.service.TaskService;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service){
        this.service = service;
    }

    @GetMapping
    public List<Task> getTasks(){
        return service.getAllTasks();
    }

    @PostMapping
    public Task createTask(@Valid @RequestBody TaskDTO dto){

        Task task = new Task();

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());

        return service.createTask(task);
    }

}