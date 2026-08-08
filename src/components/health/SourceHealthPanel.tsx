import { useSourceHealth } from '@/hooks/useSourceHealth'
import type { SourceStatus } from '@/types/raras'
import styles from './SourceHealthPanel.module.css'

const STATUS_LABEL: Record<SourceStatus, string> = {
  online: 'ONLINE',
  offline: 'OFFLINE',
  mock: 'MOCK',
  checking: 'VERIFICANDO',
}

function StatusDot({ status }: { status: SourceStatus }) {
  return <span className={`${styles.dot} ${styles[status]}`} aria-hidden="true" />
}

export function SourceHealthPanel({ compact = false }: { compact?: boolean }) {
  const { data: sources, isLoading, dataUpdatedAt } = useSourceHealth()

  return (
    <div className={styles.panel}>
      {!compact && (
        <div className={styles.header}>
          <p className="eyebrow">Data Sources</p>
          {dataUpdatedAt > 0 && (
            <span className={styles.updated}>
              verificado {new Date(dataUpdatedAt).toLocaleTimeString('pt-BR')}
            </span>
          )}
        </div>
      )}
      <ul className={styles.list}>
        {isLoading && !sources
          ? ['Raras GraphQL', 'Raras SPARQL', 'Raras MCP', 'QuaTiRare Journey'].map((name) => (
              <li key={name} className={styles.row}>
                <span className={styles.name}>{name}</span>
                <span className={`${styles.status} ${styles.checking}`}>
                  <StatusDot status="checking" />
                  {STATUS_LABEL.checking}
                </span>
              </li>
            ))
          : sources?.map((s) => (
              <li key={s.name} className={styles.row}>
                <span className={styles.name}>{s.name}</span>
                <span className={styles.status} title={s.detail}>
                  <StatusDot status={s.status} />
                  {STATUS_LABEL[s.status]}
                </span>
              </li>
            ))}
      </ul>
    </div>
  )
}
