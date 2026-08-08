import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { ChartDatum } from '@/types/domain'

interface LineChartPanelProps {
  data: ChartDatum[]
  dataKey?: string
  color?: string
  height?: number
}

export function LineChartPanel({ data, dataKey = 'value', color = '#c75b39', height = 220 }: LineChartPanelProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 12, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#d8cfc1" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#6b7688' }} axisLine={{ stroke: '#d8cfc1' }} tickLine={false} />
        <YAxis tick={{ fontSize: 10, fill: '#6b7688' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #d8cfc1', borderRadius: 6, fontFamily: 'Inter, sans-serif' }} />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.2} dot={{ r: 3.5, fill: color }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
