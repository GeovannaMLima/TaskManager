package com.kanbam.task_manager.factory;

import com.kanbam.task_manager.domain.entity.Task;
import com.kanbam.task_manager.domain.enums.PrioridadeEnum;
import com.kanbam.task_manager.domain.enums.TipoEnum;
import com.kanbam.task_manager.dtos.TaskRequestDTO;
import org.springframework.stereotype.Component;

/**
 * Regra de negócio do tipo BUG: se o cliente não informar prioridade,
 * assume-se ALTA por padrão (bug tende a ser mais urgente que uma feature comum).
 */
@Component
public class BugTaskFactory extends TaskFactory {

    @Override
    protected Task createTask(TaskRequestDTO requestDTO) {
        PrioridadeEnum prioridade = requestDTO.prioridade() != null
                ? requestDTO.prioridade()
                : PrioridadeEnum.ALTA;

        return new Task(
                requestDTO.titulo(),
                requestDTO.descricao(),
                TipoEnum.BUG,
                prioridade
        );
    }
}
