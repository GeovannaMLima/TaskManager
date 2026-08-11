import { useState } from 'react'

import '../css/TaskTable.css'


function formatarTipo(tipo) {

  switch (tipo) {

    case 'BUG':
      return 'Bug'

    case 'FEATURE':
      return 'Feature'

    case 'REFACTOR':
      return 'Refactor'

    default:
      return tipo

  }

}


function formatarStatus(status) {

  switch (status) {

    case 'TODO':
      return 'To Do'

    case 'DOING':
      return 'Doing'

    case 'DONE':
      return 'Done'

    default:
      return status

  }

}


function classeStatus(status) {

  switch (status) {

    case 'TODO':
      return 'to-do'

    case 'DOING':
      return 'doing'

    case 'DONE':
      return 'done'

    default:
      return ''

  }

}


function formatarPrioridade(prioridade) {

  switch (prioridade) {

    case 'BAIXA':
      return 'Baixa'

    case 'MEDIA':
      return 'Média'

    case 'ALTA':
      return 'Alta'

    default:
      return prioridade

  }

}


function formatarData(data) {

  if (!data) {
    return '-'
  }

  const partes = data.split('-')

  if (partes.length !== 3) {
    return data
  }

  const [ano, mes, dia] = partes

  return `${dia}/${mes}/${ano}`

}


function formatarDataCriacao(data) {

  if (!data) {
    return '-'
  }

  const dataObj = new Date(data)

  return dataObj.toLocaleDateString('pt-BR')

}


function TaskTable({ tarefas }) {

  const [menuAberto, setMenuAberto] = useState(null)

  const [tarefaSelecionada, setTarefaSelecionada] =
    useState(null)

  const [atualizando, setAtualizando] =
    useState(null)

  const [erro, setErro] = useState('')


  async function alterarStatus(id, novoStatus) {

    try {

      setErro('')

      setAtualizando(id)

      const resposta = await fetch(
        `http://localhost:8080/api/tasks/${id}/status`,
        {
          method: 'PATCH',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            status: novoStatus
          })
        }
      )


      if (!resposta.ok) {

        throw new Error(
          'Não foi possível alterar o status da tarefa.'
        )

      }


      const tarefaAtualizada =
        await resposta.json()


      console.log(
        'Tarefa atualizada:',
        tarefaAtualizada
      )


      window.location.reload()


    } catch (error) {

      console.error(
        'Erro ao alterar status:',
        error
      )


      setErro(
        'Não foi possível alterar o status da tarefa.'
      )

    } finally {

      setAtualizando(null)

      setMenuAberto(null)

    }

  }


  async function excluirTarefa(id) {

    const confirmar = window.confirm(
      'Tem certeza que deseja excluir esta tarefa?'
    )


    if (!confirmar) {
      return
    }


    try {

      setErro('')

      setAtualizando(id)


      const resposta = await fetch(
        `http://localhost:8080/api/tasks/${id}`,
        {
          method: 'DELETE'
        }
      )


      if (!resposta.ok) {

        throw new Error(
          'Não foi possível excluir a tarefa.'
        )

      }


      window.location.reload()


    } catch (error) {

      console.error(
        'Erro ao excluir tarefa:',
        error
      )


      setErro(
        'Não foi possível excluir a tarefa.'
      )


    } finally {

      setAtualizando(null)

      setMenuAberto(null)

    }

  }


  function abrirDetalhes(tarefa) {

    setMenuAberto(null)

    setTarefaSelecionada(tarefa)

  }


  function fecharDetalhes() {

    setTarefaSelecionada(null)

  }


  return (
    <>

      <div className="task-table-container">


        {erro && (

          <div className="task-table-error">
            {erro}
          </div>

        )}


        <table className="task-table">


          <thead>

            <tr>

              <th>Tarefa</th>

              <th>Tipo</th>

              <th>Status</th>

              <th>Prioridade</th>

              <th>Vencimento</th>

              <th>Ações</th>

            </tr>

          </thead>


          <tbody>

            {tarefas.map((tarefa) => (

              <tr
                key={tarefa.id}
                className="task-row-clickable"
                onClick={() =>
                  abrirDetalhes(tarefa)
                }
              >


                {/* TAREFA */}

                <td className="task-title">

                  {tarefa.titulo}

                </td>


                {/* TIPO */}

                <td>

                  <span
                    className={`task-type ${tarefa.tipo.toLowerCase()}`}
                  >

                    {formatarTipo(
                      tarefa.tipo
                    )}

                  </span>

                </td>


                {/* STATUS */}

                <td>

                  <span
                    className={`task-status ${classeStatus(
                      tarefa.status
                    )}`}
                  >

                    <span className="status-dot"></span>

                    {formatarStatus(
                      tarefa.status
                    )}

                  </span>

                </td>


                {/* PRIORIDADE */}

                <td>

                  <span
                    className={`table-priority ${tarefa.prioridade.toLowerCase()}`}
                  >

                    <span className="priority-dot"></span>

                    {formatarPrioridade(
                      tarefa.prioridade
                    )}

                  </span>

                </td>


                {/* VENCIMENTO */}

                <td className="task-due-date">

                  {formatarData(
                    tarefa.dataVencimento
                  )}

                </td>


                {/* AÇÕES */}

                <td>

                  <div
                    className="task-actions"

                    onClick={(event) =>
                      event.stopPropagation()
                    }
                  >


                    <button
                      className="action-button"

                      onClick={() =>
                        setMenuAberto(
                          menuAberto === tarefa.id
                            ? null
                            : tarefa.id
                        )
                      }
                    >

                      ...

                    </button>


                    {menuAberto === tarefa.id && (

                      <div className="action-menu">


                        <div className="action-menu-title">

                          Alterar status

                        </div>


                        {/* TODO */}

                        <button
                          className={
                            tarefa.status === 'TODO'
                              ? 'action-menu-option active'
                              : 'action-menu-option'
                          }

                          disabled={
                            atualizando === tarefa.id
                          }

                          onClick={() =>
                            alterarStatus(
                              tarefa.id,
                              'TODO'
                            )
                          }
                        >

                          <span className="menu-status-dot todo"></span>

                          To Do

                        </button>


                        {/* DOING */}

                        <button
                          className={
                            tarefa.status === 'DOING'
                              ? 'action-menu-option active'
                              : 'action-menu-option'
                          }

                          disabled={
                            atualizando === tarefa.id
                          }

                          onClick={() =>
                            alterarStatus(
                              tarefa.id,
                              'DOING'
                            )
                          }
                        >

                          <span className="menu-status-dot doing"></span>

                          Doing

                        </button>


                        {/* DONE */}

                        <button
                          className={
                            tarefa.status === 'DONE'
                              ? 'action-menu-option active'
                              : 'action-menu-option'
                          }

                          disabled={
                            atualizando === tarefa.id
                          }

                          onClick={() =>
                            alterarStatus(
                              tarefa.id,
                              'DONE'
                            )
                          }
                        >

                          <span className="menu-status-dot done"></span>

                          Done

                        </button>


                        <div className="action-menu-divider"></div>


                        {/* EXCLUIR */}

                        <button
                          className="action-menu-option delete-option"

                          disabled={
                            atualizando === tarefa.id
                          }

                          onClick={() =>
                            excluirTarefa(
                              tarefa.id
                            )
                          }
                        >

                          <span className="delete-icon">
                            🗑
                          </span>

                          Excluir

                        </button>


                      </div>

                    )}

                  </div>

                </td>


              </tr>

            ))}

          </tbody>


        </table>


        {/* RODAPÉ */}

        <div className="table-footer">


          <span>

            {tarefas.length === 0

              ? 'Nenhuma tarefa encontrada'

              : `Mostrando 1-${tarefas.length} de ${tarefas.length} tarefas`

            }

          </span>


          <div className="pagination">


            <button disabled>
              Anterior
            </button>


            <button className="page-active">
              1
            </button>


            <button disabled>
              Próximo
            </button>


          </div>


        </div>


      </div>


      {/* MODAL DE DETALHES */}

      {tarefaSelecionada && (

        <div
          className="task-modal-overlay"

          onClick={fecharDetalhes}
        >


          <div
            className="task-modal"

            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* CABEÇALHO */}

            <div className="task-modal-header">


              <div>

                <span className="task-modal-label">
                  Detalhes da tarefa
                </span>


                <h2>
                  {tarefaSelecionada.titulo}
                </h2>

              </div>


              <button
                className="task-modal-close"

                onClick={fecharDetalhes}
              >

                ×

              </button>


            </div>


            {/* CONTEÚDO */}

            <div className="task-modal-content">


              {/* DESCRIÇÃO */}

              <div className="task-modal-description">


                <span className="task-detail-label">
                  Descrição
                </span>


                <p>

                  {tarefaSelecionada.descricao

                    ? tarefaSelecionada.descricao

                    : 'Nenhuma descrição informada.'

                  }

                </p>


              </div>


              {/* INFORMAÇÕES */}

              <div className="task-detail-grid">


                {/* TIPO */}

                <div className="task-detail-item">

                  <span className="task-detail-label">
                    Tipo
                  </span>


                  <span
                    className={`task-type ${tarefaSelecionada.tipo.toLowerCase()}`}
                  >

                    {formatarTipo(
                      tarefaSelecionada.tipo
                    )}

                  </span>

                </div>


                {/* STATUS */}

                <div className="task-detail-item">

                  <span className="task-detail-label">
                    Status
                  </span>


                  <span
                    className={`task-status ${classeStatus(
                      tarefaSelecionada.status
                    )}`}
                  >

                    <span className="status-dot"></span>

                    {formatarStatus(
                      tarefaSelecionada.status
                    )}

                  </span>

                </div>


                {/* PRIORIDADE */}

                <div className="task-detail-item">

                  <span className="task-detail-label">
                    Prioridade
                  </span>


                  <span
                    className={`table-priority ${tarefaSelecionada.prioridade.toLowerCase()}`}
                  >

                    <span className="priority-dot"></span>

                    {formatarPrioridade(
                      tarefaSelecionada.prioridade
                    )}

                  </span>

                </div>


                {/* VENCIMENTO */}

                <div className="task-detail-item">

                  <span className="task-detail-label">
                    Vencimento
                  </span>


                  <span className="task-detail-value">

                    {formatarData(
                      tarefaSelecionada.dataVencimento
                    )}

                  </span>

                </div>


                {/* CRIAÇÃO */}

                <div className="task-detail-item">

                  <span className="task-detail-label">
                    Criada em
                  </span>


                  <span className="task-detail-value">

                    {formatarDataCriacao(
                      tarefaSelecionada.dataCriacao
                    )}

                  </span>

                </div>


              </div>


            </div>


            {/* RODAPÉ DO MODAL */}

            <div className="task-modal-footer">


              <button
                className="task-modal-button"

                onClick={fecharDetalhes}
              >

                Fechar

              </button>


            </div>


          </div>


        </div>

      )}

    </>
  )
}


export default TaskTable