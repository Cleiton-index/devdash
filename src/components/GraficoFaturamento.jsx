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
  return `R$ ${valor.toLocaleString('pt-BR')}`
}

function TooltipPersonalizado({ active, payload, label }) {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="tooltip">
      <strong>{label}</strong>
      <p>{formatarValor(payload[0].value)}</p>
    </div>
  )
}

function GraficoFaturamento({ dados, periodo, setPeriodo }) {

  let dadosFiltrados = dados

  if (periodo === '3') {
    dadosFiltrados = dados.slice(-3)
  }

  if (periodo === '6') {
    dadosFiltrados = dados.slice(-6)
  }

  return (
    <div className="grafico">

      <div className="grafico-header">

        <div>
          <h2>Faturamento</h2>
          <p>Desempenho dos últimos meses</p>
        </div>

        <div className="grafico-controles">

          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
          >
            <option value="3">3 meses</option>
            <option value="6">6 meses</option>
            <option value="12">Ano</option>
          </select>

        </div>

      </div>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={dadosFiltrados}>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="mes"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(valor) => `R$ ${valor / 1000}k`}
          />

          <Tooltip
            content={<TooltipPersonalizado />}
          />

          <Line
            type="monotone"
            dataKey="valor"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}

export default GraficoFaturamento
