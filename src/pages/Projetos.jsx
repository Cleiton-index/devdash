import { useEffect, useState } from 'react'

function Projetos() {

  const projetosIniciais = [
    {
      id: 1,
      nome: 'LOJA-01',
      cliente: 'Cliente demonstração',
      descricao: 'Loja virtual Front-End',
      status: 'Concluído',
      valor: 0
    },
    {
      id: 2,
      nome: 'Jokempô',
      cliente: 'Cliente demonstração',
      descricao: 'Jogo desenvolvido com JavaScript',
      status: 'Concluído',
      valor: 0
    },
    {
      id: 3,
      nome: 'Dashboard React',
      cliente: 'Cliente demonstração',
      descricao: 'Sistema de gestão desenvolvido em React',
      status: 'Em andamento',
      valor: 0
    }
  ]

  // =========================
  // PROJETOS
  // =========================

  const [projetos, setProjetos] = useState(() => {

    try {

      const projetosSalvos =
        localStorage.getItem('devdash-projetos')

      if (!projetosSalvos) {
        return projetosIniciais
      }

      const dados =
        JSON.parse(projetosSalvos)

      if (Array.isArray(dados)) {
        return dados
      }

      return projetosIniciais

    } catch (erro) {

      console.error(
        'Erro ao carregar projetos:',
        erro
      )

      return projetosIniciais
    }

  })

  // =========================
  // CLIENTES
  // =========================

  const [clientes, setClientes] = useState(() => {

    try {

      const clientesSalvos =
        localStorage.getItem('devdash-clientes')

      if (!clientesSalvos) {
        return []
      }

      const dados =
        JSON.parse(clientesSalvos)

      return Array.isArray(dados)
        ? dados
        : []

    } catch (erro) {

      console.error(
        'Erro ao carregar clientes:',
        erro
      )

      return []

    }

  })

  // =========================
  // FORMULÁRIO
  // =========================

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false)

  const [nome, setNome] =
    useState('')

  const [cliente, setCliente] =
    useState('')

  const [clienteId, setClienteId] =
    useState('')

  const [descricao, setDescricao] =
    useState('')

  const [valor, setValor] =
    useState('')

  const [status, setStatus] =
    useState('Em andamento')

  const [editandoId, setEditandoId] =
    useState(null)

  // =========================
  // SALVAR LOCALSTORAGE
  // =========================

  useEffect(() => {

    localStorage.setItem(
      'devdash-projetos',
      JSON.stringify(projetos)
    )

  }, [projetos])

  // =========================
  // MIGRAR PROJETOS PARA CLIENTE ID
  // =========================

  useEffect(() => {

    if (!projetos.length) {
      return
    }

    try {

      let clientesAtuais = [...clientes]
      let houveAlteracao = false

      const projetosMigrados =
        projetos.map((projeto) => {

          if (projeto.clienteId) {
            return projeto
          }

          const nomeCliente =
            String(projeto.cliente || '').trim()

          if (!nomeCliente) {
            return projeto
          }

          let clienteEncontrado =
            clientesAtuais.find(
              (item) =>
                String(item.nome || '')
                  .trim()
                  .toLowerCase() ===
                nomeCliente.toLowerCase()
            )

          if (!clienteEncontrado) {

            clienteEncontrado = {

              id: Date.now() +
                Math.floor(
                  Math.random() * 100000
                ),

              nome: nomeCliente,

              email: '',

              telefone: ''

            }

            clientesAtuais = [
              ...clientesAtuais,
              clienteEncontrado
            ]

          }

          houveAlteracao = true

          return {
            ...projeto,
            clienteId: clienteEncontrado.id
          }

        })

      if (houveAlteracao) {

        setProjetos(projetosMigrados)

        setClientes(clientesAtuais)

        localStorage.setItem(
          'devdash-clientes',
          JSON.stringify(clientesAtuais)
        )

      }

    } catch (erro) {

      console.error(
        'Erro na migração dos projetos:',
        erro
      )

    }

  }, [projetos, clientes])

  // =========================
  // LIMPAR FORMULÁRIO
  // =========================

  function limparFormulario() {

    setNome('')
    setCliente('')
    setDescricao('')
    setValor('')
    setStatus('Em andamento')
    setEditandoId(null)

  }

  // =========================
  // SALVAR PROJETO
  // =========================

function salvarProjeto(e) {

  e.preventDefault()

  if (!nome.trim()) {
    return
  }

  const clienteSelecionado =
    clientes.find(
      (item) =>
        String(item.id) ===
        String(clienteId)
    )

  const nomeCliente =
    clienteSelecionado?.nome ||
    cliente.trim()

  const projetoAtualizado = {

    nome: nome.trim(),

    cliente: nomeCliente,

    clienteId:
      clienteSelecionado?.id || null,

    descricao: descricao.trim(),

    valor: Number(
      String(valor)
        .replace(',', '.')
        .replace(/[^\d.-]/g, '')
    ) || 0,

    status

  }

  // EDITAR PROJETO

  if (editandoId !== null) {

    setProjetos(

      projetos.map((projeto) =>

        projeto.id === editandoId

          ? {
              ...projeto,
              ...projetoAtualizado
            }

          : projeto

      )

    )

  }

  // NOVO PROJETO

  else {

    const novoProjeto = {

      id: Date.now(),

      ...projetoAtualizado

    }

    setProjetos([

      ...projetos,

      novoProjeto

    ])

  }

  limparFormulario()

  setMostrarFormulario(false)

}

  // =========================
  // EDITAR PROJETO
  // =========================

  function editarProjeto(projeto) {

    setNome(projeto.nome || '')

    setClienteId(
      projeto.clienteId
        ? String(projeto.clienteId)
        : ''
    )

    setCliente(projeto.cliente || '')

    setDescricao(projeto.descricao || '')

    setValor(projeto.valor ?? '')

    setStatus(
      projeto.status || 'Em andamento'
    )

    setEditandoId(projeto.id)

    setMostrarFormulario(true)

  }

  // =========================
  // EXCLUIR PROJETO
  // =========================

  function excluirProjeto(id) {

    const confirmar =
      window.confirm(
        'Deseja realmente excluir este projeto?'
      )

    if (!confirmar) {
      return
    }

    setProjetos(

      projetos.filter(
        (projeto) =>
          projeto.id !== id
      )

    )

  }

  return (

    <div className="page-content">

      {/* CABEÇALHO */}

      <div
        className="page-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}
      >

        <div>

          <h1>
            Projetos
          </h1>

          <p>
            Gerencie seus projetos
          </p>

        </div>

        <button
          className="theme-button"
          onClick={() => {

            limparFormulario()

            setMostrarFormulario(
              !mostrarFormulario
            )

          }}
        >
          {mostrarFormulario
            ? '✕ Fechar'
            : '+ Novo projeto'}
        </button>

      </div>

      {/* FORMULÁRIO */}

      {mostrarFormulario && (

        <div className="panel">

          <h2>

            {editandoId !== null
              ? 'Editar projeto'
              : 'Novo projeto'}

          </h2>

          <form
            onSubmit={salvarProjeto}
          >

            <div
              style={{
                display: 'grid',
                gap: '16px'
              }}
            >

              {/* NOME */}

              <div>

                <label>
                  Nome do projeto
                </label>

                <input
                  type="text"
                  value={nome}
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                  placeholder="Ex.: Sistema Farmácia Santos"
                  required
                />

              </div>

              {/* CLIENTE */}

              <div>

                <label>
                  Cliente
                </label>

                <select
                  value={clienteId}
                  onChange={(e) => {

                    const idSelecionado =
                      e.target.value

                    setClienteId(idSelecionado)

                    const clienteSelecionado =
                      clientes.find(
                        (item) =>
                          String(item.id) ===
                          String(idSelecionado)
                      )

                    setCliente(
                      clienteSelecionado?.nome || ''
                    )

                  }}
                >

                  <option value="">
                    Selecione um cliente
                  </option>

                  {clientes.map((item) => (

                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.nome}
                    </option>

                  ))}

                </select>

              </div>

              {/* DESCRIÇÃO */}

              <div>

                <label>
                  Descrição
                </label>

                <textarea
                  value={descricao}
                  onChange={(e) =>
                    setDescricao(e.target.value)
                  }
                  placeholder="Descreva o projeto"
                  rows="4"
                />

              </div>

              {/* VALOR */}

              <div>

                <label>
                  Valor do projeto
                </label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={valor}
                  onChange={(e) =>
                    setValor(e.target.value)
                  }
                  placeholder="Ex.: 4800"
                />

              </div>

              {/* STATUS */}

              <div>

                <label>
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >

                  <option value="Em andamento">
                    Em andamento
                  </option>

                  <option value="Concluído">
                    Concluído
                  </option>

                  <option value="Pausado">
                    Pausado
                  </option>

                </select>

              </div>

              {/* BOTÃO */}

              <button
                type="submit"
                className="theme-button"
              >

                {editandoId !== null
                  ? 'Salvar alterações'
                  : 'Salvar projeto'}

              </button>

            </div>

          </form>

        </div>

      )}

      {/* LISTA */}

      <div
        style={{
          display: 'grid',
          gap: '16px',
          marginTop: '24px'
        }}
      >

        {projetos.length === 0 ? (

          <div className="panel">

            <p>
              Nenhum projeto cadastrado.
            </p>

          </div>

        ) : (

          projetos.map((projeto) => (

            <div
              className="panel"
              key={projeto.id}
            >

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '20px',
                  alignItems: 'flex-start'
                }}
              >

                <div>

                  <h2>
                    {projeto.nome}
                  </h2>

                  <p>
                    👤 Cliente:{' '}
                    {projeto.cliente ||
                      'Não informado'}
                  </p>

                  <p>
                    {projeto.descricao ||
                      'Sem descrição'}
                  </p>

                  <p>

                    💰{' '}
                    {Number(
                      projeto.valor || 0
                    ).toLocaleString(
                      'pt-BR',
                      {
                        style: 'currency',
                        currency: 'BRL'
                      }
                    )}

                  </p>

                  <strong>

                    {projeto.status}

                  </strong>

                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}
                >

                  <button
                    className="theme-button"
                    onClick={() =>
                      editarProjeto(
                        projeto
                      )
                    }
                  >
                    ✏️ Editar
                  </button>

                  <button
                    className="theme-button"
                    onClick={() =>
                      excluirProjeto(
                        projeto.id
                      )
                    }
                  >
                    🗑️ Excluir
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  )

}

export default Projetos
