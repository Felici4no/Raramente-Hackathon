import type { RarasPhenotypeRef } from '@/types/raras'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import styles from './RarasPhenotypeList.module.css'

interface RarasPhenotypeListProps {
  phenotypes: RarasPhenotypeRef[]
  isMock: boolean
}

/** "Fenótipos estruturados" — RARAS/HPO side of the Signs & Phenotypes split, kept apart from Wikipedia's free text. */
export function RarasPhenotypeList({ phenotypes, isMock }: RarasPhenotypeListProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <p className={styles.label}>Fenótipos estruturados</p>
        <DataSourceBadge isMock={isMock} />
      </div>
      {phenotypes.length === 0 ? (
        <p className={styles.empty}>Nenhum fenótipo estruturado disponível para esta doença.</p>
      ) : (
        <ul className={styles.list}>
          {phenotypes.map((p) => (
            <li key={p.hpoId} className={styles.item}>
              <span className={styles.hpoId}>{p.hpoId}</span>
              <span className={styles.itemLabel}>{p.label}</span>
              {p.frequency && <span className={styles.frequency}>{p.frequency}</span>}
            </li>
          ))}
        </ul>
      )}
      <p className={styles.source}>Fonte: Raras Knowledge Graph / HPO — proveniência estruturada, verificável por identificador.</p>
    </div>
  )
}
