package com.kanbam.task_manager.service;


import com.kanbam.task_manager.domain.entity.Task;
import com.kanbam.task_manager.domain.enums.StatusEnum;
import com.kanbam.task_manager.dtos.TaskRequestDTO;
import com.kanbam.task_manager.dtos.TaskResponseDTO;
import com.kanbam.task_manager.dtos.TaskStatusUpdateDTO;
import com.kanbam.task_manager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public TaskResponseDTO criarTarefa(TaskRequestDTO requestDTO) {
        Task task = new Task(
                requestDTO.titulo(),
                requestDTO.descricao(),
                requestDTO.tipo(),
                requestDTO.prioridade()
        );
        task.setStatus(StatusEnum.TODO);

        Task salva = taskRepository.save(task);
        return toResponseDTO(salva);
    }

    public List<TaskResponseDTO> listarTarefas() {
        return taskRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }


    public TaskResponseDTO moverTarefa(Long id, TaskStatusUpdateDTO statusUpdateDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada: id=" + id));

        task.setStatus(statusUpdateDTO.status());
        Task atualizada = taskRepository.save(task);

        // TODO: Ponto de injeção para o Padrão Observer
        // plugar a notificação/log de mudança de status,


        return toResponseDTO(atualizada);
    }


    private TaskResponseDTO toResponseDTO(Task task) {
        return new TaskResponseDTO(
                task.getId(),
                task.getTitulo(),
                task.getDescricao(),
                task.getStatus(),
                task.getTipo(),
                task.getPrioridade(),
                task.getDataCriacao()
        );
    }
}