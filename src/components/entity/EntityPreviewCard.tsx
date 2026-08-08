import type { EntityRef } from '@/types/entities'
import { useDiseaseDetail } from '@/hooks/useRarasData'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { ENTITY_TYPE_GLYPH, ENTITY_TYPE_LABEL } from './entityMeta'
import styles from './EntityPreviewCard.module.css'

interface EntityPreviewCardProps {
  entity: EntityRef
  active: boolean
}

function DiseasePreviewBody({ orphaCode, active }: { orphaCode: string; active: boolean }) {
  const detail = useDiseaseDetail(active ? orphaCode : null)
  if (!detail.data) return <p className={styles.loading}>Carregando…</p>
  const d = detail.data.data
  return (
    <>
      <div className={styles.rows}>
        <div className={styles.row}>
          <span>ORPHA</span>
          <span className="mono">{d.orphaCode}</span>
        </div>
        {d.genes.length > 0 && (
          <div className={styles.row}>
            <span>Gene</span>
            <span>{d.genes.map((g) => g.symbol).join(', ')}</span>
          </div>
        )}
        <div className={styles.row}>
          <span>Fenótipos</span>
          <span>{d.phenotypes.length} estruturados</span>
        </div>
      </div>
      <DataSourceBadge isMock={detail.data.isMock} />
    </>
  )
}

export function EntityPreviewCard({ entity, active }: EntityPreviewCardProps) {
  const orphaCode = entity.identifiers?.orpha ?? (entity.type === 'DISEASE' ? entity.id.replace('ORPHA:', '') : null)

  return (
    <div className={styles.card} role="tooltip">
      <div className={styles.header}>
        <span className={styles.glyph} aria-hidden="true">
          {ENTITY_TYPE_GLYPH[entity.type]}
        </span>
        <span className="eyebrow">{ENTITY_TYPE_LABEL[entity.type]}</span>
      </div>
      <p className={styles.title}>{entity.label}</p>
      {entity.sublabel && <p className={styles.sublabel}>{entity.sublabel}</p>}

      {entity.type === 'DISEASE' && orphaCode ? (
        <DiseasePreviewBody orphaCode={orphaCode} active={active} />
      ) : (
        entity.identifiers && (
          <div className={styles.rows}>
            {Object.entries(entity.identifiers)
              .filter(([, v]) => v)
              .slice(0, 3)
              .map(([k, v]) => (
                <div key={k} className={styles.row}>
                  <span>{k.toUpperCase()}</span>
                  <span className="mono">{v}</span>
                </div>
              ))}
          </div>
        )
      )}

      <p className={styles.cta}>Abrir perfil →</p>
    </div>
  )
}
