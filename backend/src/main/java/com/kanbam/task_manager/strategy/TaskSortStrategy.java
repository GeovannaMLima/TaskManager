package com.kanbam.task_manager.strategy;

import com.kanbam.task_manager.domain.entity.Task;

import java.util.Comparator;

/**
 * Strategy Pattern.
 * <p>
 * Cada implementação encapsula UM critério de ordenação. O TaskService não
 * sabe (nem precisa saber) como a ordenação é feita — ele só recebe uma
 * estratégia e aplica.
 */
public interface TaskSortStrategy {

    Comparator<Task> getComparator();

    /**
     * Chave usada no parâmetro da API (?sort=data / ?sort=prioridade) para
     * o TaskSortStrategyProvider resolver qual implementação usar.
     */
    String getKey();
}
