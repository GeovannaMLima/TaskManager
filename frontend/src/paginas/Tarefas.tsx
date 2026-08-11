import { useEffect, useState } from 'react'

import '../css/Tarefas.css'

import TopBar from '../componentes/TopBar'
import TaskFilters from '../componentes/TaskFilters'
import TaskTable from '../componentes/TaskTable'

interface Tarefa {
  id: number
  titulo: string
  descricao: string
  status: string
  tipo: string
  prioridade: string
  dataCriacao: string
  dataVencimento: string | null
}

function Tarefas() {

  const [tarefas, setTarefas] = useState<Tarefa[]>([])

  const [carregando, setCarregando] = useState(true)

  const [erro, setErro] = useState('')

  const [busca, setBusca] = useState('')

  const [status, setStatus] = useState('TODOS')

  const [tipo, setTipo] = useState('TODOS')

  const [prioridade, setPrioridade] = useState('TODAS')

  const [vencimento, setVencimento] = useState('TODOS')

  const [ordenacao, setOrdenacao] = useState('DATA_DESC')


  useEffect(() => {
    buscarTarefas()
  }, [])


  async function buscarTarefas() {

    try {

      setCarregando(true)
      setErro('')

      const resposta = await fetch(
        'http://localhost:8080/api/tasks'
      )

      if (!resposta.ok) {
        throw new Error(
          'Não foi possível carregar as tarefas.'
        )
      }

      const dados = await resposta.json()

      console.log('Tarefas recebidas:', dados)

      setTarefas(dados)

    } catch (error) {

      console.error(
        'Erro ao buscar tarefas:',
        error
      )

      setErro(
        'Não foi possível carregar as tarefas. Verifique se o backend está funcionando.'
      )

    } finally {

      setCarregando(false)

    }
  }


  const tarefasFiltradas = tarefas
    .filter((tarefa) => {

      if (!busca.trim()) {
        return true
      }

      return tarefa.titulo
        .toLowerCase()
        .includes(busca.toLowerCase())

    })

    .filter((tarefa) => {

      if (status === 'TODOS') {
        return true
      }

      return tarefa.status === status

    })

    .filter((tarefa) => {

      if (tipo === 'TODOS') {
        return true
      }

      return tarefa.tipo === tipo

    })

    .filter((tarefa) => {

      if (prioridade === 'TODAS') {
        return true
      }

      return tarefa.prioridade === prioridade

    })

    .filter((tarefa) => {

      if (vencimento === 'TODOS') {
        return true
      }

      if (vencimento === 'COM') {
        return tarefa.dataVencimento !== null
      }

      return tarefa.dataVencimento === null

    })

    .sort((a, b) => {

      if (
        ordenacao === 'PRIORIDADE_ASC' ||
        ordenacao === 'PRIORIDADE_DESC'
      ) {

        const ordemPrioridade = {
          BAIXA: 1,
          MEDIA: 2,
          ALTA: 3
        }

        const resultado =
          ordemPrioridade[a.prioridade] -
          ordemPrioridade[b.prioridade]

        return ordenacao === 'PRIORIDADE_ASC'
          ? resultado
          : -resultado
      }


      const dataA = a.dataVencimento
        ? new Date(a.dataVencimento).getTime()
        : Infinity

      const dataB = b.dataVencimento
        ? new Date(b.dataVencimento).getTime()
        : Infinity

      const resultado = dataA - dataB

      return ordenacao === 'DATA_ASC'
        ? resultado
        : -resultado

    })


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


        <TaskFilters
          busca={busca}
          setBusca={setBusca}

          status={status}
          setStatus={setStatus}

          tipo={tipo}
          setTipo={setTipo}

          prioridade={prioridade}
          setPrioridade={setPrioridade}

          vencimento={vencimento}
          setVencimento={setVencimento}

          ordenacao={ordenacao}
          setOrdenacao={setOrdenacao}
        />


        {carregando && (
          <p className="tarefas-loading">
            Carregando tarefas...
          </p>
        )}


        {erro && (
          <p className="tarefas-error">
            {erro}
          </p>
        )}


        {!carregando && !erro && (
          <TaskTable
            tarefas={tarefasFiltradas}
          />
        )}

      </div>

    </main>
  )
}

export default Tarefas