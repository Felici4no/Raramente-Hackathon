import type { ExplainabilityData, ExplainabilityFactor } from '@/types/domain'
import { Tag } from '@/components/ui/Tag'
import styles from './WhyThisMatters.module.css'

const WEIGHT_TONE: Record<ExplainabilityFactor['weight'], 'terracotta' | 'amber' | 'neutral'> = {
  alto: 'terracotta',
  medio: 'amber',
  baixo: 'neutral',
}

const WEIGHT_LABEL: Record<ExplainabilityFactor['weight'], string> = {
  alto: 'Peso alto',
  medio: 'Peso médio',
  baixo: 'Peso baixo',
}

export function WhyThisMatters({ explainability }: { explainability: ExplainabilityData }) {
  return (
    <div className={styles.wrap}>
      <p className={styles.headline}>{explainability.headline}</p>

      <div className={styles.section}>
        <p className="eyebrow">Fatores que contribuíram</p>
        <ul className={styles.factorList}>
          {explainability.contributingFactors.map((f) => (
            <li key={f.id} className={styles.factorItem}>
              <Tag tone={WEIGHT_TONE[f.weight]} size="sm">
                {WEIGHT_LABEL[f.weight]}
              </Tag>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.split}>
        <div className={styles.column}>
          <p className={`eyebrow ${styles.reported}`}>Apenas relatado (não verificado)</p>
          <ul className={styles.plainList}>
            {explainability.reportedOnly.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <p className={`eyebrow ${styles.verified}`}>Verificado</p>
          <ul className={styles.plainList}>
            {explainability.verified.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <p className="eyebrow">Conexões que reforçam a hipótese investigativa</p>
        <ul className={styles.plainList}>
          {explainability.reinforcingConnections.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className={styles.missing}>
        <p className={styles.missingLabel}>Dados que ainda faltam</p>
        <ul className={styles.plainList}>
          {explainability.missingData.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
