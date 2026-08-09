import './css/App.css'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Sidebar from './componentes/Sidebar'

import Dashboard from './paginas/Dashboard'
import Tarefas from './paginas/Tarefas'
import CriarTarefa from './paginas/CriarTarefa'
import Relatorio from './paginas/Relatorio'

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Sidebar />

        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/tarefas"
            element={<Tarefas />}
          />

          <Route
            path="/criar-tarefa"
            element={<CriarTarefa />}
          />

          <Route
            path="/relatorios"
            element={<Relatorio />}
          />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App