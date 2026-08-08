import type { VerificationStatus } from '@/types/domain'
import styles from './StatusPill.module.css'

const LABEL: Record<VerificationStatus, string> = {
  verificado: 'Verificado',
  pendente: 'Pendente',
  relato: 'Relato',
}

export function StatusPill({ status }: { status: VerificationStatus }) {
  return (
    <span className={`${styles.pill} ${styles[status]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {LABEL[status]}
    </span>
  )
}
