package com.kanbam.task_manager.strategy;

import com.kanbam.task_manager.domain.entity.Task;
import org.springframework.stereotype.Component;

import java.util.Comparator;

/**
 * Ordena as tarefas da prioridade mais alta para a mais baixa.
 * <p>
 * PrioridadeEnum é declarado como BAIXA, MEDIA, ALTA (ordinal crescente),
 * então usamos ordinal decrescente para trazer ALTA primeiro.
 */
@Component
public class PrioritySortStrategy implements TaskSortStrategy {

    @Override
    public Comparator<Task> getComparator() {
        return Comparator.comparing((Task t) -> t.getPrioridade().ordinal()).reversed();
    }

    @Override
    public String getKey() {
        return "prioridade";
    }
}
