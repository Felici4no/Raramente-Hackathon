import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  note?: string
  actions?: ReactNode
}

export function SectionHeading({ eyebrow, title, subtitle, note, actions }: SectionHeadingProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.text}>
        {eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {note && <p className={styles.note}>{note}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  )
}
