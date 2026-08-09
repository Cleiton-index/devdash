import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

function formatarValor(valor) {
  return `R$ ${Number(valor || 0).toLocaleString('pt-BR')}`
}

function TooltipPersonalizado({ active, payload, label }) {

  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="tooltip">
      <strong>{label}</strong>

      <p>
        {formatarValor(payload[0].value)}
      </p>
    </div>
  )
}

function GraficoFaturamento({
  dados,
  periodo,
  setPeriodo
}) {

  let dadosFiltrados = dados

  if (periodo === '3') {
    dadosFiltrados = dados.slice(-3)
  }

  if (periodo === '6') {
    dadosFiltrados = dados.slice(-6)
  }

  return (
    <section className="grafico">

      <div className="grafico-header">

        <div>

          <h2>
            Faturamento por projeto
          </h2>

          <p>
            Distribuição dos valores cadastrados
          </p>

        </div>

        <div className="grafico-controles">

          <select
            value={periodo}
            onChange={(e) =>
              setPeriodo(e.target.value)
            }
            aria-label="Período do gráfico"
          >
            <option value="3">
              3 projetos
            </option>

            <option value="6">
              6 projetos
            </option>

            <option value="12">
              Todos
            </option>
          </select>

        </div>

      </div>

      {dadosFiltrados.length > 0 ? (

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart
            data={dadosFiltrados}
            margin={{
              top: 10,
              right: 10,
              left: 5,
              bottom: 5
            }}
          >

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="rgba(148, 163, 184, .18)"
            />

            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11 }}
              tickFormatter={(valor) =>
                `R$ ${Number(valor) / 1000}k`
              }
            />

            <Tooltip
              cursor={{
                stroke: 'rgba(99,102,241,.15)',
                strokeWidth: 2
              }}
              content={
                <TooltipPersonalizado />
              }
            />

            <Line
              type="monotone"
              dataKey="valor"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: '#ffffff'
              }}
              activeDot={{
                r: 7,
                strokeWidth: 3
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      ) : (

        <div className="grafico-vazio">

          <div className="grafico-vazio-icon">
            📊
          </div>

          <strong>
            Nenhum faturamento disponível
          </strong>

          <p>
            Cadastre um projeto com valor
            para visualizar os dados.
          </p>

        </div>

      )}

    </section>
  )
}

export default GraficoFaturamento
