package com.kanbam.task_manager.service;

import com.kanbam.task_manager.domain.entity.Task;
import com.kanbam.task_manager.domain.enums.StatusEnum;
import com.kanbam.task_manager.dtos.TaskRequestDTO;
import com.kanbam.task_manager.dtos.TaskResponseDTO;
import com.kanbam.task_manager.dtos.TaskStatusUpdateDTO;
import com.kanbam.task_manager.factory.TaskFactory;
import com.kanbam.task_manager.factory.TaskFactoryProvider;
import com.kanbam.task_manager.observer.TaskStatusPublisher;
import com.kanbam.task_manager.repository.TaskRepository;
import com.kanbam.task_manager.strategy.TaskSortStrategy;
import com.kanbam.task_manager.strategy.TaskSortStrategyProvider;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskFactoryProvider taskFactoryProvider;
    private final TaskSortStrategyProvider taskSortStrategyProvider;
    private final TaskStatusPublisher taskStatusPublisher;

    public TaskService(TaskRepository taskRepository,
                        TaskFactoryProvider taskFactoryProvider,
                        TaskSortStrategyProvider taskSortStrategyProvider,
                        TaskStatusPublisher taskStatusPublisher) {
        this.taskRepository = taskRepository;
        this.taskFactoryProvider = taskFactoryProvider;
        this.taskSortStrategyProvider = taskSortStrategyProvider;
        this.taskStatusPublisher = taskStatusPublisher;
    }

    /**
     * FACTORY METHOD em ação: o Service não usa "new Task(...)" diretamente.
     * Ele pede ao provider a fábrica correspondente ao tipo da tarefa e deixa
     * que ela decida como construir/configurar o objeto.
     */
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
                .sorted(strategy.getComparator())
                .map(this::toResponseDTO)
                .toList();
    }


    public TaskResponseDTO moverTarefa(Long id, TaskStatusUpdateDTO statusUpdateDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Tarefa não encontrada: id=" + id
                        )
                );

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
                task.getDataCriacao(),
                task.getDataVencimento()
        );
    }
}
