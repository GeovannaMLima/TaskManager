import { useState } from 'react'
import '../css/KanbanQuadro.css'
import KanbanColuna from './KanbanColuna'

const tarefasIniciais = {
  todo: [
    {
      id: 1,
      titulo: 'Corrigir erro de autenticação',
      tipo: 'Bug',
      prioridade: 'Alta',
      dataVencimento: '25/08/2026',
      status: 'TODO'
    },
    {
      id: 2,
      titulo: 'Implementar página de login',
      tipo: 'Feature',
      prioridade: 'Média',
      dataVencimento: '28/08/2026',
      status: 'TODO'
    },
    {
      id: 3,
      titulo: 'Refatorar serviço de e-mail',
      tipo: 'Refactor',
      prioridade: 'Baixa',
      dataVencimento: '02/09/2026',
      status: 'TODO'
    }
  ],

  doing: [
    {
      id: 4,
      titulo: 'Desenhar wireframes do dashboard',
      tipo: 'Feature',
      prioridade: 'Alta',
      dataVencimento: '20/08/2026',
      status: 'DOING'
    },
    {
      id: 5,
      titulo: 'Ajustar regras do Factory Method',
      tipo: 'Feature',
      prioridade: 'Média',
      dataVencimento: '30/08/2026',
      status: 'DOING'
    }
  ],

  done: [
    {
      id: 6,
      titulo: 'Integrar biblioteca de ícones',
      tipo: 'Feature',
      prioridade: 'Média',
      dataVencimento: '15/08/2026',
      status: 'DONE'
    },
    {
      id: 7,
      titulo: 'Corrigir vazamento de memória',
      tipo: 'Bug',
      prioridade: 'Alta',
      dataVencimento: '18/08/2026',
      status: 'DONE'
    }
  ]
}

function KanbanQuadro() {
  const [tarefas, setTarefas] = useState(tarefasIniciais)

  function moverTarefa(event, novoStatus) {
    const taskId = Number(event.dataTransfer.getData('taskId'))

    let tarefaMovida = null
    let colunaAnterior = null

    Object.entries(tarefas).forEach(([coluna, lista]) => {
      const tarefa = lista.find((item) => item.id === taskId)

      if (tarefa) {
        tarefaMovida = tarefa
        colunaAnterior = coluna
      }
    })

    if (!tarefaMovida || colunaAnterior === novoStatus) {
      return
    }

    const novasTarefas = {
      ...tarefas
    }

    novasTarefas[colunaAnterior] = novasTarefas[colunaAnterior].filter(
      (tarefa) => tarefa.id !== taskId
    )

    const tarefaAtualizada = {
      ...tarefaMovida,
      status: novoStatus.toUpperCase()
    }

    novasTarefas[novoStatus] = [
      ...novasTarefas[novoStatus],
      tarefaAtualizada
    ]

    setTarefas(novasTarefas)
  }

  return (
    <section className="kanban-board">
      <KanbanColuna
        titulo="To Do"
        quantidade={tarefas.todo.length}
        tarefas={tarefas.todo}
        onDrop={moverTarefa}
      />

      <KanbanColuna
        titulo="Doing"
        quantidade={tarefas.doing.length}
        tarefas={tarefas.doing}
        onDrop={moverTarefa}
      />

      <KanbanColuna
        titulo="Done"
        quantidade={tarefas.done.length}
        tarefas={tarefas.done}
        onDrop={moverTarefa}
      />
    </section>
  )
}

export default KanbanQuadro