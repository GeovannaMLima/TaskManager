import '../css/TopBar.css'
import { useNavigate } from 'react-router-dom'

function TopBar({ titulo }) {

  const navigate = useNavigate()

  return (
    <header className="top-bar">

      <h1 className="top-bar-title">
        {titulo}
      </h1>

      <div className="top-bar-actions">

        <button
          className="new-task-button"
          onClick={() => navigate('/criar-tarefa')}
        >
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