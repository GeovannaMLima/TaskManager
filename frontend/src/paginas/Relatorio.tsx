import '../css/Relatorio.css'

import TopBar from '../componentes/TopBar'

function Relatorio() {
  return (
    <main className="main-content relatorio-page">

      <TopBar titulo="Relatórios" />

      <div className="relatorio-content">

        <div className="breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>Relatórios</strong>
        </div>

        <div className="relatorio-heading">
          <h1>Relatórios</h1>

          <p>
            Acompanhe o progresso e métricas das suas tarefas.
          </p>
        </div>

        <section className="report-summary">

          <div className="summary-card">
            <div className="summary-card-header">
              <span>Total de Tarefas</span>
              <span className="summary-dot purple"></span>
            </div>

            <div className="summary-card-value">
              24
            </div>

            <span className="summary-change positive">
              +8% este mês
            </span>
          </div>

          <div className="summary-card">
            <div className="summary-card-header">
              <span>Concluídas</span>
              <span className="summary-dot green"></span>
            </div>

            <div className="summary-card-value">
              12
            </div>

            <span className="summary-change positive">
              +15% este mês
            </span>
          </div>

          <div className="summary-card">
            <div className="summary-card-header">
              <span>Em Progresso</span>
              <span className="summary-dot orange"></span>
            </div>

            <div className="summary-card-value">
              7
            </div>

            <span className="summary-change negative">
              -3% este mês
            </span>
          </div>

          <div className="summary-card">
            <div className="summary-card-header">
              <span>Atrasadas</span>
              <span className="summary-dot red"></span>
            </div>

            <div className="summary-card-value">
              5
            </div>

            <span className="summary-change negative">
              +2% este mês
            </span>
          </div>

        </section>

        <section className="report-middle">

          <div className="report-card status-card">

            <h2>Tarefas por Status</h2>

            <div className="status-content">

              <div className="donut-chart">
                <div className="donut-center">
                  <strong>24</strong>
                  <span>TOTAL</span>
                </div>
              </div>

              <div className="status-legend">

                <div className="legend-item">
                  <span className="legend-color todo"></span>
                  <span>To Do</span>
                  <strong>5 (21%)</strong>
                </div>

                <div className="legend-item">
                  <span className="legend-color doing"></span>
                  <span>Doing</span>
                  <strong>7 (29%)</strong>
                </div>

                <div className="legend-item">
                  <span className="legend-color done"></span>
                  <span>Done</span>
                  <strong>12 (50%)</strong>
                </div>

              </div>

            </div>

          </div>

          <div className="report-card priority-card">

            <h2>Tarefas por Prioridade</h2>

            <div className="priority-item">
              <div className="priority-header">
                <strong>Alta</strong>
                <span>12 tarefas (50%)</span>
              </div>

              <div className="priority-bar">
                <div className="priority-fill high"></div>
              </div>
            </div>

            <div className="priority-item">
              <div className="priority-header">
                <strong>Média</strong>
                <span>8 tarefas (33%)</span>
              </div>

              <div className="priority-bar">
                <div className="priority-fill medium"></div>
              </div>
            </div>

            <div className="priority-item">
              <div className="priority-header">
                <strong>Baixa</strong>
                <span>4 tarefas (17%)</span>
              </div>

              <div className="priority-bar">
                <div className="priority-fill low"></div>
              </div>
            </div>

          </div>

        </section>

        <section className="report-card monthly-card">

          <div className="monthly-header">
            <h2>Tarefas Criadas por Mês</h2>

            <span>
              +42% crescimento
            </span>
          </div>

          <div className="line-chart">

            <div className="chart-area">
              <div className="chart-line"></div>

              <div className="chart-point point-1"></div>
              <div className="chart-point point-2"></div>
              <div className="chart-point point-3"></div>
              <div className="chart-point point-4"></div>
              <div className="chart-point point-5"></div>
              <div className="chart-point point-6"></div>
            </div>

            <div className="chart-labels">
              <span>Jan</span>
              <span>Fev</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>Mai</span>
              <span>Jun</span>
            </div>

          </div>

        </section>

      </div>

    </main>
  )
}

export default Relatorio