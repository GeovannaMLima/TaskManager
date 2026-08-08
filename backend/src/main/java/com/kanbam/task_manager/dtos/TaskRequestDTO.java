package com.kanbam.task_manager.dtos;

import com.kanbam.task_manager.domain.enums.PrioridadeEnum;
import com.kanbam.task_manager.domain.enums.TipoEnum;

public record TaskRequestDTO(
        String titulo,
        String descricao,
        TipoEnum tipo,
        PrioridadeEnum prioridade
) {
}
