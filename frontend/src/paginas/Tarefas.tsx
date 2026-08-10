import '../css/Tarefas.css'

import TopBar from '../componentes/TopBar'
import TaskFilters from '../componentes/TaskFilters'
import TaskTable from '../componentes/TaskTable'

function Tarefas() {
  return (
    <main className="main-content tarefas-page">

     <TopBar titulo="Tarefas" />

      <div className="tarefas-content">

        <div className="tarefas-heading">
          <div>

            <p>
              Gerencie e acompanhe todas as tarefas do sistema.
            </p>
          </div>
        </div>

        <TaskFilters />

        <TaskTable />

      </div>

    </main>
  )
}

export default Tarefas