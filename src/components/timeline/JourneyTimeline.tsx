import { useState } from 'react'
import type { JourneyEvent, TimelineCategory } from '@/types/domain'
import { CATEGORY_LABEL } from './timelineMeta'
import { TimelineEventRow } from './TimelineEventRow'
import styles from './JourneyTimeline.module.css'

const FILTERS: { value: TimelineCategory | null; label: string }[] = [
  { value: null, label: 'Todos' },
  { value: 'assistencial', label: CATEGORY_LABEL.assistencial },
  { value: 'familiar', label: CATEGORY_LABEL.familiar },
  { value: 'fenotipico', label: CATEGORY_LABEL.fenotipico },
  { value: 'protocolo', label: CATEGORY_LABEL.protocolo },
  { value: 'revisao', label: CATEGORY_LABEL.revisao },
]

export function JourneyTimeline({ events }: { events: JourneyEvent[] }) {
  const [filter, setFilter] = useState<TimelineCategory | null>(null)
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))
  const visible = filter ? sorted.filter((e) => e.category === filter) : sorted

  return (
    <div>
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.label}
            className={`${styles.filterBtn} ${filter === f.value ? styles.active : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className={styles.list}>
        {visible.map((event, i) => (
          <TimelineEventRow key={event.id} event={event} isLast={i === visible.length - 1} />
        ))}
      </div>
    </div>
  )
}
