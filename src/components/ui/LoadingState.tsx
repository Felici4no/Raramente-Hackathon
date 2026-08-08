import styles from './LoadingState.module.css'

export function LoadingState({ label = 'Carregando dados do dossiê…' }: { label?: string }) {
  return (
    <div className={styles.wrap} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  )
}
