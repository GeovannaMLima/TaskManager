import { useEffect, useState } from 'react'

import '../css/KanbanQuadro.css'

import KanbanColuna from './KanbanColuna'


function KanbanQuadro({ onStatusChanged }) {

  const [tarefas, setTarefas] = useState({
    todo: [],
    doing: [],
    done: []
  })


  const [carregando, setCarregando] = useState(true)

  const [erro, setErro] = useState('')


  useEffect(() => {
    buscarTarefas()
  }, [])


  async function buscarTarefas() {

    try {

      setCarregando(true)

      setErro('')


      const resposta = await fetch(
        'http://localhost:8080/api/tasks'
      )


      if (!resposta.ok) {

        throw new Error(
          'Não foi possível carregar as tarefas.'
        )

      }


      const dados = await resposta.json()


      console.log(
        'Tarefas recebidas pelo Kanban:',
        dados
      )


      const novasTarefas = {
        todo: [],
        doing: [],
        done: []
      }


      dados.forEach((tarefa) => {

        if (tarefa.status === 'TODO') {
          novasTarefas.todo.push(tarefa)
        }


        if (tarefa.status === 'DOING') {
          novasTarefas.doing.push(tarefa)
        }


        if (tarefa.status === 'DONE') {
          novasTarefas.done.push(tarefa)
        }

      })


      setTarefas(novasTarefas)


    } catch (error) {

      console.error(
        'Erro ao buscar tarefas:',
        error
      )


      setErro(
        'Não foi possível carregar as tarefas.'
      )


    } finally {

      setCarregando(false)

    }

  }


  async function atualizarStatus(id, novoStatus) {

    const statusMap = {
      todo: 'TODO',
      'to-do': 'TODO',
      doing: 'DOING',
      done: 'DONE'
    }


    const statusBackend =
      statusMap[novoStatus.toLowerCase()]
      || novoStatus.toUpperCase()


    const resposta = await fetch(
      `http://localhost:8080/api/tasks/${id}/status`,
      {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          status: statusBackend
        })
      }
    )


    if (!resposta.ok) {

      throw new Error(
        'Não foi possível atualizar o status.'
      )

    }


    return resposta.json()
  }


  async function moverTarefa(event, novoStatus) {

    const taskId = Number(
      event.dataTransfer.getData('taskId')
    )


    /*
     * O Kanban trabalha com:
     *
     * todo
     * doing
     * done
     *
     * Enquanto o backend trabalha com:
     *
     * TODO
     * DOING
     * DONE
     */


    const colunaDestino =
      novoStatus.toLowerCase() === 'to-do'
        ? 'todo'
        : novoStatus.toLowerCase()


    let tarefaMovida = null

    let colunaAnterior = null


    /*
     * Descobre em qual coluna a tarefa
     * estava anteriormente.
     */


    Object.entries(tarefas).forEach(
      ([coluna, lista]) => {

        const tarefa = lista.find(
          (item) => item.id === taskId
        )


        if (tarefa) {

          tarefaMovida = tarefa

          colunaAnterior = coluna

        }

      }
    )


    /*
     * Se não encontrou a tarefa ou
     * ela já está na coluna de destino,
     * não faz nada.
     */


    if (
      !tarefaMovida ||
      colunaAnterior === colunaDestino
    ) {

      return

    }


    try {

      setErro('')


      /*
       * Primeiro atualiza o backend.
       */


      await atualizarStatus(
        tarefaMovida.id,
        colunaDestino
      )


      /*
       * Avisa o Dashboard que o status
       * foi alterado com sucesso.
       */

      if (onStatusChanged) {
        onStatusChanged()
      }


      /*
       * Depois atualiza o estado visual.
       */


      const novasTarefas = {
        ...tarefas,

        [colunaAnterior]: [
          ...tarefas[colunaAnterior]
        ],

        [colunaDestino]: [
          ...tarefas[colunaDestino]
        ]
      }


      /*
       * Remove a tarefa da coluna anterior.
       */


      novasTarefas[colunaAnterior] =
        novasTarefas[colunaAnterior].filter(
          (tarefa) =>
            tarefa.id !== taskId
        )


      /*
       * Converte o nome da coluna
       * para o enum utilizado pelo backend.
       */


      const statusMap = {
        todo: 'TODO',
        doing: 'DOING',
        done: 'DONE'
      }


      const tarefaAtualizada = {
        ...tarefaMovida,

        status: statusMap[colunaDestino]
      }


      /*
       * Adiciona a tarefa na nova coluna.
       */


      novasTarefas[colunaDestino] = [
        ...novasTarefas[colunaDestino],

        tarefaAtualizada
      ]


      setTarefas(novasTarefas)


    } catch (error) {

      console.error(
        'Erro ao mover tarefa:',
        error
      )


      setErro(
        'Não foi possível alterar o status da tarefa.'
      )

    }

  }


  if (carregando) {

    return (
      <section className="kanban-board">

        <p className="kanban-message">
          Carregando tarefas...
        </p>

      </section>
    )

  }


  if (erro) {

    return (
      <section className="kanban-board">

        <p className="kanban-message kanban-error">
          {erro}
        </p>

      </section>
    )

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