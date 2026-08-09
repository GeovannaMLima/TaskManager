import './css/App.css'
import Sidebar from './componentes/Sidebar'
import Header from './componentes/Header'
import KanbanQuadro from './componentes/KanbanQuadro'

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Header />
        <KanbanQuadro />
      </main>
    </div>
  )
}

export default App