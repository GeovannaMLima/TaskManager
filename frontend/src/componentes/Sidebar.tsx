import { NavLink } from 'react-router-dom'
import '../css/Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">
          ▣
        </div>

        <div>
          <h2>Mini Kanban</h2>
          <span>Sistema de Gestão de Tarefas</span>
        </div>
      </div>

      <nav className="sidebar-menu">

        <NavLink
          to="/"
          className="menu-item"
        >
          <span>⌂</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/tarefas"
          className="menu-item"
        >
          <span>☷</span>
          Tarefas
        </NavLink>

        <NavLink
          to="/criar-tarefa"
          className="menu-item"
        >
          <span>＋</span>
          Criar Tarefa
        </NavLink>

        <NavLink
          to="/relatorios"
          className="menu-item"
        >
          <span>▤</span>
          Relatórios
        </NavLink>

      </nav>

      <div className="sidebar-section">
        <span className="section-title">
          ORDENAÇÃO
        </span>

        <label className="radio-option">
          <input
            type="radio"
            name="ordenacao"
            defaultChecked
          />
          Data de Vencimento
        </label>

        <label className="radio-option">
          <input
            type="radio"
            name="ordenacao"
          />
          Prioridade
        </label>
      </div>

      <div className="sidebar-section patterns">
        <span className="section-title">
          PADRÕES UTILIZADOS
        </span>

        <div className="pattern">
          <strong>FACTORY METHOD</strong>
          <span>
            Criação de diferentes tipos de tarefas.
          </span>
        </div>

        <div className="pattern">
          <strong>STRATEGY</strong>
          <span>
            Opções de diferentes regras de ordenação.
          </span>
        </div>

        <div className="pattern">
          <strong>OBSERVER</strong>
          <span>
            Logs automáticos ao alterar o status das tarefas.
          </span>
        </div>
      </div>

    </aside>
  )
}

export default Sidebar