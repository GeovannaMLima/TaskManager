import Header from '../componentes/Header'
import KanbanQuadro from '../componentes/KanbanQuadro'
import SystemLogs from '../componentes/SystemLogs'

function Dashboard() {
  return (
    <main className="main-content">
      <Header />

      <KanbanQuadro />

      <SystemLogs />
    </main>
  )
}

export default Dashboard