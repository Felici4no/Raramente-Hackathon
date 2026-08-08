import type { ReactNode } from 'react'
import { useCaseUI } from '@/context/CaseUIContext'
import styles from './ChartFrame.module.css'

interface ChartFrameProps {
  title: string
  subtitle?: string
  note?: string
  children: ReactNode
}

export function ChartFrame({ title, subtitle, note, children }: ChartFrameProps) {
  const { openSources } = useCaseUI()
  return (
    <div className={styles.frame}>
      <div className={styles.head}>
        <div>
          <p className={styles.title}>{title}</p>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <button className={styles.drill} onClick={openSources}>
          Ver fonte
        </button>
      </div>
      <div className={styles.chartArea}>{children}</div>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  )
}
