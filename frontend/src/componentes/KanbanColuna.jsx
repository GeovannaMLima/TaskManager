import '../css/KanbanColuna.css'
import TaskCard from './TaskCard'

function KanbanColuna({
  titulo,
  quantidade,
  tarefas,
  onDrop
}) {
  const status = titulo.toLowerCase().replace(' ', '-')

  return (
    <div
      className="kanban-column"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => onDrop(event, status)}
    >
      <div className="column-header">
        <div className="column-title">
          <span className={`status-dot ${status}`}></span>

          <h2>{titulo}</h2>

          <span className="task-count">
            {quantidade}
          </span>
        </div>

       
      </div>

      <div className="column-tasks">
        {tarefas.map((tarefa) => (
          <TaskCard
            key={tarefa.id}
            tarefa={tarefa}
          />
        ))}
      </div>
    </div>
  )
}

export default KanbanColuna