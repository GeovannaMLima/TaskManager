import '../css/TaskTable.css'

const tarefas = [
  {
    id: 1,
    titulo: 'Corrigir erro de autenticação',
    tipo: 'Bug',
    status: 'To Do',
    prioridade: 'Alta',
    vencimento: '28/05/2025'
  },
  {
    id: 2,
    titulo: 'Implementar página de login',
    tipo: 'Feature',
    status: 'To Do',
    prioridade: 'Média',
    vencimento: '30/05/2025'
  },
  {
    id: 3,
    titulo: 'Desenvolver API de tarefas',
    tipo: 'Feature',
    status: 'Doing',
    prioridade: 'Média',
    vencimento: '27/05/2025'
  },
  {
    id: 4,
    titulo: 'Configurar banco de dados',
    tipo: 'Refactor',
    status: 'Done',
    prioridade: 'Baixa',
    vencimento: '20/05/2025'
  }
]

function TaskTable() {
  return (
    <div className="task-table-container">

      <table className="task-table">

        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Tipo</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th>Vencimento</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {tarefas.map((tarefa) => (

            <tr key={tarefa.id}>

              <td className="task-title">
                {tarefa.titulo}
              </td>

              <td>
                <span
                  className={`task-type ${tarefa.tipo.toLowerCase()}`}
                >
                  {tarefa.tipo}
                </span>
              </td>

              <td>
                <span
                  className={`task-status ${tarefa.status
                    .toLowerCase()
                    .replace(' ', '-')}`}
                >
                  <span className="status-dot"></span>
                  {tarefa.status}
                </span>
              </td>

              <td>
                <span
                  className={`table-priority ${tarefa.prioridade.toLowerCase()}`}
                >
                  <span className="priority-dot"></span>
                  {tarefa.prioridade}
                </span>
              </td>

              <td className="task-due-date">
                {tarefa.vencimento}
              </td>

              <td>
                <button className="action-button">
                  ...
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="table-footer">

        <span>
          Mostrando 1-4 de 12 tarefas
        </span>

        <div className="pagination">

          <button>
            Anterior
          </button>

          <button className="page-active">
            1
          </button>

          <button>
            2
          </button>

          <button>
            3
          </button>

          <button>
            Próximo
          </button>

        </div>

      </div>

    </div>
  )
}

export default TaskTable