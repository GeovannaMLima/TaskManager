package com.kanbam.task_manager.observer;

import com.kanbam.task_manager.domain.entity.Task;
import com.kanbam.task_manager.domain.entity.TaskLog;
import com.kanbam.task_manager.domain.enums.StatusEnum;
import com.kanbam.task_manager.repository.TaskLogRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class LogTaskStatusObserver implements TaskStatusObserver {

    private static final Logger log =
            LoggerFactory.getLogger(LogTaskStatusObserver.class);

    private final TaskLogRepository taskLogRepository;

    public LogTaskStatusObserver(
            TaskLogRepository taskLogRepository
    ) {
        this.taskLogRepository = taskLogRepository;
    }

    @Override
    public void onStatusChanged(
            Task task,
            StatusEnum statusAnterior,
            StatusEnum statusNovo
    ) {

        log.info(
                "[TASK LOG] Tarefa #{} ('{}') mudou de status: {} -> {}",
                task.getId(),
                task.getTitulo(),
                statusAnterior,
                statusNovo
        );

        TaskLog logTarefa = new TaskLog(
                task.getId(),
                task.getTitulo(),
                statusAnterior,
                statusNovo
        );

        taskLogRepository.save(logTarefa);
    }
}