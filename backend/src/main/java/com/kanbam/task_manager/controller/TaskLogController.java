package com.kanbam.task_manager.controller;

import com.kanbam.task_manager.domain.entity.TaskLog;
import com.kanbam.task_manager.repository.TaskLogRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskLogController {

    private final TaskLogRepository taskLogRepository;

    public TaskLogController(
            TaskLogRepository taskLogRepository
    ) {
        this.taskLogRepository = taskLogRepository;
    }

    @GetMapping
    public List<TaskLog> listarLogs() {
        return taskLogRepository.findAllByOrderByDataHoraDesc();
    }
}