import '../css/TaskCard.css'
import calendarIcon from '../assets/icon-calendar-date-schedule.svg'

function TaskCard({ tarefa }) {
  return (
    <article
      className="task-card"
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData('taskId', tarefa.id)
      }}
    >
      <h3>{tarefa.titulo}</h3>

      <div className="task-info">
        <span className={`task-type ${tarefa.tipo.toLowerCase()}`}>
          {tarefa.tipo}
        </span>

        <span
          className={`task-priority ${tarefa.prioridade.toLowerCase()}`}
        >
          {tarefa.prioridade}
        </span>
      </div>

      <div className="task-date">
        <img src={calendarIcon} alt="" />
        <span>{tarefa.dataVencimento}</span>
      </div>
    </article>
  )
}

export default TaskCard