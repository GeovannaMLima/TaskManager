import { useState } from 'react'
import '../css/CriarTarefa.css'

import TopBar from '../componentes/TopBar'

function CriarTarefa() {

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')

  const [tipo, setTipo] = useState('FEATURE')
  const [prioridade, setPrioridade] = useState('MEDIA')
  const [status, setStatus] = useState('TODO')

  const [dataVencimento, setDataVencimento] = useState('')

  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)

  async function criarTarefa(event: React.FormEvent) {
    event.preventDefault()

    setErro('')
    setCarregando(true)

    try {
      const resposta = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          titulo: titulo,
          descricao: descricao,
          tipo: tipo,
          prioridade: prioridade,
          dataVencimento: dataVencimento
        })
      })

      const textoResposta = await resposta.text()

      console.log('Status:', resposta.status)
      console.log('Resposta do backend:', textoResposta)

      if (!resposta.ok) {
        throw new Error(
          `Erro ${resposta.status}: ${textoResposta}`
        )
      }

      const tarefaCriada = textoResposta
        ? JSON.parse(textoResposta)
        : null

      console.log('Tarefa criada:', tarefaCriada)

      setSucesso(true)

      setTimeout(() => {
        setSucesso(false)
      }, 2000)

      setTitulo('')
      setDescricao('')
      setTipo('FEATURE')
      setPrioridade('MEDIA')
      setStatus('TODO')
      setDataVencimento('')

    } catch (error) {

      console.error('Erro ao criar tarefa:', error)

      if (error instanceof Error) {
        setErro(error.message)
      } else {
        setErro('Erro desconhecido ao criar a tarefa.')
      }

    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="main-content criar-tarefa-page">

      <TopBar titulo="Nova Tarefa" />

      <div className="criar-tarefa-content">

        <div className="breadcrumb">
          <span>Dashboard</span>
          <span>›</span>
          <strong>Nova Tarefa</strong>
        </div>

        <div className="criar-tarefa-heading">
          <h1>Nova Tarefa</h1>
        </div>

        <form
          className="task-form"
          onSubmit={criarTarefa}
        >

          {/* NOME */}

          <div className="form-group">

            <label htmlFor="titulo">
              Nome da Tarefa <span>*</span>
            </label>

            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              placeholder="Digite o nome da tarefa"
              autoComplete='off'
            />

          </div>

          {/* DESCRIÇÃO */}

          <div className="form-group">

            <label htmlFor="descricao">
              Descrição
            </label>

            <textarea
              id="descricao"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              placeholder="Descreva a tarefa..."
            />

          </div>

          {/* TIPO */}

          <div className="form-group">

            <label>
              Tipo de Tarefa <span>*</span>
            </label>

            <div className="option-group type-options">

              <button
                type="button"
                className={`type-option bug ${tipo === 'BUG' ? 'selected' : ''
                  }`}
                onClick={() => setTipo('BUG')}
              >
                <span className="option-dot"></span>
                Bug
              </button>

              <button
                type="button"
                className={`type-option feature ${tipo === 'FEATURE' ? 'selected' : ''
                  }`}
                onClick={() => setTipo('FEATURE')}
              >
                <span className="option-dot"></span>
                Feature
              </button>

              <button
                type="button"
                className={`type-option refactor ${tipo === 'REFACTOR' ? 'selected' : ''
                  }`}
                onClick={() => setTipo('REFACTOR')}
              >
                <span className="option-dot"></span>
                Refactor
              </button>

            </div>

          </div>

          {/* PRIORIDADE + DATA */}

          <div className="form-row">

            <div className="form-group priority-group">

              <label>
                Prioridade <span>*</span>
              </label>

              <div className="priority-options">

                <button
                  type="button"
                  className={`priority-option ${prioridade === 'BAIXA' ? 'selected' : ''
                    }`}
                  onClick={() => setPrioridade('BAIXA')}
                >
                  Baixa
                </button>

                <button
                  type="button"
                  className={`priority-option ${prioridade === 'MEDIA' ? 'selected' : ''
                    }`}
                  onClick={() => setPrioridade('MEDIA')}
                >
                  Média
                </button>

                <button
                  type="button"
                  className={`priority-option ${prioridade === 'ALTA' ? 'selected' : ''
                    }`}
                  onClick={() => setPrioridade('ALTA')}
                >
                  Alta
                </button>

              </div>

            </div>

            <div className="form-group date-group">

              <label htmlFor="vencimento">
                Data de Vencimento <span>*</span>
              </label>

              <div className="date-input">

                <input
                  id="vencimento"
                  type="date"
                  value={dataVencimento}
                  onChange={(event) =>
                    setDataVencimento(event.target.value)
                  }
                />

              </div>

            </div>

          </div>

          {/* STATUS */}

          <div className="form-group">

            <label>
              Status Inicial <span>*</span>
            </label>

            <div className="status-options">

              <button
                type="button"
                className={`status-option todo ${status === 'TODO' ? 'selected' : ''
                  }`}
                onClick={() => setStatus('TODO')}
              >
                <span className="option-dot"></span>
                To Do
              </button>

              <button
                type="button"
                className={`status-option doing ${status === 'DOING' ? 'selected' : ''
                  }`}
                onClick={() => setStatus('DOING')}
              >
                <span className="option-dot"></span>
                Doing
              </button>

              <button
                type="button"
                className={`status-option done ${status === 'DONE' ? 'selected' : ''
                  }`}
                onClick={() => setStatus('DONE')}
              >
                <span className="option-dot"></span>
                Done
              </button>

            </div>

          </div>

          {/* ERRO */}

          {erro && (
            <div className="form-error">
              {erro}
            </div>
          )}

          {/* AÇÕES */}

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setTitulo('')
                setDescricao('')
                setTipo('FEATURE')
                setPrioridade('MEDIA')
                setStatus('TODO')
                setDataVencimento('')
                setErro('')
              }}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="create-button"
              disabled={carregando}
            >
              <span>+</span>

              {carregando
                ? 'Criando...'
                : 'Criar Tarefa'
              }

            </button>

            {sucesso && (
              <div className="success-modal">
                <span className="success-icon">✓</span>

                <div>
                  <strong>Tarefa criada com sucesso!</strong>
                  <span>A tarefa foi adicionada ao sistema.</span>
                </div>
              </div>
            )}

          </div>

        </form>

      </div>

    </main>
  )
}

export default CriarTarefa