import type { ReactNode } from 'react'
import styles from './ExplainDisclosure.module.css'

interface ExplainDisclosureProps {
  summary: string
  children: ReactNode
}

export function ExplainDisclosure({ summary, children }: ExplainDisclosureProps) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>{summary}</summary>
      <div className={styles.body}>{children}</div>
    </details>
  )
}
