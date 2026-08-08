import { useEffect, useState } from 'react'

function Clientes() {

  const clientesIniciais = [
    {
      id: 1,
      nome: 'Farmácia Silva',
      email: 'contato@farmaciasilva.com',
      telefone: '(67) 99999-0000'
    }
  ]

  const [clientes, setClientes] = useState(() => {

    const clientesSalvos =
      localStorage.getItem('devdash-clientes')

    return clientesSalvos
      ? JSON.parse(clientesSalvos)
      : clientesIniciais

  })

  const [mostrarFormulario, setMostrarFormulario] =
    useState(false)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')

  const [editandoId, setEditandoId] =
    useState(null)

  useEffect(() => {

    localStorage.setItem(
      'devdash-clientes',
      JSON.stringify(clientes)
    )

  }, [clientes])

  function limparFormulario() {

    setNome('')
    setEmail('')
    setTelefone('')
    setEditandoId(null)

  }

  function salvarCliente(e) {

    e.preventDefault()

    if (!nome.trim()) {
      return
    }

    if (editandoId !== null) {

      setClientes(

        clientes.map((cliente) =>
          cliente.id === editandoId
            ? {
                ...cliente,
                nome,
                email,
                telefone
              }
            : cliente
        )

      )

    } else {

      const novoCliente = {
        id: Date.now(),
        nome,
        email,
        telefone
      }

      setClientes([
        ...clientes,
        novoCliente
      ])

    }

    limparFormulario()
    setMostrarFormulario(false)

  }

  function editarCliente(cliente) {

    setNome(cliente.nome)
    setEmail(cliente.email)
    setTelefone(cliente.telefone)

    setEditandoId(cliente.id)
    setMostrarFormulario(true)

  }

  function excluirCliente(id) {

    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este cliente?'
    )

    if (!confirmar) {
      return
    }

    setClientes(
      clientes.filter(
        (cliente) => cliente.id !== id
      )
    )

  }

  return (

    <div className="pagina-projetos">

      <div className="pagina-header">

        <div>

          <h1>Clientes</h1>

          <p>
            Gerencie seus clientes
          </p>

        </div>

        <button
          className="novo-projeto"
          onClick={() => {

            if (mostrarFormulario) {
              limparFormulario()
            }

            setMostrarFormulario(
              !mostrarFormulario
            )

          }}
        >

          {mostrarFormulario
            ? '✕ Fechar'
            : '+ Novo cliente'}

        </button>

      </div>

      {mostrarFormulario && (

        <form
          className="formulario-projeto"
          onSubmit={salvarCliente}
        >

          <h2>

            {editandoId !== null
              ? 'Editar cliente'
              : 'Novo cliente'}

          </h2>

          <label>
            Nome
          </label>

          <input
            type="text"
            placeholder="Nome do cliente"
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
          />

          <label>
            E-mail
          </label>

          <input
            type="email"
            placeholder="cliente@email.com"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <label>
            Telefone
          </label>

          <input
            type="text"
            placeholder="(67) 99999-9999"
            value={telefone}
            onChange={(e) =>
              setTelefone(e.target.value)
            }
          />

          <button
            type="submit"
            className="salvar-projeto"
          >

            {editandoId !== null
              ? 'Salvar alterações'
              : 'Salvar cliente'}

          </button>

        </form>

      )}

      <div className="projetos-lista">

        {clientes.map((cliente) => (

          <div
            className="projeto-item"
            key={cliente.id}
          >

            <div>

              <h3>
                {cliente.nome}
              </h3>

              <p>
                📧 {cliente.email}
              </p>

              <p>
                📱 {cliente.telefone}
              </p>

            </div>

            <div className="projeto-acoes">

              <button
                className="editar-projeto"
                onClick={() =>
                  editarCliente(cliente)
                }
              >
                ✏️
              </button>

              <button
                className="excluir-projeto"
                onClick={() =>
                  excluirCliente(cliente.id)
                }
              >
                🗑️
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Clientes
