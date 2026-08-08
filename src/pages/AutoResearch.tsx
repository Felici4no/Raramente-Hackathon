import { useSearchParams } from 'react-router-dom'
import { phenotypes as case9104Phenotypes } from '@/mocks/case9104'
import { useDiseasesByPhenotypes } from '@/hooks/useRarasData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/ui/LoadingState'
import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { EntityLink } from '@/components/entity/EntityLink'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import { CandidateCard } from '@/components/research/CandidateCard'
import type { ExportRow } from '@/utils/exportCsv'
import styles from './AutoResearch.module.css'

const PIPELINE = ['Entrada', 'Fenótipos normalizados', 'Raras MCP', 'find_diseases_by_phenotypes', 'Evidências', 'Candidatos investigativos']

export function AutoResearch() {
  const [params] = useSearchParams()
  const singleHpo = params.get('hpo')
  const caseId = params.get('case') ?? '9104'

  const caseHpo = singleHpo ? [{ hpoId: singleHpo, label: singleHpo }] : case9104Phenotypes.map((p) => ({ hpoId: p.hpoId, label: p.normalizedTerm }))
  const caseHpoIds = caseHpo.map((p) => p.hpoId)
  const inputLabel = singleHpo
    ? `Fenótipo isolado — ${singleHpo}`
    : `Caso #${caseId} — ${case9104Phenotypes.length} fenótipos normalizados`

  const candidates = useDiseasesByPhenotypes(caseHpoIds, 6)

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Investigação automática"
        title="Auto Research"
        subtitle="Cruza fenótipos normalizados com a Raras Knowledge Graph para sugerir candidatos de investigação — nunca um diagnóstico."
      />

      <Panel raised className={styles.pipeline}>
        <p className="eyebrow">Entrada</p>
        <p className={styles.inputLabel}>{inputLabel}</p>
        <div className={styles.flow}>
          {PIPELINE.map((step, i) => (
            <div key={step} className={styles.flowStep}>
              <span className={styles.flowIndex}>{i + 1}</span>
              {step}
              {i < PIPELINE.length - 1 && <span className={styles.flowArrow}>→</span>}
            </div>
          ))}
        </div>
        <div className={styles.hpoChips}>
          {caseHpo.map((h) => (
            <Tag key={h.hpoId} tone="amber" size="sm">
              <EntityLink entity={{ type: 'PHENOTYPE', id: h.hpoId, label: h.hpoId, sublabel: h.label, identifiers: { hpo: h.hpoId } }} />
            </Tag>
          ))}
        </div>
      </Panel>

      <section>
        <div className={styles.setHeader}>
          <SectionHeading
            eyebrow="Resultado"
            title="Candidate Research Set"
            subtitle="Candidatos ordenados por correspondência fenotípica. Explore cada um para ver centros, ensaios e literatura."
          />
          <div className={styles.setHeaderActions}>
            {candidates.data && <DataSourceBadge isMock={candidates.data.isMock} />}
            <ExportCsvButton
              filename="candidate-research-set.csv"
              rows={
                candidates.data
                  ? (candidates.data.data.map((c): ExportRow => ({
                      entity_id: `ORPHA:${c.orphaCode}`,
                      entity_type: 'CANDIDATO',
                      label: c.name,
                      value: `${c.matchPercent}% (${c.matchedCount}/${c.totalCount})`,
                      source: 'Raras MCP · find_diseases_by_phenotypes',
                      source_id: c.orphaCode,
                      verification_status: candidates.data.isMock ? 'demo' : 'verificado',
                      retrieved_at: candidates.data.retrievedAt,
                    })) as ExportRow[])
                  : []
              }
            />
          </div>
        </div>

        {candidates.isLoading && <LoadingState label="Consultando Raras Knowledge Graph…" />}

        {candidates.data && (
          <div className={styles.candidateList}>
            {candidates.data.data.map((c) => (
              <CandidateCard key={c.orphaCode} candidate={c} caseHpo={caseHpo} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
