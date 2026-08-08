import type { Provenance } from '@/types/domain'
import { StatusPill } from '@/components/ui/StatusPill'
import styles from './ProvenanceRow.module.css'

function formatDate(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

interface ProvenanceRowProps {
  provenance: Provenance
  compact?: boolean
}

export function ProvenanceRow({ provenance, compact = false }: ProvenanceRowProps) {
  return (
    <div className={`${styles.row} ${compact ? styles.compact : ''}`}>
      <span className={styles.source}>{provenance.source}</span>
      <span className={styles.dotSep}>·</span>
      <span className={`${styles.date} mono`}>{formatDate(provenance.date)}</span>
      <StatusPill status={provenance.status} />
    </div>
  )
}
