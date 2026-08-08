import { useParams } from 'react-router-dom'
import { useDiseasesByPhenotypes } from '@/hooks/useRarasData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Panel } from '@/components/ui/Panel'
import { LoadingState } from '@/components/ui/LoadingState'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import { EntityLink } from '@/components/entity/EntityLink'
import type { ExportRow } from '@/utils/exportCsv'
import styles from './GenePage.module.css'

/** Minimal real phenotype profile: the HPO id plus diseases it points to via find_diseases_by_phenotypes. */
export function PhenotypePage() {
  const { hpoId } = useParams<{ hpoId: string }>()
  const id = hpoId ?? ''
  const candidates = useDiseasesByPhenotypes([id], 15)

  const rows: ExportRow[] =
    candidates.data?.data.map((c) => ({
      entity_id: `ORPHA:${c.orphaCode}`,
      entity_type: 'DOENCA_POR_FENOTIPO',
      label: c.name,
      value: `${c.matchPercent}%`,
      source: 'Raras MCP · find_diseases_by_phenotypes',
      source_id: id,
      verification_status: candidates.data?.isMock ? 'demo' : 'verificado',
      retrieved_at: candidates.data?.retrievedAt ?? new Date().toISOString(),
    })) ?? []

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Perfil investigativo · Fenótipo HPO"
        title={id}
        subtitle="Doenças em que este fenótipo aparece como característica, via Raras Knowledge Graph."
        actions={<ExportCsvButton filename={`phenotype-${id}.csv`} rows={rows} />}
      />

      <Panel raised padded>
        <div className={styles.header}>
          <p className="eyebrow">Doenças relacionadas</p>
          {candidates.data && <DataSourceBadge isMock={candidates.data.isMock} />}
        </div>

        {candidates.isLoading && <LoadingState label={`Consultando doenças com ${id}…`} />}

        {candidates.data && candidates.data.data.length === 0 && (
          <p className={styles.muted}>Nenhuma doença retornada para este fenótipo.</p>
        )}

        {candidates.data && candidates.data.data.length > 0 && (
          <ul className={styles.list}>
            {candidates.data.data.map((c) => (
              <li key={c.orphaCode}>
                <EntityLink entity={{ type: 'DISEASE', id: `ORPHA:${c.orphaCode}`, label: c.name, source: 'Raras Knowledge Graph', identifiers: { orpha: c.orphaCode } }} />
                <span className="mono"> ORPHA:{c.orphaCode} · {c.matchPercent}%</span>
              </li>
            ))}
          </ul>
        )}

        <p className={styles.note}>Linguagem sempre associativa — presença deste fenótipo não é diagnóstico.</p>
      </Panel>
    </div>
  )
}
