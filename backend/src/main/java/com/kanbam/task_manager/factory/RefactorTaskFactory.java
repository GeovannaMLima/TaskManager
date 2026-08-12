package com.kanbam.task_manager.factory;

import com.kanbam.task_manager.domain.entity.Task;
import com.kanbam.task_manager.domain.enums.PrioridadeEnum;
import com.kanbam.task_manager.domain.enums.TipoEnum;
import com.kanbam.task_manager.dtos.TaskRequestDTO;
import org.springframework.stereotype.Component;

/**
 * Regra de negócio do tipo REFACTOR: se não vier prioridade, assume BAIXA
 * (refatoração normalmente é importante, mas raramente urgente).
 */
@Component
public class RefactorTaskFactory extends TaskFactory {

    @Override
    protected Task createTask(TaskRequestDTO requestDTO) {
        PrioridadeEnum prioridade = requestDTO.prioridade() != null
                ? requestDTO.prioridade()
                : PrioridadeEnum.BAIXA;

        return new Task(
                requestDTO.titulo(),
                requestDTO.descricao(),
                TipoEnum.REFACTOR,
                prioridade
        );
    }
}
