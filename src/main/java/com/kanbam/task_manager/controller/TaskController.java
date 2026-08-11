package com.kanbam.task_manager.controller;

import com.kanbam.task_manager.dtos.TaskRequestDTO;
import com.kanbam.task_manager.dtos.TaskResponseDTO;
import com.kanbam.task_manager.dtos.TaskStatusUpdateDTO;
import com.kanbam.task_manager.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponseDTO criarTarefa(
            @RequestBody TaskRequestDTO requestDTO
    ) {
        return taskService.criarTarefa(requestDTO);
    }

    @GetMapping
    public List<TaskResponseDTO> listarTarefas() {
        return taskService.listarTarefas();
    }

    @PatchMapping("/{id}/status")
    public TaskResponseDTO moverTarefa(
            @PathVariable Long id,
            @RequestBody TaskStatusUpdateDTO statusUpdateDTO
    ) {
        return taskService.moverTarefa(
                id,
                statusUpdateDTO
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluirTarefa(@PathVariable Long id) {
        taskService.excluirTarefa(id);
    }
}