import type { EvidenceCardData } from '@/types/domain'
import { Tag } from '@/components/ui/Tag'
import { StatusPill } from '@/components/ui/StatusPill'
import { ProvenanceRow } from '@/components/provenance/ProvenanceRow'
import { CATEGORY_LABEL, CATEGORY_TONE } from './evidenceMeta'
import styles from './EvidenceCard.module.css'

export function EvidenceCard({ evidence }: { evidence: EvidenceCardData }) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <Tag tone={CATEGORY_TONE[evidence.category]}>{CATEGORY_LABEL[evidence.category]}</Tag>
        <StatusPill status={evidence.status} />
      </div>

      <h3 className={styles.title}>{evidence.title}</h3>

      <div className={styles.field}>
        <p className="eyebrow">Valor atual</p>
        <p className={styles.value}>{evidence.currentValue}</p>
      </div>

      <div className={styles.field}>
        <p className="eyebrow">Interpretação</p>
        <p className={styles.text}>{evidence.interpretation}</p>
      </div>

      {evidence.threshold && (
        <div className={styles.field}>
          <p className="eyebrow">Threshold</p>
          <p className={`${styles.text} mono`}>{evidence.threshold}</p>
        </div>
      )}

      {evidence.impact && (
        <div className={styles.field}>
          <p className="eyebrow">Impacto na investigação</p>
          <p className={styles.text}>{evidence.impact}</p>
        </div>
      )}

      {evidence.falsifier && (
        <div className={styles.falsifier}>
          <p className={styles.falsifierLabel}>O que enfraqueceria esta pista</p>
          <p className={styles.text}>{evidence.falsifier}</p>
        </div>
      )}

      <div className={styles.footer}>
        <ProvenanceRow provenance={evidence.provenance} compact />
      </div>
    </article>
  )
}
