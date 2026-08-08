import { useMemo, useState } from 'react'
import { usePublicGraph } from '@/hooks/useRarasData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/ui/LoadingState'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import type { ExportRow } from '@/utils/exportCsv'
import type { RarasGraphPublicNode } from '@/services/raras/rarasRealService'
import styles from './DataExplorer.module.css'

const PAGE_SIZE = 25
const TYPE_LABEL: Record<string, string> = { disease: 'Doença', phenotype: 'Fenótipo', gene: 'Gene', drug: 'Fármaco' }

type SortKey = 'label' | 'type' | 'connections'

export function DataExplorer() {
  const graph = usePublicGraph()
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('connections')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(0)
  const [columns, setColumns] = useState({ type: true, connections: true, extra: true })

  const types = useMemo(() => {
    const set = new Set((graph.data?.data ?? []).map((n) => n.type))
    return Array.from(set)
  }, [graph.data])

  const filtered = useMemo(() => {
    let rows = graph.data?.data ?? []
    if (typeFilter) rows = rows.filter((r) => r.type === typeFilter)
    if (query.trim()) {
      const q = query.toLowerCase()
      rows = rows.filter((r) => r.label.toLowerCase().includes(q) || r.id.toLowerCase().includes(q))
    }
    const sorted = [...rows].sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      if (sortKey === 'connections') return (a.connections - b.connections) * dir
      return a[sortKey].localeCompare(b[sortKey]) * dir
    })
    return sorted
  }, [graph.data, typeFilter, query, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
    setPage(0)
  }

  const exportRows: ExportRow[] = filtered.map((n: RarasGraphPublicNode) => ({
    entity_id: n.id,
    entity_type: n.type,
    label: n.label,
    value: n.connections,
    source: 'Raras Public Graph',
    source_id: n.id,
    verification_status: graph.data?.isMock ? 'demo' : 'verificado',
    retrieved_at: graph.data?.retrievedAt ?? new Date().toISOString(),
  }))

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Research terminal"
        title="Data Explorer"
        subtitle="Amostra do subgrafo público Raras — doenças, fenótipos, genes e fármacos, com filtros, ordenação e paginação."
        actions={<ExportCsvButton filename="data-explorer.csv" rows={exportRows} />}
      />

      {graph.isLoading ? (
        <LoadingState label="Carregando subgrafo público…" />
      ) : (
        <>
          <div className={styles.toolbar}>
            <div className={styles.filters}>
              <button className={`${styles.filterBtn} ${typeFilter === null ? styles.active : ''}`} onClick={() => setTypeFilter(null)}>
                Todos ({graph.data?.data.length ?? 0})
              </button>
              {types.map((t) => (
                <button key={t} className={`${styles.filterBtn} ${typeFilter === t ? styles.active : ''}`} onClick={() => setTypeFilter(t)}>
                  {TYPE_LABEL[t] ?? t} ({graph.data?.data.filter((n) => n.type === t).length ?? 0})
                </button>
              ))}
            </div>
            <div className={styles.rightTools}>
              {graph.data && <DataSourceBadge isMock={graph.data.isMock} />}
              <input
                className={styles.search}
                placeholder="Pesquisar…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPage(0)
                }}
              />
            </div>
          </div>

          <div className={styles.columnToggle}>
            {(['type', 'connections', 'extra'] as const).map((c) => (
              <label key={c} className={styles.colLabel}>
                <input type="checkbox" checked={columns[c]} onChange={(e) => setColumns((prev) => ({ ...prev, [c]: e.target.checked }))} />
                {c === 'type' ? 'Tipo' : c === 'connections' ? 'Conexões' : 'Detalhe'}
              </label>
            ))}
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.sortable} onClick={() => toggleSort('label')}>
                    Label {sortKey === 'label' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>ID</th>
                  {columns.type && (
                    <th className={styles.sortable} onClick={() => toggleSort('type')}>
                      Tipo {sortKey === 'type' && (sortDir === 'asc' ? '↑' : '↓')}
                    </th>
                  )}
                  {columns.connections && (
                    <th className={styles.sortable} onClick={() => toggleSort('connections')}>
                      Conexões {sortKey === 'connections' && (sortDir === 'asc' ? '↑' : '↓')}
                    </th>
                  )}
                  {columns.extra && <th>Detalhe</th>}
                </tr>
              </thead>
              <tbody>
                {pageRows.map((n) => (
                  <tr key={n.id}>
                    <td>{n.label}</td>
                    <td className="mono">{n.id}</td>
                    {columns.type && <td>{TYPE_LABEL[n.type] ?? n.type}</td>}
                    {columns.connections && <td className="mono">{n.connections}</td>}
                    {columns.extra && <td className={styles.extraCell}>{n.extra || '—'}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination}>
            <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
              ← Anterior
            </button>
            <span>
              Página {page + 1} de {totalPages} · {filtered.length} registros
            </span>
            <button disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
              Próxima →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
