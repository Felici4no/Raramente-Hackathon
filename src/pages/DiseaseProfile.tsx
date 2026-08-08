import { useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useActiveTrials,
  useDiseaseDetail,
  useDiseasesByPhenotypes,
  usePapersForDisease,
  useReferenceCenters,
  useSusCoverage,
} from '@/hooks/useRarasData'
import { useWikipediaMatch, useWikipediaSummary } from '@/hooks/useWikipedia'
import { phenotypes as case9104Phenotypes } from '@/mocks/case9104'
import { buildDiseaseGraph } from '@/adapters/diseaseGraphAdapter'
import { useCaseUI } from '@/context/CaseUIContext'
import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { LoadingState } from '@/components/ui/LoadingState'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { EntityLink } from '@/components/entity/EntityLink'
import { CaseGraphCanvas } from '@/components/graph/CaseGraphCanvas'
import { GraphDetailPanel } from '@/components/graph/GraphDetailPanel'
import { FactCard } from '@/components/cards/FactCard'
import { RarasPhenotypeList } from '@/components/phenotype/RarasPhenotypeList'
import { WikipediaHero } from '@/components/wikipedia/WikipediaHero'
import { WikipediaFactCard } from '@/components/wikipedia/WikipediaFactCard'
import { WikipediaContextSection } from '@/components/wikipedia/WikipediaContextSection'
import { WikipediaProvenancePanel } from '@/components/wikipedia/WikipediaProvenancePanel'
import { MatchExplanation } from '@/components/research/MatchExplanation'
import { fuzzyLabelMatch } from '@/utils/fuzzyMatch'
import type { ExportRow } from '@/utils/exportCsv'
import styles from './DiseaseProfile.module.css'

const TABS = ['overview', 'phenotypes', 'journey', 'genetics', 'sus', 'literature', 'sources'] as const
type Tab = (typeof TABS)[number]
const TAB_LABEL: Record<Tab, string> = {
  overview: 'Visão Geral',
  phenotypes: 'Fenótipos',
  journey: 'Jornada',
  genetics: 'Genética',
  sus: 'SUS',
  literature: 'Literatura',
  sources: 'Fontes',
}

function GeneList({ genes }: { genes: { symbol: string; hgnc?: string }[] }) {
  if (genes.length === 0) return <span>não informado</span>
  return (
    <>
      {genes.map((g, i) => (
        <span key={g.symbol}>
          {i > 0 && ', '}
          <EntityLink entity={{ type: 'GENE', id: g.symbol, label: g.symbol, sublabel: g.hgnc ? `HGNC:${g.hgnc}` : undefined, source: 'Raras Knowledge Graph' }} />
        </span>
      ))}
    </>
  )
}

export function DiseaseProfile() {
  const { diseaseId } = useParams<{ diseaseId: string }>()
  const orphaCode = diseaseId ?? ''
  const navigate = useNavigate()
  const { openSources, selectedNode } = useCaseUI()
  const [tab, setTab] = useState<Tab>('overview')
  const graphRef = useRef<HTMLDivElement>(null)

  const detailQ = useDiseaseDetail(orphaCode)
  const detail = detailQ.data?.data

  const wikiMatchQ = useWikipediaMatch(orphaCode || null, detail?.name ?? null)
  const wikiSummaryQ = useWikipediaSummary(wikiMatchQ.data)

  const susQ = useSusCoverage(orphaCode, detail?.name ?? orphaCode)
  const trialsQ = useActiveTrials(orphaCode)
  const papersQ = usePapersForDisease(orphaCode, 8)
  const centersQ = useReferenceCenters(orphaCode)

  const caseHpo = case9104Phenotypes.map((p) => ({ hpoId: p.hpoId, label: p.normalizedTerm }))
  const candidatesQ = useDiseasesByPhenotypes(
    caseHpo.map((p) => p.hpoId),
    20,
  )
  const candidateForThisDisease = candidatesQ.data?.data.find((c) => c.orphaCode === orphaCode)

  const graph = useMemo(() => (detail ? buildDiseaseGraph(detail, wikiMatchQ.data ?? null) : null), [detail, wikiMatchQ.data])

  const factRows: ExportRow[] = useMemo(() => {
    if (!detail) return []
    const retrievedAt = detailQ.data?.retrievedAt ?? new Date().toISOString()
    const rows: ExportRow[] = [
      { entity_id: `ORPHA:${detail.orphaCode}`, entity_type: 'DOENCA', label: 'Nome', value: detail.name, source: 'Raras Knowledge Graph', source_id: detail.orphaCode, verification_status: detailQ.data?.isMock ? 'demo' : 'verificado', retrieved_at: retrievedAt },
      { entity_id: `ORPHA:${detail.orphaCode}`, entity_type: 'DOENCA', label: 'Genes', value: detail.genes.map((g) => g.symbol).join('; ') || '—', source: 'Raras Knowledge Graph', source_id: detail.orphaCode, verification_status: detailQ.data?.isMock ? 'demo' : 'verificado', retrieved_at: retrievedAt },
      { entity_id: `ORPHA:${detail.orphaCode}`, entity_type: 'DOENCA', label: 'Herança', value: detail.inheritance ?? '—', source: 'Raras Knowledge Graph', source_id: detail.orphaCode, verification_status: detailQ.data?.isMock ? 'demo' : 'verificado', retrieved_at: retrievedAt },
      { entity_id: `ORPHA:${detail.orphaCode}`, entity_type: 'DOENCA', label: 'Prevalência', value: detail.prevalence ?? '—', source: 'Raras Knowledge Graph', source_id: detail.orphaCode, verification_status: detailQ.data?.isMock ? 'demo' : 'verificado', retrieved_at: retrievedAt },
      ...detail.phenotypes.map((p): ExportRow => ({ entity_id: p.hpoId, entity_type: 'FENOTIPO', label: p.label, value: p.frequency ?? '—', source: 'Raras Knowledge Graph / HPO', source_id: p.hpoId, verification_status: detailQ.data?.isMock ? 'demo' : 'verificado', retrieved_at: retrievedAt })),
    ]
    if (wikiMatchQ.data?.wikipediaTitle) {
      rows.push({
        entity_id: `ORPHA:${detail.orphaCode}`,
        entity_type: 'WIKIPEDIA',
        label: 'Página Wikipedia',
        value: wikiMatchQ.data.wikipediaTitle,
        source: 'Wikipedia',
        source_id: String(wikiMatchQ.data.wikipediaPageId ?? ''),
        verification_status: wikiMatchQ.data.matchConfidence >= 0.6 ? 'verificado (contextual)' : 'precisa de revisão',
        retrieved_at: wikiMatchQ.data.matchedAt,
      })
    }
    return rows
  }, [detail, detailQ.data, wikiMatchQ.data])

  if (detailQ.isLoading) return <LoadingState label="Carregando perfil da doença…" />
  if (!detail) {
    return (
      <Panel raised padded>
        <p>Não foi possível carregar dados para ORPHA:{orphaCode}.</p>
      </Panel>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className="eyebrow">Perfil investigativo · Disease Profile</p>
          <h1 className={styles.title}>{detail.name}</h1>
          <div className={styles.badges}>
            <Tag tone="neutral">ORPHA: {detail.orphaCode}</Tag>
            {detail.mondoCode && <Tag tone="neutral">MONDO: {detail.mondoCode}</Tag>}
            {wikiMatchQ.data?.wikipediaTitle && (
              <Tag tone="blue">WIKIPEDIA · {wikiMatchQ.data.wikipediaLanguage === 'pt' ? 'PT-BR' : 'EN'}</Tag>
            )}
            <Tag tone={detailQ.data?.isMock ? 'amber' : 'green'}>RARAS · {detailQ.data?.isMock ? 'DEMO' : 'LIVE'}</Tag>
          </div>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" size="sm" onClick={() => navigate(`/compare?orpha=${orphaCode}`)}>
            Comparar
          </Button>
          <Button variant="secondary" size="sm" onClick={() => graphRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
            Abrir no grafo
          </Button>
          <Button variant="secondary" size="sm" onClick={() => navigate(`/research/map?disease=ORPHA:${orphaCode}`)}>
            Ver no mapa
          </Button>
          <ExportCsvButton filename={`disease-${orphaCode}.csv`} rows={factRows} />
          <Button variant="secondary" size="sm" onClick={openSources}>
            Abrir fontes
          </Button>
        </div>
      </header>

      <WikipediaHero
        diseaseName={detail.name}
        match={wikiMatchQ.data}
        summary={wikiSummaryQ.data}
        isLoading={wikiMatchQ.isLoading || wikiSummaryQ.isLoading}
      />

      <section>
        <SectionHeading eyebrow="Mural de fatos" title="O que sabemos" subtitle="Cada card mantém sua própria fonte — estruturada (RARAS) ou contextual (Wikipedia)." />
        <div className={styles.mural}>
          <FactCard label="Tipo" title="Doença rara" source="RARAS">
            <p>{detail.name}</p>
          </FactCard>
          <FactCard label="Genes" source="RARAS">
            <p>
              <GeneList genes={detail.genes} />
            </p>
          </FactCard>
          <FactCard label="Herança" source="RARAS">
            <p>{detail.inheritance || 'não informado'}</p>
          </FactCard>
          <FactCard label="ORPHA" source="RARAS">
            <p className="mono">ORPHA:{detail.orphaCode}</p>
          </FactCard>
          <WikipediaFactCard match={wikiMatchQ.data} isLoading={wikiMatchQ.isLoading} />
        </div>
      </section>

      <nav className={styles.tabs} aria-label="Seções do perfil">
        {TABS.map((t) => (
          <button key={t} className={`${styles.tabBtn} ${tab === t ? styles.tabActive : ''}`} onClick={() => setTab(t)}>
            {TAB_LABEL[t]}
          </button>
        ))}
      </nav>

      <section className={styles.tabContent}>
        {tab === 'overview' && (
          <div className={styles.overviewGrid}>
            <Panel raised padded>
              <p className="eyebrow">O que é</p>
              <p className={styles.overviewText}>{wikiSummaryQ.data?.extract ?? (wikiMatchQ.isLoading ? 'Buscando…' : 'Sem resumo Wikipedia disponível.')}</p>
              <p className={styles.overviewSourceNote}>Fonte contextual — Wikipedia</p>
            </Panel>
            <Panel raised padded>
              <p className="eyebrow">Fenótipos principais</p>
              <ul className={styles.simpleList}>
                {detail.phenotypes.slice(0, 6).map((p) => (
                  <li key={p.hpoId}>
                    <EntityLink entity={{ type: 'PHENOTYPE', id: p.hpoId, label: p.label, sublabel: p.frequency, source: 'Raras Knowledge Graph / HPO', identifiers: { hpo: p.hpoId } }} />{' '}
                    <span className="mono">{p.hpoId}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel raised padded>
              <p className="eyebrow">Gene</p>
              <p>
                <GeneList genes={detail.genes} />
              </p>
            </Panel>
            <Panel raised padded>
              <p className="eyebrow">Herança</p>
              <p>{detail.inheritance || 'não informado'}</p>
            </Panel>
            <Panel raised padded>
              <p className="eyebrow">Idade de início</p>
              <p>não informado pela RARAS</p>
            </Panel>
            <Panel raised padded>
              <p className="eyebrow">Prevalência</p>
              <p>{detail.prevalence || 'não informado'}</p>
            </Panel>
          </div>
        )}

        {tab === 'phenotypes' && (
          <div className={styles.phenotypesSplit}>
            <RarasPhenotypeList phenotypes={detail.phenotypes} isMock={!!detailQ.data?.isMock} />
            {wikiMatchQ.data && wikiMatchQ.data.matchMethod !== 'NO_MATCH' ? (
              <WikipediaContextSection match={wikiMatchQ.data} />
            ) : (
              <Panel raised padded>
                <p className={styles.muted}>Sem página Wikipedia associada — nenhum contexto adicional disponível.</p>
              </Panel>
            )}
          </div>
        )}

        {tab === 'journey' && (
          <Panel raised padded>
            {candidatesQ.isLoading && <LoadingState label="Verificando relação com o caso #9104…" />}
            {!candidatesQ.isLoading && !candidateForThisDisease && (
              <p className={styles.muted}>
                Esta doença não aparece entre os candidatos investigativos do caso #9104 com os fenótipos atuais.
              </p>
            )}
            {candidateForThisDisease && (
              <>
                <p className="eyebrow" style={{ marginBottom: 8 }}>
                  Relação com História #9104 — Lia, 7a
                </p>
                <MatchExplanation
                  matched={caseHpo.filter((p) => candidateForThisDisease.matchedPhenotypeLabels.some((ml) => fuzzyLabelMatch(p.label, ml)))}
                  notObserved={caseHpo.filter((p) => !candidateForThisDisease.matchedPhenotypeLabels.some((ml) => fuzzyLabelMatch(p.label, ml)))}
                  uncertain={[]}
                  source="Raras MCP · find_diseases_by_phenotypes"
                />
              </>
            )}
          </Panel>
        )}

        {tab === 'genetics' && (
          <Panel raised padded>
            <p className="eyebrow">Genes associados</p>
            <ul className={styles.simpleList}>
              {detail.genes.length === 0 && <li>Nenhum gene estruturado disponível.</li>}
              {detail.genes.map((g) => (
                <li key={g.symbol}>
                  <EntityLink entity={{ type: 'GENE', id: g.symbol, label: g.symbol, sublabel: g.hgnc ? `HGNC:${g.hgnc}` : undefined, source: 'Raras Knowledge Graph' }} />{' '}
                  {g.hgnc && <span className="mono">HGNC:{g.hgnc}</span>}
                </li>
              ))}
            </ul>
            <p className={styles.overviewSourceNote}>Herança: {detail.inheritance || 'não informado'} · Fonte: RARAS</p>
          </Panel>
        )}

        {tab === 'sus' && (
          <Panel raised padded>
            {susQ.isLoading || trialsQ.isLoading ? (
              <LoadingState label="Consultando cobertura SUS…" />
            ) : (
              <div className={styles.susGrid}>
                <div>
                  <p className="eyebrow">Integração</p>
                  <p>{susQ.data?.data.integration ?? '—'}</p>
                </div>
                <div>
                  <p className="eyebrow">CEAF</p>
                  <p>{susQ.data?.data.ceafMeds ?? 0} medicamentos</p>
                </div>
                <div>
                  <p className="eyebrow">SIGTAP</p>
                  <p>{susQ.data?.data.sigtapProcedures ?? 0} procedimentos</p>
                </div>
                <div>
                  <p className="eyebrow">Ensaios clínicos</p>
                  <p>{trialsQ.data?.data.hasTrials ? 'Ativos' : 'Nenhum ativo'}</p>
                </div>
                <div>
                  <p className="eyebrow">Centros de referência</p>
                  <p>{centersQ.data?.data.length ?? 0} encontrados</p>
                </div>
              </div>
            )}
          </Panel>
        )}

        {tab === 'literature' && (
          <Panel raised padded>
            {papersQ.isLoading ? (
              <LoadingState label="Buscando literatura…" />
            ) : (papersQ.data?.data.length ?? 0) === 0 ? (
              <p className={styles.muted}>Nenhum artigo relacionado encontrado.</p>
            ) : (
              <ul className={styles.paperList}>
                {papersQ.data!.data.map((p) => (
                  <li key={p.title}>
                    <EntityLink entity={{ type: 'PAPER', id: p.url ?? p.title, label: p.title, source: 'Raras · PubMed', identifiers: { url: p.url } }} />
                    <span className={styles.paperMeta}>
                      {p.journal}, {p.year} {p.similarity && `· sim ${p.similarity}`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        )}

        {tab === 'sources' && (
          <div className={styles.sourcesGrid}>
            <Panel raised padded>
              <p className="eyebrow" style={{ marginBottom: 8 }}>
                RARAS Knowledge Graph
              </p>
              <p className={styles.muted}>Dados estruturados: fenótipos HPO, genes, herança, SUS, centros e literatura.</p>
              <DataSourceBadge isMock={!!detailQ.data?.isMock} />
            </Panel>
            {wikiMatchQ.data && wikiMatchQ.data.matchMethod !== 'NO_MATCH' ? (
              <Panel raised padded>
                <WikipediaProvenancePanel match={wikiMatchQ.data} summary={wikiSummaryQ.data} />
              </Panel>
            ) : (
              <Panel raised padded>
                <p className={styles.muted}>Sem fonte Wikipedia associada a esta doença.</p>
              </Panel>
            )}
          </div>
        )}
      </section>

      <section ref={graphRef}>
        <SectionHeading
          eyebrow="Grafo relacional"
          title="Doença, fenótipos, genes e proveniência"
          subtitle="Clique em qualquer nó para ver origem, data, status e relevância — incluindo o nó Wikipedia."
        />
        {graph && (
          <div className={styles.graphWrap}>
            <CaseGraphCanvas nodes={graph.nodes} edges={graph.edges} height={420} />
            {selectedNode && (
              <div className={styles.floatingDetail}>
                <Panel raised padded={false}>
                  <GraphDetailPanel />
                </Panel>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
