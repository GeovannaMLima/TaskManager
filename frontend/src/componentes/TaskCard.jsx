import '../css/TaskCard.css'

import calendarIcon from '../assets/icon-calendar-date-schedule.svg'


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


function formatarPrioridade(prioridade) {

  switch (prioridade) {

    case 'ALTA':
      return 'Alta'

    case 'MEDIA':
      return 'Média'

    case 'BAIXA':
      return 'Baixa'

    default:
      return prioridade

  }

}


function formatarData(data) {

  if (!data) {
    return '-'
  }


  /*
   * A API retorna:
   *
   * 2026-08-22
   *
   * O Kanban mostra:
   *
   * 22/08/2026
   */

  const partes = data.split('-')


  if (partes.length !== 3) {
    return data
  }


  const [ano, mes, dia] = partes


  return `${dia}/${mes}/${ano}`

}


function TaskCard({ tarefa }) {

  return (

    <article
      className="task-card"
      draggable

      onDragStart={(event) => {

        event.dataTransfer.setData(
          'taskId',
          tarefa.id
        )

      }}
    >

      <h3>
        {tarefa.titulo}
      </h3>


      <div className="task-info">

        <span
          className={`task-type ${tarefa.tipo.toLowerCase()}`}
        >
          {formatarTipo(tarefa.tipo)}
        </span>


        <span
          className={`task-priority ${tarefa.prioridade.toLowerCase()}`}
        >

          <span className="priority-dot"></span>

          {formatarPrioridade(
            tarefa.prioridade
          )}

        </span>

      </div>


      <div className="task-date">

        <img
          src={calendarIcon}
          alt=""
        />

        <span>
          {formatarData(
            tarefa.dataVencimento
          )}
        </span>

      </div>

    </article>

  )

}


export default TaskCard