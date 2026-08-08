import styles from './MetricStat.module.css'

interface MetricStatProps {
  label: string
  value: string
  sublabel?: string
  tone?: 'neutral' | 'amber' | 'terracotta' | 'green'
}

export function MetricStat({ label, value, sublabel, tone = 'neutral' }: MetricStatProps) {
  return (
    <div className={styles.stat}>
      <p className={`eyebrow ${styles.label}`}>{label}</p>
      <p className={`${styles.value} ${styles[tone]} mono`}>{value}</p>
      {sublabel && <p className={styles.sublabel}>{sublabel}</p>}
    </div>
  )
}
