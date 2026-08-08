import { CHOROPLETH_LEVELS, CHOROPLETH_NO_DATA } from '@/utils/choroplethScale'
import styles from './MapLegend.module.css'

export function MapLegend({ minLabel = 'MENOR', maxLabel = 'MAIOR' }: { minLabel?: string; maxLabel?: string }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.edgeLabel}>{minLabel}</span>
      <span className={styles.swatch} style={{ background: CHOROPLETH_NO_DATA }} title="Sem dado" />
      {CHOROPLETH_LEVELS.map((c) => (
        <span key={c} className={styles.swatch} style={{ background: c }} />
      ))}
      <span className={styles.edgeLabel}>{maxLabel}</span>
    </div>
  )
}
