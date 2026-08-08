import styles from './DataSourceBadge.module.css'

export function DataSourceBadge({ isMock }: { isMock: boolean }) {
  return (
    <span className={`${styles.badge} ${isMock ? styles.mock : styles.live}`}>
      <span className={styles.dot} aria-hidden="true" />
      {isMock ? 'DEMO DATA' : 'LIVE · RARAS.ORG'}
    </span>
  )
}
