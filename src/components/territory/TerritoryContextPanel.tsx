import type { TerritoryContextData } from '@/types/domain'
import styles from './TerritoryContextPanel.module.css'

export function TerritoryContextPanel({ territory }: { territory: TerritoryContextData }) {
  const max = Math.max(territory.caseEntanglement, territory.regionAverageEntanglement, 100)

  return (
    <div className={styles.wrap}>
      <div className={styles.identity}>
        <p className={styles.ubs}>{territory.ubs}</p>
        <p className={styles.microarea}>{territory.microarea} · {territory.listeningOrigin}</p>
      </div>

      <div className={styles.compare}>
        <p className="eyebrow">Índice de enredamento — caso vs. média da microárea</p>
        <div className={styles.bars}>
          <div className={styles.barRow}>
            <span className={styles.barLabel}>Este caso</span>
            <div className={styles.barTrack}>
              <div className={`${styles.barFill} ${styles.case}`} style={{ width: `${(territory.caseEntanglement / max) * 100}%` }} />
            </div>
            <span className={`${styles.barValue} mono`}>{territory.caseEntanglement}</span>
          </div>
          <div className={styles.barRow}>
            <span className={styles.barLabel}>Média microárea</span>
            <div className={styles.barTrack}>
              <div className={`${styles.barFill} ${styles.avg}`} style={{ width: `${(territory.regionAverageEntanglement / max) * 100}%` }} />
            </div>
            <span className={`${styles.barValue} mono`}>{territory.regionAverageEntanglement}</span>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.metric}>
          <span className={`${styles.metricValue} mono`}>{territory.journeysInRegion.toLocaleString('pt-BR')}</span>
          <span className={styles.metricLabel}>Jornadas na região</span>
        </div>
        <div className={styles.metric}>
          <span className={`${styles.metricValue} mono`}>{territory.openMissions}</span>
          <span className={styles.metricLabel}>Missões abertas</span>
        </div>
      </div>

      <div className={styles.section}>
        <p className="eyebrow">Padrões assistenciais recorrentes</p>
        <ul className={styles.list}>
          {territory.recurrentPatterns.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <p className="eyebrow">Ações recentes no território</p>
        <ul className={styles.actionList}>
          {territory.recentActions.map((a) => (
            <li key={a.label}>
              <span>{a.label}</span>
              <span className={`${styles.actionDate} mono`}>{new Date(a.date).toLocaleDateString('pt-BR')}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
