import { useState } from 'react'
import type { RarasDiseaseCandidate } from '@/types/raras'
import { useDiseaseDetail, useActiveTrials, useReferenceCenters, useSusCoverage, usePapersForDisease, useEvidence } from '@/hooks/useRarasData'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { HowDoWeKnow } from '@/components/provenance/HowDoWeKnow'
import { EntityLink } from '@/components/entity/EntityLink'
import { fuzzyLabelMatch } from '@/utils/fuzzyMatch'
import { MatchExplanation } from './MatchExplanation'
import styles from './CandidateCard.module.css'

interface CaseHpo {
  hpoId: string
  label: string
}

export function CandidateCard({ candidate, caseHpo }: { candidate: RarasDiseaseCandidate; caseHpo: CaseHpo[] }) {
  const [expanded, setExpanded] = useState(false)
  const detail = useDiseaseDetail(candidate.orphaCode)
  const trials = useActiveTrials(expanded ? candidate.orphaCode : null)
  const centers = useReferenceCenters(expanded ? candidate.orphaCode : null)
  const sus = useSusCoverage(expanded ? candidate.orphaCode : null, candidate.name)
  const papers = usePapersForDisease(expanded ? candidate.orphaCode : null, 3)
  const evidence = useEvidence(expanded ? candidate.orphaCode : null, candidate.name)

  // Cross-referenced against what find_diseases_by_phenotypes itself reported
  // as matched — not re-derived by HPO id, since get_disease_detail's
  // characteristic phenotype list can use closely related but distinct HPO
  // ids for the same clinical concept the matcher already resolved
  // ontologically. Fuzzy word-overlap since the API's canonical short HPO
  // labels ("Atraso motor") don't always equal the case's fuller phrasing
  // ("Atraso motor / marcha independente ausente").
  const matched = caseHpo.filter((p) => candidate.matchedPhenotypeLabels.some((ml) => fuzzyLabelMatch(p.label, ml)))
  const notObserved = caseHpo.filter((p) => !candidate.matchedPhenotypeLabels.some((ml) => fuzzyLabelMatch(p.label, ml)))

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className="eyebrow">Candidato de investigação</p>
          <h3 className={styles.name}>
            <EntityLink
              entity={{
                type: 'DISEASE',
                id: `ORPHA:${candidate.orphaCode}`,
                label: candidate.name,
                sublabel: detail.data?.data.mondoCode ? `MONDO:${detail.data.data.mondoCode}` : undefined,
                source: 'Raras Knowledge Graph',
                identifiers: { orpha: candidate.orphaCode, mondo: detail.data?.data.mondoCode },
              }}
            />
          </h3>
          <div className={styles.idRow}>
            <span className="mono">ORPHA:{candidate.orphaCode}</span>
            {detail.data?.data.mondoCode && <span className="mono">MONDO:{detail.data.data.mondoCode}</span>}
          </div>
        </div>
        <div className={styles.headerRight}>
          <Tag tone="terracotta">{candidate.matchPercent}% match HPO</Tag>
          {detail.data && <DataSourceBadge isMock={detail.data.isMock} />}
        </div>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <p className="eyebrow">Gene</p>
          <p>
            {detail.data && detail.data.data.genes.length > 0
              ? detail.data.data.genes.map((g, i) => (
                  <span key={g.symbol}>
                    {i > 0 && ', '}
                    <EntityLink entity={{ type: 'GENE', id: g.symbol, label: g.symbol, sublabel: g.hgnc ? `HGNC:${g.hgnc}` : undefined, source: 'Raras Knowledge Graph' }} />
                  </span>
                ))
              : 'não informado'}
          </p>
        </div>
        <div className={styles.field}>
          <p className="eyebrow">Herança</p>
          <p>{detail.data?.data.inheritance || 'não informado'}</p>
        </div>
        <div className={styles.field}>
          <p className="eyebrow">Prevalência</p>
          <p>{detail.data?.data.prevalence || 'não informado'}</p>
        </div>
        <div className={styles.field}>
          <p className="eyebrow">SUS</p>
          <p>{detail.data?.data.susTrialsActive ?? 0} ensaios · {detail.data?.data.susCeafMeds ?? 0} CEAF</p>
        </div>
      </div>

      {caseHpo.length > 0 && (
        <MatchExplanation
          matched={matched}
          notObserved={notObserved}
          uncertain={[]}
          source="Raras MCP · find_diseases_by_phenotypes"
          evidence={
            evidence.data && (
              <div className={styles.evidenceContent}>
                <p>Status: {evidence.data.data.verificationStatus}</p>
                {evidence.data.data.pubmedIds.slice(0, 3).map((pmid) => (
                  <a key={pmid} href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`} target="_blank" rel="noreferrer noopener">
                    PMID:{pmid} ↗
                  </a>
                ))}
              </div>
            )
          }
        />
      )}

      <button className={styles.expandBtn} onClick={() => setExpanded((v) => !v)}>
        {expanded ? '− Ocultar centros, trials e literatura' : '+ Ver centros, trials e literatura'}
      </button>

      {expanded && (
        <div className={styles.expandedGrid}>
          <div>
            <p className="eyebrow">Centros de referência</p>
            <ul className={styles.smallList}>
              {(centers.data?.data ?? []).slice(0, 4).map((c) => (
                <li key={c.name}>
                  <EntityLink
                    entity={{
                      type: 'REFERENCE_CENTER',
                      id: c.cnes ?? c.name,
                      label: c.name,
                      sublabel: [c.city, c.uf].filter(Boolean).join('/'),
                      source: 'Raras Knowledge Graph',
                      identifiers: { cnes: c.cnes, uf: c.uf },
                    }}
                  />{' '}
                  {c.uf && <span className="mono">· {c.uf}</span>}
                </li>
              ))}
              {centers.isLoading && <li>carregando…</li>}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Ensaios ativos</p>
            <p className={styles.smallText}>{trials.data?.data.summary ?? (trials.isLoading ? 'carregando…' : '—')}</p>
          </div>
          <div>
            <p className="eyebrow">Cobertura SUS</p>
            <p className={styles.smallText}>
              {sus.data ? `${sus.data.data.integration} · CEAF ${sus.data.data.ceafMeds} · SIGTAP ${sus.data.data.sigtapProcedures}` : sus.isLoading ? 'carregando…' : '—'}
            </p>
          </div>
          <div>
            <p className="eyebrow">Literatura</p>
            <ul className={styles.smallList}>
              {(papers.data?.data ?? []).slice(0, 3).map((p) => (
                <li key={p.title}>
                  <a href={p.url} target="_blank" rel="noreferrer noopener">
                    {p.title}
                  </a>
                </li>
              ))}
              {papers.isLoading && <li>carregando…</li>}
            </ul>
          </div>
        </div>
      )}

      {evidence.data && (
        <HowDoWeKnow
          source="Raras Knowledge Graph"
          sourceId={`ORPHA:${candidate.orphaCode}`}
          retrievedAt={evidence.data.retrievedAt}
          verificationStatus={evidence.data.data.verificationStatus}
          isMock={evidence.data.isMock}
          links={Object.entries(evidence.data.data.xrefs).map(([k, v]) => ({ label: k, url: v.startsWith('http') ? v : `https://${v}` }))}
        />
      )}
    </article>
  )
}
