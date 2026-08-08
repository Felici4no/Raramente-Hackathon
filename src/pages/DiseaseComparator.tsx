import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDiseaseSearch, useDiseaseDetail, useSusCoverage, useActiveTrials, usePapersForDisease, useReferenceCenters } from '@/hooks/useRarasData'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { caseSummary, phenotypes as case9104Phenotypes } from '@/mocks/case9104'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import type { ExportRow } from '@/utils/exportCsv'
import styles from './DiseaseComparator.module.css'

const MAX_DISEASES = 5

function useComparisonColumn(orphaCode: string | null) {
  const detail = useDiseaseDetail(orphaCode)
  const sus = useSusCoverage(orphaCode, detail.data?.data.name ?? orphaCode ?? '')
  const trials = useActiveTrials(orphaCode)
  const papers = usePapersForDisease(orphaCode, 10)
  const centers = useReferenceCenters(orphaCode)
  return { orphaCode, detail, sus, trials, papers, centers }
}

type ComparisonColumn = ReturnType<typeof useComparisonColumn>

const ROW_LABELS = [
  'ORPHA',
  'MONDO',
  'CID-10',
  'Prevalência',
  'Herança',
  'Genes',
  'Fenótipos HPO',
  'SUS · CEAF',
  'SUS · SIGTAP',
  'Ensaios clínicos',
  'Centros de referência',
  'Papers relacionados',
]

function renderDiseaseCell(col: ComparisonColumn, rowIndex: number) {
  const d = col.detail.data?.data
  switch (rowIndex) {
    case 0:
      return d ? `ORPHA:${d.orphaCode}` : '—'
    case 1:
      return d?.mondoCode ? `MONDO:${d.mondoCode}` : '—'
    case 2:
      return d?.cid10 ?? '—'
    case 3:
      return d?.prevalence ?? '—'
    case 4:
      return d?.inheritance ?? '—'
    case 5:
      return d?.genes.map((g) => g.symbol).join(', ') || '—'
    case 6:
      return (
        <>
          {d?.phenotypes.slice(0, 5).map((p) => (
            <span key={p.hpoId} className={styles.hpoChip}>
              {p.label}
            </span>
          )) ?? '—'}
          {d && d.phenotypes.length > 5 && <span className={styles.more}>+{d.phenotypes.length - 5}</span>}
        </>
      )
    case 7:
      return col.sus.data ? `${col.sus.data.data.ceafMeds} medicamentos` : '—'
    case 8:
      return col.sus.data ? `${col.sus.data.data.sigtapProcedures} procedimentos` : '—'
    case 9:
      return col.trials.data ? (col.trials.data.data.hasTrials ? 'Ativos' : 'Nenhum ativo') : '—'
    case 10:
      return col.centers.data ? col.centers.data.data.length : '—'
    case 11:
      return col.papers.data ? col.papers.data.data.length : '—'
    default:
      return '—'
  }
}

function renderCaseCell(rowIndex: number) {
  if (rowIndex === 6) {
    return case9104Phenotypes.map((p) => (
      <span key={p.hpoId} className={styles.hpoChip}>
        {p.normalizedTerm}
      </span>
    ))
  }
  if (rowIndex === 9) return caseSummary.currentProtocol
  return '—'
}

export function DiseaseComparator() {
  const [params] = useSearchParams()
  const [selected, setSelected] = useState<string[]>([])
  const [includeCase, setIncludeCase] = useState(false)
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 350)
  const searchResults = useDiseaseSearch(debounced, 6)

  useEffect(() => {
    const orpha = params.get('orpha')
    if (orpha) setSelected((prev) => (prev.includes(orpha) ? prev : [...prev, orpha]))
  }, [params])

  // Fixed number of hook calls (Rules of Hooks) — unused slots pass null and stay disabled.
  const slot0 = useComparisonColumn(selected[0] ?? null)
  const slot1 = useComparisonColumn(selected[1] ?? null)
  const slot2 = useComparisonColumn(selected[2] ?? null)
  const slot3 = useComparisonColumn(selected[3] ?? null)
  const slot4 = useComparisonColumn(selected[4] ?? null)
  const columns = [slot0, slot1, slot2, slot3, slot4].slice(0, selected.length)

  function addDisease(orphaCode: string) {
    setSelected((prev) => (prev.includes(orphaCode) || prev.length >= MAX_DISEASES ? prev : [...prev, orphaCode]))
    setQuery('')
  }

  function removeDisease(orphaCode: string) {
    setSelected((prev) => prev.filter((c) => c !== orphaCode))
  }

  const exportRows: ExportRow[] = columns.flatMap((col) =>
    ROW_LABELS.map((label, i) => ({
      entity_id: `ORPHA:${col.orphaCode}`,
      entity_type: 'DOENCA_ATRIBUTO',
      label,
      value: typeof renderDiseaseCell(col, i) === 'string' ? (renderDiseaseCell(col, i) as string) : `${col.detail.data?.data.phenotypes.length ?? 0} itens`,
      source: 'Raras Knowledge Graph (MCP)',
      source_id: col.orphaCode ?? '',
      verification_status: col.detail.data?.isMock ? 'demo' : 'verificado',
      retrieved_at: col.detail.data?.retrievedAt ?? new Date().toISOString(),
    })),
  )

  const hasColumns = columns.length > 0 || includeCase

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Comparação estruturada"
        title="Disease Comparator"
        subtitle="Selecione até 5 doenças — ou compare o caso investigado contra hipóteses candidatas."
        actions={<ExportCsvButton filename="disease-comparator.csv" rows={exportRows} />}
      />

      <Panel raised className={styles.controls}>
        <div className={styles.searchRow}>
          <input
            className={styles.searchInput}
            placeholder="Buscar doença para adicionar (ORPHA, nome, MONDO)…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <label className={styles.toggle}>
            <input type="checkbox" checked={includeCase} onChange={(e) => setIncludeCase(e.target.checked)} />
            Incluir História #9104 (Lia)
          </label>
        </div>
        {debounced.trim().length >= 2 && (searchResults.data?.data.length ?? 0) > 0 && (
          <div className={styles.results}>
            {searchResults.data!.data.map((d) => (
              <button
                key={d.orphaCode}
                className={styles.resultBtn}
                onClick={() => addDisease(d.orphaCode)}
                disabled={selected.length >= MAX_DISEASES}
              >
                <Tag tone="green" size="sm">
                  DOENÇA
                </Tag>
                {d.name} <span className="mono">ORPHA:{d.orphaCode}</span>
              </button>
            ))}
          </div>
        )}
        <p className={styles.hint}>
          {selected.length}/{MAX_DISEASES} doenças selecionadas
        </p>
      </Panel>

      {!hasColumns ? (
        <Panel raised padded className={styles.empty}>
          Use a busca acima para adicionar doenças à comparação.
        </Panel>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.rowLabelHead}>Atributo</th>
                {includeCase && (
                  <th className={styles.th}>
                    <div className={styles.thInner}>
                      <p className={styles.columnName}>História #9104 — Lia, 7a</p>
                      <Tag tone="blue" size="sm">
                        CASO
                      </Tag>
                    </div>
                  </th>
                )}
                {columns.map((col) => (
                  <th key={col.orphaCode} className={styles.th}>
                    <div className={styles.thInner}>
                      <button className={styles.remove} onClick={() => removeDisease(col.orphaCode!)} aria-label="Remover">
                        ✕
                      </button>
                      <p className={styles.columnName}>{col.detail.data?.data.name ?? `ORPHA:${col.orphaCode}`}</p>
                      {col.detail.data && <DataSourceBadge isMock={col.detail.data.isMock} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROW_LABELS.map((label, i) => (
                <tr key={label}>
                  <td className={styles.rowLabelCell}>{label}</td>
                  {includeCase && <td className={i === 6 ? styles.chipCell : undefined}>{renderCaseCell(i)}</td>}
                  {columns.map((col) => (
                    <td key={col.orphaCode} className={i === 6 ? styles.chipCell : undefined}>
                      {renderDiseaseCell(col, i)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
