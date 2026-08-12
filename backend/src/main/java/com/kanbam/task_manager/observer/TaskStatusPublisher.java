package com.kanbam.task_manager.observer;

import com.kanbam.task_manager.domain.entity.Task;
import com.kanbam.task_manager.domain.enums.StatusEnum;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Papel de "Subject" no Observer Pattern.
 * <p>
 * O TaskService não conhece os observers concretos, apenas chama
 * publisher.notify(...). O Spring injeta automaticamente todas as
 * implementações de TaskStatusObserver existentes no contexto — hoje só o
 * LogTaskStatusObserver, mas o Service não muda se novos observers forem
 * adicionados no futuro.
 */
@Component
public class TaskStatusPublisher {

    private final List<TaskStatusObserver> observers;

    public TaskStatusPublisher(List<TaskStatusObserver> observers) {
        this.observers = observers;
    }

    public void notifyStatusChanged(Task task, StatusEnum statusAnterior, StatusEnum statusNovo) {
        for (TaskStatusObserver observer : observers) {
            observer.onStatusChanged(task, statusAnterior, statusNovo);
        }
    }
}
