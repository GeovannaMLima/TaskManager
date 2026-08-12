package com.kanbam.task_manager.strategy;

import com.kanbam.task_manager.domain.entity.Task;
import org.springframework.stereotype.Component;

import java.util.Comparator;

/**
 * Ordena as tarefas da mais antiga para a mais recente (dataCriacao).
 * Obs.: o projeto atual não tem campo de "data de vencimento" na entidade,
 * então usamos dataCriacao. Se um dia adicionarem "dataVencimento", basta
 * trocar o Comparator aqui — nenhum outro código muda.
 */
@Component
public class DateSortStrategy implements TaskSortStrategy {

    @Override
    public Comparator<Task> getComparator() {
        return Comparator.comparing(Task::getDataCriacao);
    }

    @Override
    public String getKey() {
        return "data";
    }
}
