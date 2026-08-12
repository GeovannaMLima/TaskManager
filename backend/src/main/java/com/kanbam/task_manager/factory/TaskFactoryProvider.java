package com.kanbam.task_manager.factory;

import com.kanbam.task_manager.domain.enums.TipoEnum;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.Map;

/**
 * Ponto único de decisão "qual fábrica usar".
 * <p>
 * O Spring injeta as 3 factories concretas (via @Component) e este provider
 * as organiza num mapa por TipoEnum. Assim o TaskService não conhece nenhuma
 * implementação concreta, só pede: "me dá a factory para este tipo".
 * <p>
 * Vantagem prática: adicionar um novo tipo de tarefa no futuro = criar uma
 * nova classe que estende TaskFactory. Nenhuma classe existente precisa ser
 * alterada (Open/Closed Principle).
 */
@Component
public class TaskFactoryProvider {

    private final Map<TipoEnum, TaskFactory> factories = new EnumMap<>(TipoEnum.class);

    public TaskFactoryProvider(BugTaskFactory bugTaskFactory,
                                FeatureTaskFactory featureTaskFactory,
                                RefactorTaskFactory refactorTaskFactory) {
        factories.put(TipoEnum.BUG, bugTaskFactory);
        factories.put(TipoEnum.FEATURE, featureTaskFactory);
        factories.put(TipoEnum.REFACTOR, refactorTaskFactory);
    }

    public TaskFactory getFactory(TipoEnum tipo) {
        TaskFactory factory = factories.get(tipo);
        if (factory == null) {
            throw new IllegalArgumentException("Tipo de tarefa não suportado: " + tipo);
        }
        return factory;
    }
}
