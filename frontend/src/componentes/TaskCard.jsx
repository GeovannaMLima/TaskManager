import '../css/TaskCard.css'

function TaskCard({ tarefa }) {
  return (
    <article className="task-card">
      <h3>{tarefa.titulo}</h3>

      <div className="task-info">
        <span className={`task-type ${tarefa.tipo.toLowerCase()}`}>
          {tarefa.tipo}
        </span>

        <span className={`task-priority ${tarefa.prioridade.toLowerCase()}`}>
          {tarefa.prioridade}
        </span>
      </div>
    </article>
  )
}

export default TaskCard