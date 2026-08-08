import styles from './MapTooltip.module.css'

interface MapTooltipRow {
  label: string
  value: string
}

interface MapTooltipProps {
  x: number
  y: number
  title: string
  rows: MapTooltipRow[]
}

export function MapTooltip({ x, y, title, rows }: MapTooltipProps) {
  return (
    <div className={styles.tooltip} style={{ left: x + 14, top: y + 14 }}>
      <p className={styles.title}>{title}</p>
      <div className={styles.rule} />
      {rows.map((r) => (
        <div key={r.label} className={styles.row}>
          <span className={`${styles.value} mono`}>{r.value}</span>
          <span className={styles.label}>{r.label}</span>
        </div>
      ))}
    </div>
  )
}
