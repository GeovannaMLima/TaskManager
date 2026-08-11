package com.kanbam.task_manager.observer;

import com.kanbam.task_manager.domain.entity.Task;
import com.kanbam.task_manager.domain.enums.StatusEnum;

/**
 * Observer Pattern.
 * <p>
 * Contrato que qualquer "interessado" em mudanças de status de tarefa deve
 * implementar. Hoje só temos o log em console, mas amanhã poderia existir
 * um EmailNotificationObserver, um WebhookObserver etc. — sem tocar no
 * TaskService.
 */
public interface TaskStatusObserver {

    void onStatusChanged(Task task, StatusEnum statusAnterior, StatusEnum statusNovo);
}
