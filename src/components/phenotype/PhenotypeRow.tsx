import type { PhenotypeNormalization } from '@/types/domain'
import { StatusPill } from '@/components/ui/StatusPill'
import { ProvenanceRow } from '@/components/provenance/ProvenanceRow'
import styles from './PhenotypeRow.module.css'

export function PhenotypeRow({ phenotype }: { phenotype: PhenotypeNormalization }) {
  const scorePct = Math.round(phenotype.matchScore * 100)

  return (
    <article className={styles.row}>
      <div className={styles.original}>
        <p className="eyebrow">Relato original</p>
        <p className={styles.quote}>“{phenotype.originalReport}”</p>
      </div>

      <div className={styles.arrow} aria-hidden="true">
        →
      </div>

      <div className={styles.normalized}>
        <div className={styles.normalizedHead}>
          <p className="eyebrow">Normalização HPO</p>
          <StatusPill status={phenotype.provenance.status} />
        </div>
        <p className={styles.term}>{phenotype.normalizedTerm}</p>
        <span className={`${styles.hpoId} mono`}>{phenotype.hpoId}</span>

        <div className={styles.scoreRow}>
          <span className={styles.scoreLabel}>Score de correspondência</span>
          <div className={styles.scoreBar}>
            <div className={styles.scoreFill} style={{ width: `${scorePct}%` }} />
          </div>
          <span className={`${styles.scoreValue} mono`}>{scorePct}%</span>
        </div>

        {phenotype.synonyms.length > 0 && (
          <div className={styles.synonyms}>
            {phenotype.synonyms.map((s) => (
              <span key={s} className={styles.synonym}>
                {s}
              </span>
            ))}
          </div>
        )}

        <p className={styles.related}>{phenotype.relatedDiseasesCount} associações doença–fenótipo compatíveis com investigação</p>

        <ProvenanceRow provenance={phenotype.provenance} compact />
      </div>
    </article>
  )
}
