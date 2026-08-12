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
        TaskFactory factory = taskFactoryProvider.getFactory(requestDTO.tipo());
        Task task = factory.criarTarefa(requestDTO);

        Task salva = taskRepository.save(task);
        return toResponseDTO(salva);
    }

    /**
     * STRATEGY em ação: o critério de ordenação (data ou prioridade) é
     * resolvido em tempo de execução a partir do parâmetro "sort" vindo da
     * API, sem nenhum if/switch aqui no Service.
     */
    public List<TaskResponseDTO> listarTarefas(String sort) {
        TaskSortStrategy strategy = taskSortStrategyProvider.resolve(sort);

        return taskRepository.findAll()
                .stream()
                .sorted(strategy.getComparator())
                .map(this::toResponseDTO)
                .toList();
    }

    /**
     * OBSERVER em ação: após persistir a mudança de status, o publisher
     * notifica todos os observers registrados (hoje: log em console).
     */
    public TaskResponseDTO moverTarefa(Long id, TaskStatusUpdateDTO statusUpdateDTO) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tarefa não encontrada: id=" + id));

        StatusEnum statusAnterior = task.getStatus();
        StatusEnum statusNovo = statusUpdateDTO.status();

        task.setStatus(statusNovo);
        Task atualizada = taskRepository.save(task);

        taskStatusPublisher.notifyStatusChanged(atualizada, statusAnterior, statusNovo);

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
