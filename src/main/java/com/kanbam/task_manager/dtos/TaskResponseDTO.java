package com.kanbam.task_manager.dtos;

import com.kanbam.task_manager.domain.enums.PrioridadeEnum;
import com.kanbam.task_manager.domain.enums.StatusEnum;
import com.kanbam.task_manager.domain.enums.TipoEnum;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TaskResponseDTO(
        Long id,
        String titulo,
        String descricao,
        StatusEnum status,
        TipoEnum tipo,
        PrioridadeEnum prioridade,
        LocalDateTime dataCriacao,
        LocalDate dataVencimento
) {
}