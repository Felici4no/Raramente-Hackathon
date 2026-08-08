import { NODE_TYPE_META } from './nodeTypeMeta'
import styles from './GraphLegend.module.css'

export function GraphLegend() {
  return (
    <div className={styles.legend}>
      <p className="eyebrow">Legenda de nós</p>
      <div className={styles.items}>
        {Object.entries(NODE_TYPE_META).map(([type, meta]) => (
          <div key={type} className={styles.item}>
            <span className={styles.swatch} style={{ background: meta.color }} />
            {meta.label}
          </div>
        ))}
      </div>
    </div>
  )
}
