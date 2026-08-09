import '../css/SystemLog.css'

const logs = [
  {
    id: 1,
    mensagem: 'Tarefa "Corrigir erro de autenticação" movida para Doing.',
    horario: '20:14'
  },
  {
    id: 2,
    mensagem: 'Tarefa "Implementar página de login" criada.',
    horario: '19:52'
  },
  {
    id: 3,
    mensagem: 'Tarefa "Integrar biblioteca de ícones" concluída.',
    horario: '18:37'
  }
]

function SystemLogs() {
  return (
    <section className="system-logs">
      <div className="logs-header">
        <div>
          <h2>Logs do Sistema</h2>
          <p>Registro das últimas alterações realizadas nas tarefas.</p>
        </div>

        <span className="observer-badge">
          Observer
        </span>
      </div>

      <div className="logs-list">
        {logs.map((log) => (
          <div className="log-item" key={log.id}>
            <span className="log-indicator"></span>

            <div className="log-content">
              <p>{log.mensagem}</p>
              <span>{log.horario}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SystemLogs