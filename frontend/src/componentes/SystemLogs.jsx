import { useEffect, useState } from 'react'

import '../css/SystemLog.css'


function formatarStatus(status) {

  switch (status) {

    case 'TODO':
      return 'To Do'

    case 'DOING':
      return 'Doing'

    case 'DONE':
      return 'Done'

    default:
      return status

  }

}


function formatarHorario(dataHora) {

  if (!dataHora) {
    return '-'
  }


  const data = new Date(dataHora)


  return data.toLocaleTimeString(
    'pt-BR',
    {
      hour: '2-digit',
      minute: '2-digit'
    }
  )

}


function criarMensagem(log) {

  const statusAnterior =
    formatarStatus(log.statusAnterior)


  const statusNovo =
    formatarStatus(log.statusNovo)


  return `Tarefa "${log.tituloTarefa}" movida de ${statusAnterior} para ${statusNovo}.`

}


function SystemLogs({ refreshTrigger }) {

  const [logs, setLogs] = useState([])

  const [carregando, setCarregando] = useState(true)

  const [erro, setErro] = useState('')


  useEffect(() => {

    async function carregarLogs() {

      try {

        setErro('')


        const resposta = await fetch(
          'http://localhost:8080/api/logs'
        )


        if (!resposta.ok) {

          throw new Error(
            'Não foi possível carregar os logs.'
          )

        }


        const dados = await resposta.json()


        setLogs(dados)


      } catch (error) {

        console.error(
          'Erro ao carregar logs:',
          error
        )


        setErro(
          'Não foi possível carregar os logs do sistema.'
        )


      } finally {

        setCarregando(false)

      }

    }


    carregarLogs()

  }, [refreshTrigger])


  return (
    <section className="system-logs">

      <div className="logs-header">

        <div>

          <h2>
            Logs do Sistema
          </h2>

          <p>
            Registro das últimas alterações realizadas nas tarefas.
          </p>

        </div>


        <span className="observer-badge">
          Observer
        </span>

      </div>


      {erro && (
        <div className="logs-error">
          {erro}
        </div>
      )}


      <div className="logs-list">

        {carregando ? (

          <div className="logs-empty">
            Carregando logs...
          </div>

        ) : logs.length === 0 ? (

          <div className="logs-empty">
            Nenhuma alteração registrada.
          </div>

        ) : (

          logs.map((log) => (

            <div
              className="log-item"
              key={log.id}
            >

              <span className="log-indicator"></span>


              <div className="log-content">

                <p>
                  {criarMensagem(log)}
                </p>


                <span>
                  {formatarHorario(log.dataHora)}
                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  )
}


export default SystemLogs