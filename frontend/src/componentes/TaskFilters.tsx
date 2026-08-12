import { useState } from 'react'

import '../css/TaskFilters.css'

function TaskFilters({
  busca,
  setBusca,
  status,
  setStatus,
  tipo,
  setTipo,
  prioridade,
  setPrioridade,
  vencimento,
  setVencimento,
  ordenacao,
  setOrdenacao
}) {

  const [filtroAberto, setFiltroAberto] = useState(null)

  function alternarFiltro(filtro) {
    setFiltroAberto(
      filtroAberto === filtro
        ? null
        : filtro
    )
  }

  function selecionarFiltro(filtro, valor) {

    if (filtro === 'status') {
      setStatus(valor)
    }

    if (filtro === 'tipo') {
      setTipo(valor)
    }

    if (filtro === 'prioridade') {
      setPrioridade(valor)
    }

    if (filtro === 'vencimento') {
      setVencimento(valor)
    }

    setFiltroAberto(null)
  }

  return (
    <div className="task-filters">

      {/* BUSCA */}

      <div className="search-box">

        <span className="search-icon">
          ⌕
        </span>

        <input
          type="text"
          placeholder="Buscar tarefas..."
          value={busca}
          onChange={(event) =>
            setBusca(event.target.value)
          }
        />

      </div>


      {/* STATUS */}

      <div className="filter-dropdown">

        <button
          className="filter-button"
          onClick={() => alternarFiltro('status')}
        >
          <span>
            {status === 'TODOS'
              ? 'Status'
              : status === 'TODO'
                ? 'To Do'
                : status === 'DOING'
                  ? 'Doing'
                  : 'Done'
            }
          </span>

          <span className="filter-arrow"></span>
        </button>

        {filtroAberto === 'status' && (

          <div className="filter-menu">

            <button
              onClick={() =>
                selecionarFiltro('status', 'TODOS')
              }
            >
              Todos
            </button>

            <button
              onClick={() =>
                selecionarFiltro('status', 'TODO')
              }
            >
              To Do
            </button>

            <button
              onClick={() =>
                selecionarFiltro('status', 'DOING')
              }
            >
              Doing
            </button>

            <button
              onClick={() =>
                selecionarFiltro('status', 'DONE')
              }
            >
              Done
            </button>

          </div>

        )}

      </div>


      {/* TIPO */}

      <div className="filter-dropdown">

        <button
          className="filter-button"
          onClick={() => alternarFiltro('tipo')}
        >
          <span>
            {tipo === 'TODOS'
              ? 'Tipo'
              : tipo === 'BUG'
                ? 'Bug'
                : tipo === 'FEATURE'
                  ? 'Feature'
                  : 'Refactor'
            }
          </span>

          <span className="filter-arrow"></span>
        </button>

        {filtroAberto === 'tipo' && (

          <div className="filter-menu">

            <button
              onClick={() =>
                selecionarFiltro('tipo', 'TODOS')
              }
            >
              Todos
            </button>

            <button
              onClick={() =>
                selecionarFiltro('tipo', 'BUG')
              }
            >
              Bug
            </button>

            <button
              onClick={() =>
                selecionarFiltro('tipo', 'FEATURE')
              }
            >
              Feature
            </button>

            <button
              onClick={() =>
                selecionarFiltro('tipo', 'REFACTOR')
              }
            >
              Refactor
            </button>

          </div>

        )}

      </div>


      {/* PRIORIDADE */}

      <div className="filter-dropdown">

        <button
          className="filter-button"
          onClick={() => alternarFiltro('prioridade')}
        >
          <span>
            {prioridade === 'TODAS'
              ? 'Prioridade'
              : prioridade === 'BAIXA'
                ? 'Baixa'
                : prioridade === 'MEDIA'
                  ? 'Média'
                  : 'Alta'
            }
          </span>

          <span className="filter-arrow"></span>
        </button>

        {filtroAberto === 'prioridade' && (

          <div className="filter-menu">

            <button
              onClick={() =>
                selecionarFiltro('prioridade', 'TODAS')
              }
            >
              Todas
            </button>

            <button
              onClick={() =>
                selecionarFiltro('prioridade', 'BAIXA')
              }
            >
              Baixa
            </button>

            <button
              onClick={() =>
                selecionarFiltro('prioridade', 'MEDIA')
              }
            >
              Média
            </button>

            <button
              onClick={() =>
                selecionarFiltro('prioridade', 'ALTA')
              }
            >
              Alta
            </button>

          </div>

        )}

      </div>


      {/* VENCIMENTO */}

      <div className="filter-dropdown">

        <button
          className="filter-button"
          onClick={() => alternarFiltro('vencimento')}
        >
          <span>
            {vencimento === 'TODOS'
              ? 'Vencimento'
              : vencimento === 'COM'
                ? 'Com vencimento'
                : 'Sem vencimento'
            }
          </span>

          <span className="filter-arrow"></span>
        </button>

        {filtroAberto === 'vencimento' && (

          <div className="filter-menu">

            <button
              onClick={() =>
                selecionarFiltro('vencimento', 'TODOS')
              }
            >
              Todos
            </button>

            <button
              onClick={() =>
                selecionarFiltro('vencimento', 'COM')
              }
            >
              Com vencimento
            </button>

            <button
              onClick={() =>
                selecionarFiltro('vencimento', 'SEM')
              }
            >
              Sem vencimento
            </button>

          </div>

        )}

      </div>


      {/* ORDENAÇÃO */}

      <span className="sort-label">
        Ordenar:
      </span>


      {/* ORDENAR DATA */}

      <div className="filter-dropdown">

        <button
          className="filter-button"
          onClick={() => alternarFiltro('data')}
        >
          <span>
            {ordenacao === 'DATA_ASC'
              ? 'Data ↑'
              : ordenacao === 'DATA_DESC'
                ? 'Data ↓'
                : 'Data'
            }
          </span>

          <span className="filter-arrow"></span>
        </button>

        {filtroAberto === 'data' && (

          <div className="filter-menu">

            <button
              onClick={() =>
                setOrdenacao('DATA_ASC')
              }
            >
              Mais antigas
            </button>

            <button
              onClick={() =>
                setOrdenacao('DATA_DESC')
              }
            >
              Mais recentes
            </button>

          </div>

        )}

      </div>


      {/* ORDENAR PRIORIDADE */}

      <div className="filter-dropdown">

        <button
          className="filter-button"
          onClick={() => alternarFiltro('ordemPrioridade')}
        >
          <span>
            {ordenacao === 'PRIORIDADE_ASC'
              ? 'Prioridade ↑'
              : ordenacao === 'PRIORIDADE_DESC'
                ? 'Prioridade ↓'
                : 'Prioridade'
            }
          </span>

          <span className="filter-arrow"></span>
        </button>

        {filtroAberto === 'ordemPrioridade' && (

          <div className="filter-menu">

            <button
              onClick={() =>
                setOrdenacao('PRIORIDADE_DESC')
              }
            >
              Maior prioridade
            </button>

            <button
              onClick={() =>
                setOrdenacao('PRIORIDADE_ASC')
              }
            >
              Menor prioridade
            </button>

          </div>

        )}

      </div>

    </div>
  )
}

export default TaskFilters