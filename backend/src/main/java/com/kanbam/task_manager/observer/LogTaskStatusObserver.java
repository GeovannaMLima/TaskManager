package com.kanbam.task_manager.observer;

import com.kanbam.task_manager.domain.entity.Task;
import com.kanbam.task_manager.domain.enums.StatusEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Observer concreto: registra em log (console) toda mudança de status.
 * Usa o próprio Logger do Spring (SLF4J) em vez de System.out, para já
 * seguir a boa prática do ecossistema e aparecer formatado no console
 * da aplicação com timestamp/nível.
 */
@Component
public class LogTaskStatusObserver implements TaskStatusObserver {

    private static final Logger log = LoggerFactory.getLogger(LogTaskStatusObserver.class);

    @Override
    public void onStatusChanged(Task task, StatusEnum statusAnterior, StatusEnum statusNovo) {
        log.info("[TASK LOG] Tarefa #{} ('{}') mudou de status: {} -> {}",
                task.getId(), task.getTitulo(), statusAnterior, statusNovo);
    }
}
