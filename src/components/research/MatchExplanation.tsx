import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import styles from './MatchExplanation.module.css'

interface HpoRef {
  hpoId: string
  label: string
}

interface MatchExplanationProps {
  matched: HpoRef[]
  notObserved: HpoRef[]
  uncertain: HpoRef[]
  source: string
  evidence?: React.ReactNode
}

export function MatchExplanation({ matched, notObserved, uncertain, source, evidence }: MatchExplanationProps) {
  const [showEvidence, setShowEvidence] = useState(false)
  const total = matched.length + notObserved.length + uncertain.length

  return (
    <div className={styles.wrap}>
      <p className={styles.headline}>
        {matched.length} / {total} fenótipos observados presentes
      </p>

      {matched.length > 0 && (
        <div className={styles.group}>
          <p className={styles.groupLabel}>Correspondências</p>
          <ul className={styles.list}>
            {matched.map((h) => (
              <li key={h.hpoId} className={styles.present}>
                <span className={styles.glyph}>✓</span> {h.label} <span className="mono">{h.hpoId}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {notObserved.length > 0 && (
        <div className={styles.group}>
          <p className={styles.groupLabel}>Não observados</p>
          <ul className={styles.list}>
            {notObserved.map((h) => (
              <li key={h.hpoId} className={styles.absent}>
                <span className={styles.glyph}>○</span> {h.label} <span className="mono">{h.hpoId}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {uncertain.length > 0 && (
        <div className={styles.group}>
          <p className={styles.groupLabel}>Informação ausente</p>
          <ul className={styles.list}>
            {uncertain.map((h) => (
              <li key={h.hpoId} className={styles.unknown}>
                <span className={styles.glyph}>?</span> {h.label} <span className="mono">{h.hpoId}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.source}>Fonte: {source}</span>
        {evidence && (
          <Button variant="ghost" size="sm" onClick={() => setShowEvidence((v) => !v)}>
            {showEvidence ? 'Fechar evidência' : 'Abrir evidência'}
          </Button>
        )}
      </div>
      {showEvidence && evidence && <div className={styles.evidenceBox}>{evidence}</div>}
    </div>
  )
}
