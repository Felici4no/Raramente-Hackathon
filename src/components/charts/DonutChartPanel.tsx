import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { ChartDatum } from '@/types/domain'
import styles from './DonutChartPanel.module.css'

const DEFAULT_COLORS = ['#0b6b2b', '#d97706', '#6b7688', '#1e5bb8', '#c75b39']

export function DonutChartPanel({ data, colors = DEFAULT_COLORS, height = 200 }: { data: ChartDatum[]; colors?: string[]; height?: number }) {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className={styles.wrap}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="label" innerRadius="58%" outerRadius="85%" paddingAngle={2}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i % colors.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #d8cfc1', borderRadius: 6, fontFamily: 'Inter, sans-serif' }} />
        </PieChart>
      </ResponsiveContainer>
      <ul className={styles.legend}>
        {data.map((d, i) => (
          <li key={d.label}>
            <span className={styles.swatch} style={{ background: colors[i % colors.length] }} />
            <span className={styles.label}>{d.label}</span>
            <span className={`${styles.value} mono`}>
              {d.value} · {total ? Math.round((d.value / total) * 100) : 0}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
