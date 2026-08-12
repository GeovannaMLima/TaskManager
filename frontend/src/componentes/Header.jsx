import '../css/Header.css'
import { useNavigate } from 'react-router-dom'

function Header() {

  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-title">
        <h1>Bem-vindo!</h1>
        <p>Gerencie suas tarefas de forma simples e eficiente.</p>
      </div>

      <div className="header-actions">
       <button
          className="new-task-button"
          onClick={() => navigate('/criar-tarefa')}
        >
          <span>+</span>
          Nova Tarefa
        </button>

        <div className="user">
          <span className="user-name">Administrador</span>
          <div className="user-avatar">A</div>
        </div>
      </div>
    </header>
  )
}

export default Header