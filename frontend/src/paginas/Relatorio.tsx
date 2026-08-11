import { useEffect, useState } from 'react'

import '../css/Relatorio.css'

import TopBar from '../componentes/TopBar'

function formatarPrioridade(prioridade) {
  switch (prioridade) {
    case 'ALTA':
      return 'Alta'

    case 'MEDIA':
      return 'Média'

    case 'BAIXA':
      return 'Baixa'

    default:
      return prioridade
  }
}

function Relatorio() {
  const [tarefas, setTarefas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const resposta = await fetch(
          'http://localhost:8080/api/tasks'
        )

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar as tarefas.')
        }

        const dados = await resposta.json()

        setTarefas(dados)
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error)

        setErro(
          'Não foi possível carregar os dados do relatório.'
        )
      } finally {
        setCarregando(false)
      }
    }

    carregarTarefas()
  }, [])


  /* =========================================================
     ESTATÍSTICAS
     ========================================================= */

  const total = tarefas.length

  const todo = tarefas.filter(
    (tarefa) => tarefa.status === 'TODO'
  ).length

  const doing = tarefas.filter(
    (tarefa) => tarefa.status === 'DOING'
  ).length

  const done = tarefas.filter(
    (tarefa) => tarefa.status === 'DONE'
  ).length


  /* =========================================================
     PRIORIDADES
     ========================================================= */

  const alta = tarefas.filter(
    (tarefa) => tarefa.prioridade === 'ALTA'
  ).length

  const media = tarefas.filter(
    (tarefa) => tarefa.prioridade === 'MEDIA'
  ).length

  const baixa = tarefas.filter(
    (tarefa) => tarefa.prioridade === 'BAIXA'
  ).length


  /* =========================================================
     ATRASADAS
     ========================================================= */

  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  const atrasadas = tarefas.filter((tarefa) => {
    if (!tarefa.dataVencimento) {
      return false
    }

    if (tarefa.status === 'DONE') {
      return false
    }

    const vencimento = new Date(
      `${tarefa.dataVencimento}T00:00:00`
    )

    return vencimento < hoje
  }).length


  /* =========================================================
     PERCENTUAIS
     ========================================================= */

  const percentualTodo =
    total > 0 ? (todo / total) * 100 : 0

  const percentualDoing =
    total > 0 ? (doing / total) * 100 : 0

  const percentualDone =
    total > 0 ? (done / total) * 100 : 0


  const percentualAlta =
    total > 0 ? (alta / total) * 100 : 0

  const percentualMedia =
    total > 0 ? (media / total) * 100 : 0

  const percentualBaixa =
    total > 0 ? (baixa / total) * 100 : 0


  /* =========================================================
     DONUT
     ========================================================= */

  const donutStyle = {
    background: `
      conic-gradient(
        #f59e0b 0% ${percentualTodo}%,
        #f97316 ${percentualTodo}% ${percentualTodo + percentualDoing}%,
        #10b981 ${percentualTodo + percentualDoing}% 100%
      )
    `
  }


  if (carregando) {
    return (
      <main className="main-content relatorio-page">

        <TopBar titulo="Relatórios" />

        <div className="relatorio-content">

          <div className="relatorio-loading">
            Carregando relatório...
          </div>

        </div>

      </main>
    )
  }


  return (
    <main className="main-content relatorio-page">

      <TopBar titulo="Relatórios" />

      <div className="relatorio-content">

        {/* =================================================
            CABEÇALHO
            ================================================= */}

        <div className="breadcrumb">

          <span>
            Dashboard
          </span>

          <span>
            ›
          </span>

          <strong>
            Relatórios
          </strong>

        </div>


        <div className="relatorio-heading">

          <h1>
            Relatórios
          </h1>

          <p>
            Acompanhe o progresso e métricas das suas tarefas.
          </p>

        </div>


        {/* =================================================
            CARDS DE RESUMO
            ================================================= */}

        <section className="report-summary">

          <div className="summary-card">

            <div className="summary-card-header">

              <span>
                Total de Tarefas
              </span>

              <span className="summary-dot purple"></span>

            </div>

            <div className="summary-card-value">
              {total}
            </div>

            <span className="summary-description">
              Tarefas cadastradas
            </span>

          </div>


          <div className="summary-card">

            <div className="summary-card-header">

              <span>
                Concluídas
              </span>

              <span className="summary-dot green"></span>

            </div>

            <div className="summary-card-value">
              {done}
            </div>

            <span className="summary-description">
              {total > 0
                ? `${Math.round(percentualDone)}% do total`
                : '0% do total'}
            </span>

          </div>


          <div className="summary-card">

            <div className="summary-card-header">

              <span>
                Em Progresso
              </span>

              <span className="summary-dot orange"></span>

            </div>

            <div className="summary-card-value">
              {doing}
            </div>

            <span className="summary-description">
              {total > 0
                ? `${Math.round(percentualDoing)}% do total`
                : '0% do total'}
            </span>

          </div>


          <div className="summary-card">

            <div className="summary-card-header">

              <span>
                Atrasadas
              </span>

              <span className="summary-dot red"></span>

            </div>

            <div className="summary-card-value">
              {atrasadas}
            </div>

            <span className="summary-description overdue">
              {atrasadas > 0
                ? 'Necessitam de atenção'
                : 'Nenhuma tarefa atrasada'}
            </span>

          </div>

        </section>


        {/* =================================================
            STATUS + PRIORIDADE
            ================================================= */}

        <section className="report-middle">


          {/* STATUS */}

          <div className="report-card status-card">

            <h2>
              Tarefas por Status
            </h2>

            <div className="status-content">

              <div
                className="donut-chart"
                style={donutStyle}
              >

                <div className="donut-center">

                  <strong>
                    {total}
                  </strong>

                  <span>
                    TOTAL
                  </span>

                </div>

              </div>


              <div className="status-legend">


                <div className="legend-item">

                  <span className="legend-color todo"></span>

                  <span>
                    To Do
                  </span>

                  <strong>
                    {todo} ({Math.round(percentualTodo)}%)
                  </strong>

                </div>


                <div className="legend-item">

                  <span className="legend-color doing"></span>

                  <span>
                    Doing
                  </span>

                  <strong>
                    {doing} ({Math.round(percentualDoing)}%)
                  </strong>

                </div>


                <div className="legend-item">

                  <span className="legend-color done"></span>

                  <span>
                    Done
                  </span>

                  <strong>
                    {done} ({Math.round(percentualDone)}%)
                  </strong>

                </div>


              </div>

            </div>

          </div>


          {/* PRIORIDADE */}

          <div className="report-card priority-card">

            <h2>
              Tarefas por Prioridade
            </h2>


            <div className="priority-item">

              <div className="priority-header">

                <strong>
                  Alta
                </strong>

                <span>
                  {alta} tarefas ({Math.round(percentualAlta)}%)
                </span>

              </div>

              <div className="priority-bar">

                <div
                  className="priority-fill high"
                  style={{
                    width: `${percentualAlta}%`
                  }}
                ></div>

              </div>

            </div>


            <div className="priority-item">

              <div className="priority-header">

                <strong>
                  Média
                </strong>

                <span>
                  {media} tarefas ({Math.round(percentualMedia)}%)
                </span>

              </div>

              <div className="priority-bar">

                <div
                  className="priority-fill medium"
                  style={{
                    width: `${percentualMedia}%`
                  }}
                ></div>

              </div>

            </div>


            <div className="priority-item">

              <div className="priority-header">

                <strong>
                  Baixa
                </strong>

                <span>
                  {baixa} tarefas ({Math.round(percentualBaixa)}%)
                </span>

              </div>

              <div className="priority-bar">

                <div
                  className="priority-fill low"
                  style={{
                    width: `${percentualBaixa}%`
                  }}
                ></div>

              </div>

            </div>

          </div>


        </section>


        

      </div>

    </main>
  )
}

export default Relatorio