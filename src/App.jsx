import { useEffect, useState } from 'react'
import './App.css'

import GraficoFaturamento from './components/GraficoFaturamento'
import Projetos from './pages/Projetos'
import Clientes from './pages/Clientes'


function App() {

  const [pagina, setPagina] = useState('dashboard')

  const [modoEscuro, setModoEscuro] =
    useState(false)

  const [periodo, setPeriodo] =
    useState('6')

  const [projetos, setProjetos] =
    useState([])

  const [clientes, setClientes] =
    useState([])

  // =========================
  // CARREGAR PROJETOS
  // =========================

  useEffect(() => {

    try {

      const projetosSalvos =
        localStorage.getItem('devdash-projetos')

      if (projetosSalvos) {

        const dados =
          JSON.parse(projetosSalvos)

        if (Array.isArray(dados)) {
          setProjetos(dados)
        }

      }

    } catch (erro) {

      console.error(
        'Erro ao carregar projetos:',
        erro
      )

    }

  }, [])

  // =========================
  // CARREGAR CLIENTES
  // =========================

  useEffect(() => {

    try {

      const clientesSalvos =
        localStorage.getItem('devdash-clientes')

      if (clientesSalvos) {

        const dados =
          JSON.parse(clientesSalvos)

        if (Array.isArray(dados)) {
          setClientes(dados)
        }

      }

    } catch (erro) {

      console.error(
        'Erro ao carregar clientes:',
        erro
      )

    }

  }, [])

  // =========================
  // NORMALIZAR CLIENTES
  // =========================

  useEffect(() => {

    if (!clientes.length) {
      return
    }

    try {

      const clientesUnicos = []
      const mapaClientes = new Map()

      clientes.forEach((cliente) => {

        const chave =
          String(cliente.nome || '')
            .trim()
            .replace(/\\s+/g, ' ')
            .toLowerCase()

        if (!chave) {
          return
        }

        if (!mapaClientes.has(chave)) {

          mapaClientes.set(
            chave,
            cliente.id
          )

          clientesUnicos.push(cliente)

        }

      })

      const idsDuplicados = new Map()

      clientes.forEach((cliente) => {

        const chave =
          String(cliente.nome || '')
            .trim()
            .replace(/\\s+/g, ' ')
            .toLowerCase()

        if (!chave) {
          return
        }

        const idPrincipal =
          mapaClientes.get(chave)

        if (cliente.id !== idPrincipal) {

          idsDuplicados.set(
            cliente.id,
            idPrincipal
          )

        }

      })

      if (idsDuplicados.size > 0) {

        const projetosAtualizados =
          projetos.map((projeto) => {

            if (
              projeto.clienteId &&
              idsDuplicados.has(projeto.clienteId)
            ) {

              return {
                ...projeto,
                clienteId:
                  idsDuplicados.get(
                    projeto.clienteId
                  )
              }

            }

            return projeto

          })

        setClientes(clientesUnicos)
        setProjetos(projetosAtualizados)

        localStorage.setItem(
          'devdash-clientes',
          JSON.stringify(clientesUnicos)
        )

        localStorage.setItem(
          'devdash-projetos',
          JSON.stringify(projetosAtualizados)
        )

      }

    } catch (erro) {

      console.error(
        'Erro ao normalizar clientes:',
        erro
      )

    }

  }, [clientes, projetos])

  // =========================
  // DADOS DINÂMICOS
  // =========================

  const totalProjetos =
    projetos.length

  const projetosConcluidos =
    projetos.filter(
      (projeto) =>
        String(projeto.status || '')
          .trim()
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') ===
        'concluido'
    ).length

  const totalClientes =
    clientes.length

  const faturamentoTotal =
    projetos.reduce(
      (total, projeto) =>
        total +
        Number(projeto.valor || 0),
      0
    )
const dadosFaturamento = projetos.map(
  (projeto) => ({
    mes: projeto.nome,
    valor: Number(projeto.valor || 0)
  })
)
  // =========================
  // GRÁFICO
  // =========================

  let dadosFiltrados =
    dadosFaturamento

  if (periodo === '3') {

    dadosFiltrados =
      dadosFaturamento.slice(-3)

  }

  if (periodo === '6') {

    dadosFiltrados =
      dadosFaturamento.slice(-6)

  }

  return (

    <div
      className={`dashboard ${
        modoEscuro
          ? 'dark-mode'
          : ''
      }`}
    >

      {/* SIDEBAR */}

      <aside className="sidebar">

        <h2>
          DevDash
        </h2>

        <nav>

          <a
            href="#"
            className={pagina === 'dashboard' ? 'active' : ''}
            onClick={(e) => {

              e.preventDefault()

              setPagina('dashboard')

            }}
          >
            Dashboard
          </a>

          <a
            href="#"
            className={pagina === 'projetos' ? 'active' : ''}
            onClick={(e) => {

              e.preventDefault()

              setPagina('projetos')

            }}
          >
            Projetos
          </a>

          <a
            href="#"
            className={pagina === 'clientes' ? 'active' : ''}
            onClick={(e) => {

              e.preventDefault()

              setPagina('clientes')

            }}
          >
            Clientes
          </a>

          <a
            href="#"
            className={pagina === 'relatorios' ? 'active' : ''}
            onClick={(e) => {

              e.preventDefault()

              setPagina('relatorios')

            }}
          >
            Relatórios
          </a>

        </nav>

      </aside>

      {/* CONTEÚDO */}

      <main className="main-content">

        {/* PROJETOS */}

        {pagina === 'projetos' ? (

          <Projetos setPagina={setPagina} />

        ) : pagina === 'clientes' ? (

          <Clientes />

        ) : (

          <>

            {/* TOPBAR */}

            <header className="topbar">

              <div>

                <h1>
                  {pagina === 'relatorios'
                    ? 'Relatórios'
                    : 'Dashboard'}
                </h1>

                <p>
                  Visão geral do sistema
                </p>

              </div>

              <div className="user">

                <button
                  className="theme-button"
                  onClick={() =>
                    setModoEscuro(
                      !modoEscuro
                    )
                  }
                >
                  {modoEscuro
                    ? '☀️'
                    : '🌙'}
                </button>

                <span>
                  Olá, Cleiton
                </span>

                <div className="avatar">
                  C
                </div>

              </div>

            </header>

            {/* RELATÓRIOS */}

            {pagina === 'relatorios' ? (

              <section className="content-grid">

                <div className="panel">

                  <h2>
                    Resumo
                  </h2>

                  <p>
                    Total de projetos:{' '}
                    {totalProjetos}
                  </p>

                  <p>
                    Projetos concluídos:{' '}
                    {projetosConcluidos}
                  </p>

                  <p>
                    Clientes cadastrados:{' '}
                    {totalClientes}
                  </p>

                </div>

                <div className="panel">

                  <h2>
                    Faturamento
                  </h2>

                  <p>
                    {faturamentoTotal.toLocaleString(
                      'pt-BR',
                      {
                        style: 'currency',
                        currency: 'BRL'
                      }
                    )}
                  </p>

                </div>

              </section>

            ) : (

              <>

                {/* CARDS */}

                <section className="cards">

                  <div
                    className="card card-clickable"
                    onClick={() => setPagina('projetos')}
                    role="button"
                    tabIndex={0}
                  >

                    <div className="card-top">

                      <span>
                        Projetos
                      </span>

                      <div className="card-icon">
                        📁
                      </div>

                    </div>

                    <strong>
                      {totalProjetos}
                    </strong>

                    <small className="crescimento">
                      Dados reais
                    </small>

                  </div>

                  <div
                    className="card card-clickable"
                    onClick={() => setPagina('clientes')}
                    role="button"
                    tabIndex={0}
                  >

                    <div className="card-top">

                      <span>
                        Clientes
                      </span>

                      <div className="card-icon">
                        👥
                      </div>

                    </div>

                    <strong>
                      {totalClientes}
                    </strong>

                    <small className="crescimento">
                      Dados reais
                    </small>

                  </div>

                  <div
                    className="card card-clickable"
                    onClick={() => setPagina('relatorios')}
                    role="button"
                    tabIndex={0}
                  >

                    <div className="card-top">

                      <span>
                        Projetos concluídos
                      </span>

                      <div className="card-icon">
                        ✅
                      </div>

                    </div>

                    <strong>
                      {projetosConcluidos}
                    </strong>

                    <small className="crescimento">
                      Dados reais
                    </small>

                  </div>

                  <div
                    className="card card-clickable"
                    onClick={() => setPagina('relatorios')}
                    role="button"
                    tabIndex={0}
                  >

                    <div className="card-top">

                      <span>
                        Faturamento
                      </span>

                      <div className="card-icon">
                        💰
                      </div>

                    </div>

                    <strong>

                      {faturamentoTotal.toLocaleString(
                        'pt-BR',
                        {
                          style: 'currency',
                          currency: 'BRL'
                        }
                      )}

                    </strong>

                    <small className="crescimento">
                      Dados reais
                    </small>

                  </div>

                </section>

                {/* GRÁFICO */}

                <GraficoFaturamento
                  dados={dadosFiltrados}
                  periodo={periodo}
                  setPeriodo={setPeriodo}
                />

                {/* RESUMO */}

                <section className="content-grid">

                  <div className="panel">

                    <h2>
                      Resumo
                    </h2>

                    <p>
                      Total de projetos:{' '}
                      {totalProjetos}
                    </p>

                    <p>
                      Projetos concluídos:{' '}
                      {projetosConcluidos}
                    </p>

                    <p>
                      Clientes cadastrados:{' '}
                      {totalClientes}
                    </p>

                  </div>

                  <div className="panel">

                    <h2>
                      Faturamento
                    </h2>

                    <p>

                      {faturamentoTotal.toLocaleString(
                        'pt-BR',
                        {
                          style: 'currency',
                          currency: 'BRL'
                        }
                      )}

                    </p>

                  </div>

                </section>

              </>

            )}

          </>

        )}

      </main>

    </div>

  )
}

export default App
