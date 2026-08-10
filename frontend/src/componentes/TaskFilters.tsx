import '../css/TaskFilters.css'

function TaskFilters() {
  return (
    <div className="task-filters">

      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Buscar tarefas..."
        />
      </div>

      <button className="filter-button">
        <span>Status</span>
        <span className="filter-arrow"></span>
      </button>

      <button className="filter-button">
        <span>Tipo</span>
        <span className="filter-arrow"></span>
      </button>

      <button className="filter-button">
        <span>Prioridade</span>
        <span className="filter-arrow"></span>
      </button>

      <button className="filter-button">
        <span>Vencimento</span>
        <span className="filter-arrow"></span>
      </button>

      <span className="sort-label">
        Ordenar:
      </span>

      <button className="filter-button">
        <span>Data</span>
        <span className="filter-arrow"></span>
      </button>

      <button className="filter-button">
        <span>Prioridade</span>
        <span className="filter-arrow"></span>
      </button>

    </div>
  )
}

export default TaskFilters