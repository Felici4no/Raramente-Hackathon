import { useMemo, useState } from 'react'
import type { EvidenceCardData, EvidenceCategory } from '@/types/domain'
import { EvidenceCard } from '@/components/cards/EvidenceCard'
import { CATEGORY_LABEL } from '@/components/cards/evidenceMeta'
import styles from './EvidenceWallGrid.module.css'

export function EvidenceWallGrid({ evidence }: { evidence: EvidenceCardData[] }) {
  const [filter, setFilter] = useState<EvidenceCategory | null>(null)

  const categories = useMemo(() => {
    const set = new Set(evidence.map((e) => e.category))
    return Array.from(set)
  }, [evidence])

  const visible = filter ? evidence.filter((e) => e.category === filter) : evidence

  return (
    <div>
      <div className={styles.filters}>
        <button className={`${styles.filterBtn} ${filter === null ? styles.active : ''}`} onClick={() => setFilter(null)}>
          Todas ({evidence.length})
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={`${styles.filterBtn} ${filter === c ? styles.active : ''}`}
            onClick={() => setFilter(c)}
          >
            {CATEGORY_LABEL[c]} ({evidence.filter((e) => e.category === c).length})
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {visible.map((e) => (
          <EvidenceCard key={e.id} evidence={e} />
        ))}
      </div>
    </div>
  )
}
