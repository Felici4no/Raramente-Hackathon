import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { ChartDatum } from '@/types/domain'

const COLORS = ['#c75b39', '#6b7688']

export function ComparisonBarPanel({ data, height = 200 }: { data: ChartDatum[]; height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#d8cfc1" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 10, fill: '#6b7688' }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="label" width={120} tick={{ fontSize: 11, fill: '#3c4d63' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #d8cfc1', borderRadius: 6, fontFamily: 'Inter, sans-serif' }} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={26}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
