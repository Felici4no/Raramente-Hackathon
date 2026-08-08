import { Link } from 'react-router-dom'
import { useEntityDrawer } from '@/context/EntityDrawerContext'
import { ENTITY_TYPE_GLYPH, ENTITY_TYPE_LABEL } from './entityMeta'
import styles from './EntityDrawer.module.css'

/**
 * Fallback for entity types without a dedicated page yet (reference
 * centers, protocols, people, services, sources, trials) — so clicking
 * never dead-ends, even where RARAS/case data isn't rich enough for a
 * standalone page.
 */
export function EntityDrawer() {
  const { entity, closeEntity } = useEntityDrawer()
  if (!entity) return null

  return (
    <div className={styles.overlay} onClick={closeEntity}>
      <aside className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.glyph} aria-hidden="true">
            {ENTITY_TYPE_GLYPH[entity.type]}
          </span>
          <div>
            <p className="eyebrow">{ENTITY_TYPE_LABEL[entity.type]}</p>
            <h3 className={styles.title}>{entity.label}</h3>
          </div>
          <button className={styles.close} onClick={closeEntity} aria-label="Fechar">
            ✕
          </button>
        </div>

        {entity.sublabel && <p className={styles.sublabel}>{entity.sublabel}</p>}

        {entity.identifiers && Object.values(entity.identifiers).some(Boolean) && (
          <dl className={styles.fields}>
            {Object.entries(entity.identifiers)
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className={styles.field}>
                  <dt>{k.toUpperCase()}</dt>
                  <dd className="mono">{v}</dd>
                </div>
              ))}
          </dl>
        )}

        {entity.source && <p className={styles.source}>Fonte: {entity.source}</p>}

        <p className={styles.note}>
          Esta entidade ainda não tem uma página própria no Core — os dados disponíveis nesta fonte não são
          suficientes para um perfil dedicado.
        </p>

        {entity.type === 'PROTOCOL' && (
          <Link className={styles.linkOut} to="/case/9104/report" onClick={closeEntity}>
            Abrir relatório do caso →
          </Link>
        )}
      </aside>
    </div>
  )
}
