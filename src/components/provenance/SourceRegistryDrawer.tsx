import { useQuery } from '@tanstack/react-query'
import { getSourceRegistry } from '@/services/sourceRegistry'
import { useCaseUI } from '@/context/CaseUIContext'
import { Tag } from '@/components/ui/Tag'
import styles from './SourceRegistryDrawer.module.css'

const RELIABILITY_TONE = { alta: 'green', media: 'amber', variavel: 'terracotta' } as const

export function SourceRegistryDrawer() {
  const { sourcesOpen, closeSources } = useCaseUI()
  const { data: sources } = useQuery({ queryKey: ['source-registry'], queryFn: getSourceRegistry })

  if (!sourcesOpen) return null

  return (
    <div className={styles.overlay} onClick={closeSources}>
      <aside className={styles.drawer} onClick={(e) => e.stopPropagation()} aria-label="Registro de fontes">
        <div className={styles.header}>
          <div>
            <p className="eyebrow">Proveniência</p>
            <h3 className={styles.title}>Fontes de dados do dossiê</h3>
          </div>
          <button className={styles.close} onClick={closeSources} aria-label="Fechar">
            ✕
          </button>
        </div>
        <p className={styles.intro}>
          Cada evidência exibida neste caso está vinculada a uma destas fontes. A confiabilidade indica o
          quanto um dado pode ser tratado como verificado sem revisão adicional.
        </p>
        <div className={styles.list}>
          {(sources ?? []).map((s) => (
            <div key={s.name} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.name}>{s.name}</span>
                <Tag tone={RELIABILITY_TONE[s.reliability]} size="sm">
                  {s.kind} · confiabilidade {s.reliability}
                </Tag>
              </div>
              <p className={styles.desc}>{s.description}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
