package com.kanbam.task_manager.factory;

import com.kanbam.task_manager.domain.entity.Task;
import com.kanbam.task_manager.domain.enums.StatusEnum;
import com.kanbam.task_manager.dtos.TaskRequestDTO;

/**
 * Factory Method Pattern.
 * <p>
 * Cada subclasse concreta sabe como construir uma {@link Task} de um tipo
 * específico (Bug, Feature, Refactor), aplicando regras de negócio próprias
 * daquele tipo (ex.: prioridade padrão, prefixo no título, validações).
 * <p>
 * A criação (createTask) é delegada às subclasses, enquanto o passo comum
 * (definir status inicial) dentro do Factory Method.
 */
public abstract class TaskFactory {

    /**
     * Passo fixo, comum a todas as fábricas concretas.
     */
    public final Task criarTarefa(TaskRequestDTO requestDTO) {
        Task task = createTask(requestDTO);
        task.setStatus(StatusEnum.TODO);
        return task;
    }

    /**
     * Passo variável: cada subclasse decide COMO instanciar/configurar a Task
     * de acordo com as regras do seu tipo.
     */
    protected abstract Task createTask(TaskRequestDTO requestDTO);
}
