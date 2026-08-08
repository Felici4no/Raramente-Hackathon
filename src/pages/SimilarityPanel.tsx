import { usePhenotypes } from '@/hooks/useCaseData'
import { useDiseasesByPhenotypes } from '@/hooks/useRarasData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/ui/LoadingState'
import { Panel } from '@/components/ui/Panel'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { PhenotypeRow } from '@/components/phenotype/PhenotypeRow'
import { RelatedDiseasesPanel } from '@/components/phenotype/RelatedDiseasesPanel'
import type { RelatedDisease } from '@/types/domain'
import type { ExportRow } from '@/utils/exportCsv'
import styles from './SimilarityPanel.module.css'

const CASE_ID = '9104'

export function SimilarityPanel() {
  const { data: phenotypes } = usePhenotypes(CASE_ID)
  const candidates = useDiseasesByPhenotypes(phenotypes?.map((p) => p.hpoId) ?? [], 8)

  const relatedDiseases: RelatedDisease[] | undefined = candidates.data?.data.map((c) => ({
    id: c.orphaCode,
    name: c.name,
    orphaCode: c.orphaCode,
    sharedPhenotypes: c.matchedCount,
    note: `${c.matchPercent}% de correspondência fenotípica — ${c.matchedPhenotypeLabels.join(', ')}`,
  }))

  const phenotypeRows: ExportRow[] = (phenotypes ?? []).map((p) => ({
    entity_id: p.id,
    entity_type: 'FENOTIPO',
    label: p.normalizedTerm,
    value: p.hpoId,
    source: p.provenance.source,
    source_id: p.hpoId,
    verification_status: p.provenance.status,
    retrieved_at: p.provenance.date,
  }))

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Normalização fenotípica"
        title="Phenotype Normalization"
        subtitle="Relatos livres transformados em conceitos HPO padronizados, com score de correspondência e sinônimos."
        note="Linguagem sempre associativa — 'associado a', 'compatível com investigação'. Nunca 'diagnosticado' ou 'confirmado'."
        actions={<ExportCsvButton filename="phenotypes-9104.csv" rows={phenotypeRows} />}
      />

      {phenotypes ? (
        <Panel raised padded>
          {phenotypes.map((p) => (
            <PhenotypeRow key={p.id} phenotype={p} />
          ))}
        </Panel>
      ) : (
        <LoadingState label="Normalizando fenótipos…" />
      )}

      <section className={styles.section}>
        <div className={styles.subHeader}>
          <SectionHeading
            eyebrow="Raras Knowledge Graph"
            title="Doenças associadas aos fenótipos"
            subtitle="Compatibilidade com investigação, nunca diagnóstico automático."
          />
          {candidates.data && <DataSourceBadge isMock={candidates.data.isMock} />}
        </div>
        {relatedDiseases ? <RelatedDiseasesPanel diseases={relatedDiseases} /> : <LoadingState label="Consultando Raras Knowledge Graph…" />}
      </section>
    </div>
  )
}
