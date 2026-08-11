package com.kanbam.task_manager.factory;

import com.kanbam.task_manager.domain.entity.Task;
import com.kanbam.task_manager.domain.enums.PrioridadeEnum;
import com.kanbam.task_manager.domain.enums.TipoEnum;
import com.kanbam.task_manager.dtos.TaskRequestDTO;
import org.springframework.stereotype.Component;

/**
 * Regra de negócio do tipo FEATURE: se não vier prioridade, assume MEDIA
 * (funcionalidade nova entra na fila normal, sem urgência de bug).
 */
@Component
public class FeatureTaskFactory extends TaskFactory {

    @Override
    protected Task createTask(TaskRequestDTO requestDTO) {
        PrioridadeEnum prioridade = requestDTO.prioridade() != null
                ? requestDTO.prioridade()
                : PrioridadeEnum.MEDIA;

        return new Task(
                "[FEATURE] " + requestDTO.titulo(),
                requestDTO.descricao(),
                TipoEnum.FEATURE,
                prioridade
        );
    }
}
