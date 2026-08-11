import { useEffect, useState } from 'react'

import '../css/SystemLog.css'


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


function SystemLogs() {

  const [logs, setLogs] = useState([])

  const [carregando, setCarregando] =
    useState(true)

  const [erro, setErro] = useState('')


  useEffect(() => {

    buscarLogs()

  }, [])


  async function buscarLogs() {

    try {

      setCarregando(true)

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


      console.log(
        'Logs recebidos:',
        dados
      )


      setLogs(dados)

    } catch (error) {

      console.error(
        'Erro ao buscar logs:',
        error
      )


      setErro(
        'Não foi possível carregar os logs do sistema.'
      )

    } finally {

      setCarregando(false)

    }

  }


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


      <div className="logs-list">


        {carregando && (

          <div className="log-message">

            Carregando logs...

          </div>

        )}


        {!carregando && erro && (

          <div className="log-message log-error">

            {erro}

          </div>

        )}


        {!carregando &&
          !erro &&
          logs.length === 0 && (

            <div className="log-message">

              Nenhuma alteração registrada.

            </div>

          )
        }


        {!carregando &&
          !erro &&
          logs.map((log) => (

            <div
              className="log-item"
              key={log.id}
            >

              <span className="log-indicator"></span>


              <div className="log-content">


                <p>
                  {log.mensagem}
                </p>


                <span>
                  {formatarHorario(
                    log.dataHora
                  )}
                </span>


              </div>


            </div>

          ))
        }


      </div>


    </section>

  )

}


export default SystemLogs