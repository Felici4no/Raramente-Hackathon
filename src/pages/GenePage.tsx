import { useParams } from 'react-router-dom'
import { useDiseaseSearch } from '@/hooks/useRarasData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Panel } from '@/components/ui/Panel'
import { LoadingState } from '@/components/ui/LoadingState'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import { EntityLink } from '@/components/entity/EntityLink'
import type { ExportRow } from '@/utils/exportCsv'
import styles from './GenePage.module.css'

/**
 * Minimal but real gene profile — RARAS's MCP tools don't expose a
 * get_gene_detail call, so this resolves associated diseases by searching
 * the gene symbol against search_diseases rather than inventing gene-level
 * data the API doesn't provide.
 */
export function GenePage() {
  const { geneSymbol } = useParams<{ geneSymbol: string }>()
  const symbol = geneSymbol ?? ''
  const results = useDiseaseSearch(symbol, 10)

  const rows: ExportRow[] =
    results.data?.data.map((d) => ({
      entity_id: `ORPHA:${d.orphaCode}`,
      entity_type: 'DOENCA_POR_GENE',
      label: d.name,
      value: symbol,
      source: 'Raras Knowledge Graph',
      source_id: d.orphaCode,
      verification_status: results.data?.isMock ? 'demo' : 'verificado',
      retrieved_at: results.data?.retrievedAt ?? new Date().toISOString(),
    })) ?? []

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Perfil investigativo · Gene"
        title={symbol}
        subtitle="Doenças associadas a este símbolo gênico, localizadas via busca textual na Raras Knowledge Graph."
        actions={<ExportCsvButton filename={`gene-${symbol}.csv`} rows={rows} />}
      />

      <Panel raised padded>
        <div className={styles.header}>
          <p className="eyebrow">Doenças associadas</p>
          {results.data && <DataSourceBadge isMock={results.data.isMock} />}
        </div>

        {results.isLoading && <LoadingState label={`Buscando doenças associadas a ${symbol}…`} />}

        {results.data && results.data.data.length === 0 && (
          <p className={styles.muted}>Nenhuma doença encontrada para este símbolo na busca textual da Raras.</p>
        )}

        {results.data && results.data.data.length > 0 && (
          <ul className={styles.list}>
            {results.data.data.map((d) => (
              <li key={d.orphaCode}>
                <EntityLink entity={{ type: 'DISEASE', id: `ORPHA:${d.orphaCode}`, label: d.name, source: 'Raras Knowledge Graph', identifiers: { orpha: d.orphaCode } }} />
                <span className="mono"> ORPHA:{d.orphaCode}</span>
              </li>
            ))}
          </ul>
        )}

        <p className={styles.note}>
          Este gene não tem uma consulta dedicada nas ferramentas Raras disponíveis — a lista acima vem de uma
          busca textual pelo símbolo, não de uma associação gene→doença estruturada.
        </p>
      </Panel>
    </div>
  )
}
