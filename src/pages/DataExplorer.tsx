import { useMemo, useState } from 'react'
import { usePublicGraph } from '@/hooks/useRarasData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/ui/LoadingState'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import { ChartFrame } from '@/components/charts/ChartFrame'
import { BarChartPanel } from '@/components/charts/BarChartPanel'
import { DonutChartPanel } from '@/components/charts/DonutChartPanel'
import { EntityLink } from '@/components/entity/EntityLink'
import type { ExportRow } from '@/utils/exportCsv'
import type { EntityRef } from '@/types/entities'
import type { RarasGraphPublicNode } from '@/services/raras/rarasRealService'
import styles from './DataExplorer.module.css'

function nodeToEntity(n: RarasGraphPublicNode): EntityRef | null {
  const [prefix, ...rest] = n.id.split(':')
  const code = rest.join(':')
  if (prefix === 'disease') return { type: 'DISEASE', id: `ORPHA:${code}`, label: n.label, source: 'Raras Public Graph', identifiers: { orpha: code } }
  if (prefix === 'phenotype') return { type: 'PHENOTYPE', id: code, label: n.label, source: 'Raras Public Graph', identifiers: { hpo: code } }
  if (prefix === 'gene') return { type: 'GENE', id: code, label: n.label, source: 'Raras Public Graph' }
  return null
}

const PAGE_SIZE = 25
const TYPE_LABEL: Record<string, string> = { disease: 'Doença', phenotype: 'Fenótipo', gene: 'Gene', drug: 'Fármaco' }
const TYPE_COLORS = ['#0b6b2b', '#1e5bb8', '#d97706', '#c75b39', '#6b7688']
const CONNECTION_BUCKETS = [
  { label: '0–9', min: 0, max: 9 },
  { label: '10–49', min: 10, max: 49 },
  { label: '50–99', min: 50, max: 99 },
  { label: '100–199', min: 100, max: 199 },
  { label: '200+', min: 200, max: Infinity },
]

function truncateLabel(label: string, max = 26) {
  return label.length > max ? `${label.slice(0, max - 1)}…` : label
}

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

  const typeDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const n of graph.data?.data ?? []) counts[n.type] = (counts[n.type] ?? 0) + 1
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([type, value]) => ({ label: TYPE_LABEL[type] ?? type, value }))
  }, [graph.data])

  const topByConnections = useMemo(
    () =>
      [...filtered]
        .sort((a, b) => b.connections - a.connections)
        .slice(0, 10)
        .map((n) => ({ label: truncateLabel(n.label), value: n.connections })),
    [filtered],
  )

  const connectionBuckets = useMemo(
    () =>
      CONNECTION_BUCKETS.map((b) => ({
        label: b.label,
        value: filtered.filter((n) => n.connections >= b.min && n.connections <= b.max).length,
      })),
    [filtered],
  )

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
          <div className={styles.chartsGrid}>
            <ChartFrame
              title="Distribuição por tipo"
              subtitle="Composição do subgrafo público completo, independente dos filtros abaixo."
              note={`Fonte: Raras Public Graph · ${graph.data?.data.length ?? 0} nós no total.`}
            >
              <DonutChartPanel data={typeDistribution} colors={TYPE_COLORS} height={180} />
            </ChartFrame>

            <ChartFrame
              title="Mais conectados"
              subtitle="Top 10 nós por número de conexões, dentro da seleção atual (tipo + busca)."
              note="Conexões = arestas do nó no subgrafo público — não é medida clínica."
            >
              <BarChartPanel data={topByConnections} color="#1e5bb8" height={220} />
            </ChartFrame>

            <ChartFrame
              title="Distribuição de conexões"
              subtitle="Quantos nós da seleção atual caem em cada faixa de conectividade."
              note="Faixas fixas: 0–9, 10–49, 50–99, 100–199, 200+."
            >
              <BarChartPanel data={connectionBuckets} color="#c75b39" height={220} />
            </ChartFrame>
          </div>

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
                {pageRows.map((n) => {
                  const entity = nodeToEntity(n)
                  return (
                  <tr key={n.id}>
                    <td>{entity ? <EntityLink entity={entity} /> : n.label}</td>
                    <td className="mono">{n.id}</td>
                    {columns.type && <td>{TYPE_LABEL[n.type] ?? n.type}</td>}
                    {columns.connections && <td className="mono">{n.connections}</td>}
                    {columns.extra && <td className={styles.extraCell}>{n.extra || '—'}</td>}
                  </tr>
                  )
                })}
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
