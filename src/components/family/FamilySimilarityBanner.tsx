import type { FamilySimilarity } from '@/types/domain'
import { Button } from '@/components/ui/Button'
import styles from './FamilySimilarityBanner.module.css'

export function FamilySimilarityBanner({ similarity }: { similarity: FamilySimilarity }) {
  return (
    <div className={styles.banner}>
      <div className={styles.iconCol} aria-hidden="true">
        ◈
      </div>
      <div className={styles.body}>
        <p className={styles.message}>{similarity.message}</p>
        <p className={styles.members}>{similarity.members.join(' · ')}</p>
        <div className={styles.signals}>
          {similarity.sharedSignals.map((s) => (
            <span key={s} className={styles.signal}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <Button variant="secondary" size="sm">
        Revisar conexão
      </Button>
    </div>
  )
}
