import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { ChartDatum } from '@/types/domain'

interface BarChartPanelProps {
  data: ChartDatum[]
  color?: string
  height?: number
}

export function BarChartPanel({ data, color = '#1e5bb8', height = 220 }: BarChartPanelProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#d8cfc1" vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#6b7688' }} axisLine={{ stroke: '#d8cfc1' }} tickLine={false} interval={0} angle={-12} textAnchor="end" height={42} />
        <YAxis tick={{ fontSize: 10, fill: '#6b7688' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #d8cfc1', borderRadius: 6, fontFamily: 'Inter, sans-serif' }} cursor={{ fill: 'rgba(20,36,58,0.05)' }} />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} maxBarSize={38} />
      </BarChart>
    </ResponsiveContainer>
  )
}
