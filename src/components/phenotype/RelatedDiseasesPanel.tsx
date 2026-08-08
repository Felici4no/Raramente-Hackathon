import type { RelatedDisease } from '@/types/domain'
import styles from './RelatedDiseasesPanel.module.css'

export function RelatedDiseasesPanel({ diseases }: { diseases: RelatedDisease[] }) {
  return (
    <div>
      <p className={styles.disclaimer}>
        Associações derivadas da Raras Knowledge Graph a partir dos fenótipos normalizados desta jornada.
        Isto <strong>não é um diagnóstico</strong> — é um ponto de partida para investigação clínica.
      </p>
      <div className={styles.list}>
        {diseases.map((d) => (
          <div key={d.id} className={styles.item}>
            <div className={styles.itemHead}>
              <span className={styles.name}>{d.name}</span>
              {d.orphaCode && <span className={`${styles.code} mono`}>{d.orphaCode}</span>}
            </div>
            <div className={styles.sharedBar}>
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className={`${styles.segment} ${i < d.sharedPhenotypes ? styles.filled : ''}`} />
              ))}
              <span className={styles.sharedLabel}>{d.sharedPhenotypes} fenótipo(s) compartilhado(s)</span>
            </div>
            <p className={styles.note}>{d.note}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
