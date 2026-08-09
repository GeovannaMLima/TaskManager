import '../css/KanbanColuna.css'
import TaskCard from './TaskCard'

function KanbanColuna({ titulo, quantidade, tarefas }) {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <div className="column-title">
          <span className={`status-dot ${titulo.toLowerCase().replace(' ', '-')}`}></span>

          <h2>{titulo}</h2>
          <span className="task-count">{quantidade}</span>
        </div>

        <button className="column-add">+</button>
      </div>

      <div className="column-tasks">
        {tarefas.map((tarefa, index) => (
          <TaskCard
            key={index}
            tarefa={tarefa}
          />
        ))}
      </div>
    </div>
  )
}

export default KanbanColuna