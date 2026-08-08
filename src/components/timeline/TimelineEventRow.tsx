import type { JourneyEvent } from '@/types/domain'
import { Tag } from '@/components/ui/Tag'
import { ProvenanceRow } from '@/components/provenance/ProvenanceRow'
import { CATEGORY_LABEL, CATEGORY_TONE, EVENT_TYPE_LABEL } from './timelineMeta'
import styles from './TimelineEventRow.module.css'

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function TimelineEventRow({ event, isLast }: { event: JourneyEvent; isLast: boolean }) {
  return (
    <div className={styles.row}>
      <div className={styles.rail}>
        <span className={styles.date}>{formatDate(event.date)}</span>
        <span className={styles.dot} />
        {!isLast && <span className={styles.line} />}
      </div>
      <div className={styles.content}>
        <div className={styles.head}>
          <Tag tone={CATEGORY_TONE[event.category]} size="sm">
            {EVENT_TYPE_LABEL[event.type]}
          </Tag>
          <span className={styles.categoryLabel}>{CATEGORY_LABEL[event.category]}</span>
        </div>
        <h4 className={styles.title}>{event.title}</h4>
        <p className={styles.description}>{event.description}</p>
        <ProvenanceRow provenance={event.provenance} compact />
      </div>
    </div>
  )
}
