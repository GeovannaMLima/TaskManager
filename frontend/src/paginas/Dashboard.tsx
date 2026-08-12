import { useState } from 'react'

import Header from '../componentes/Header'
import KanbanQuadro from '../componentes/KanbanQuadro'
import SystemLogs from '../componentes/SystemLogs'

function Dashboard() {

  const [logsAtualizados, setLogsAtualizados] = useState(0)


  function atualizarLogs() {
    setLogsAtualizados((valor) => valor + 1)
  }


  return (
    <main className="main-content">

      <Header />

      <KanbanQuadro
        onStatusChanged={atualizarLogs}
      />

      <SystemLogs
        refreshTrigger={logsAtualizados}
      />

    </main>
  )
}

export default Dashboard