import type { ReactNode } from 'react'
import styles from './FactCard.module.css'

interface FactCardProps {
  label: string
  title?: string
  children: ReactNode
  source: string
  footer?: ReactNode
}

/** Small editorial fact card: label, optional title, a value/body area, and a source line — the "O que sabemos" mural unit. */
export function FactCard({ label, title, children, source, footer }: FactCardProps) {
  return (
    <article className={styles.card}>
      <p className="eyebrow">{label}</p>
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles.body}>{children}</div>
      <div className={styles.footer}>
        <span className={styles.source}>Fonte: {source}</span>
        {footer}
      </div>
    </article>
  )
}
