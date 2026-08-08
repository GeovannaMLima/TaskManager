package com.kanbam.task_manager.dtos;

import com.kanbam.task_manager.domain.enums.StatusEnum;

public record TaskStatusUpdateDTO(
        StatusEnum status
) {
}
