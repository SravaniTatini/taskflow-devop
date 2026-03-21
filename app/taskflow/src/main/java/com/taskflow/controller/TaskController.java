package com.taskflow.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.taskflow.dto.TaskDTO;
import com.taskflow.entity.Task;
import com.taskflow.service.TaskService;

@RestController
@RequestMapping("/api/tasks") // ✅ updated path
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service){
        this.service = service;
    }

    // ✅ GET all
    @GetMapping
    public List<Task> getTasks(){
        return service.getAllTasks();
    }

    // ✅ CREATE
    @PostMapping
    public Task createTask(@Valid @RequestBody TaskDTO dto){

        Task task = new Task();

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());

        // ✅ NEW
        task.setPriority(dto.getPriority());
        task.setDueDate(dto.getDueDate());

        return service.createTask(task);
    }

    // ✅ UPDATE (IMPORTANT for drag-drop sync)
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        updatedTask.setId(id);
        return service.createTask(updatedTask);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        service.deleteTask(id);
    }
}