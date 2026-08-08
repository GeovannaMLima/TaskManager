import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import KanbanBoard from './components/KanbanQuadro'
import SystemLogs from './components/SystemLogs'

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Header />
        <KanbanBoard />
        <SystemLogs />
      </main>
    </div>
  )
}

export default App