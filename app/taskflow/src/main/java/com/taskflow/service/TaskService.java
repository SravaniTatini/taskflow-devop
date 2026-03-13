package com.taskflow.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.taskflow.entity.Task;
import com.taskflow.repository.TaskRepository;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository){
        this.repository = repository;
    }

    public List<Task> getAllTasks(){
        return repository.findAll();
    }

    public Task createTask(Task task){
        return repository.save(task);
    }

    public Task getTaskById(Long id){
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public void deleteTask(Long id){
        repository.deleteById(id);
    }

}