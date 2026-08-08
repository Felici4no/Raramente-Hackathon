import styles from './WikipediaSourceBadge.module.css'

export function WikipediaSourceBadge() {
  return (
    <span className={styles.badge}>
      <span className={styles.dot} aria-hidden="true" />
      CONTEXTUAL SOURCE · WIKIPEDIA
    </span>
  )
}
