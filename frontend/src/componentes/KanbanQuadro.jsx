import '../css/KanbanQuadro.css'
import KanbanColuna from './KanbanColuna'

const tarefas = {
  todo: [
    {
      titulo: 'Corrigir erro de autenticação',
      tipo: 'Bug',
      prioridade: 'Alta'
    },
    {
      titulo: 'Implementar página de login',
      tipo: 'Feature',
      prioridade: 'Média'
    },
    {
      titulo: 'Refatorar serviço de e-mail',
      tipo: 'Refactor',
      prioridade: 'Baixa'
    }
  ],

  doing: [
    {
      titulo: 'Desenhar wireframes do dashboard',
      tipo: 'Feature',
      prioridade: 'Alta'
    },
    {
      titulo: 'Ajustar regras do Factory Method',
      tipo: 'Feature',
      prioridade: 'Média'
    }
  ],

  done: [
    {
      titulo: 'Integrar biblioteca de ícones',
      tipo: 'Feature',
      prioridade: 'Média'
    },
    {
      titulo: 'Corrigir vazamento de memória',
      tipo: 'Bug',
      prioridade: 'Alta'
    }
  ]
}

function KanbanQuadro() {
  return (
    <section className="kanban-board">
      <KanbanColuna
        titulo="To Do"
        quantidade={tarefas.todo.length}
        tarefas={tarefas.todo}
      />

      <KanbanColuna
        titulo="Doing"
        quantidade={tarefas.doing.length}
        tarefas={tarefas.doing}
      />

      <KanbanColuna
        titulo="Done"
        quantidade={tarefas.done.length}
        tarefas={tarefas.done}
      />
    </section>
  )
}

export default KanbanQuadro