package com.kanbam.task_manager.strategy;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Resolve qual TaskSortStrategy usar a partir da string enviada pelo
 * cliente da API (?sort=data ou ?sort=prioridade).
 * <p>
 * O Spring injeta automaticamente todas as implementações de
 * TaskSortStrategy (List<TaskSortStrategy>) — se um dia surgir uma nova
 * estratégia (ex.: ordenar por título), basta criar a classe com @Component
 * que ela já é reconhecida aqui, sem alterar este provider.
 */
@Component
public class TaskSortStrategyProvider {

    private final Map<String, TaskSortStrategy> strategies;
    private final TaskSortStrategy padrao;

    public TaskSortStrategyProvider(List<TaskSortStrategy> strategies, DateSortStrategy padrao) {
        this.strategies = strategies.stream()
                .collect(Collectors.toMap(TaskSortStrategy::getKey, Function.identity()));
        this.padrao = padrao;
    }

    /**
     * Se a chave for nula/desconhecida, cai para a ordenação padrão (por data),
     * evitando quebrar a API por causa de um parâmetro inválido.
     */
    public TaskSortStrategy resolve(String key) {
        if (key == null) {
            return padrao;
        }
        return strategies.getOrDefault(key.toLowerCase(), padrao);
    }
}
