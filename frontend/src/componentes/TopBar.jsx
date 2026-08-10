import '../css/TopBar.css'

function TopBar({ titulo }) {
  return (
    <header className="top-bar">

      <h1 className="top-bar-title">
        {titulo}
      </h1>

      <div className="top-bar-actions">

        <button className="new-task-button">
          <span>+</span>
          Nova Tarefa
        </button>

        <div className="user-area">
          <span className="user-name">
            Administrador
          </span>

          <div className="user-avatar">
            A
          </div>
        </div>

      </div>

    </header>
  )
}

export default TopBar