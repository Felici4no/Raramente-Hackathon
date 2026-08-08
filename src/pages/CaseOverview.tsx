import { useCaseGraph, useCaseSummary, useExplainability, useTerritoryContext } from '@/hooks/useCaseData'
import { CaseGraphCanvas } from '@/components/graph/CaseGraphCanvas'
import { GraphDetailPanel } from '@/components/graph/GraphDetailPanel'
import { MetricStat } from '@/components/ui/MetricStat'
import { Panel } from '@/components/ui/Panel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/ui/LoadingState'
import { TerritoryContextPanel } from '@/components/territory/TerritoryContextPanel'
import { ChartsGallery } from '@/components/charts/ChartsGallery'
import { WhyThisMatters } from '@/components/explain/WhyThisMatters'
import { useCaseUI } from '@/context/CaseUIContext'
import styles from './CaseOverview.module.css'

const CASE_ID = '9104'

export function CaseOverview() {
  const { data: summary } = useCaseSummary(CASE_ID)
  const { data: graph } = useCaseGraph(CASE_ID)
  const { data: territory } = useTerritoryContext(CASE_ID)
  const { data: explainability } = useExplainability(CASE_ID)
  const { selectedNode } = useCaseUI()

  if (!summary || !graph || !territory) {
    return <LoadingState label="Reconstruindo a jornada…" />
  }

  return (
    <div className={styles.page}>
      <div className={styles.mainRow}>
        <div className={styles.graphCol}>
          <SectionHeading
            eyebrow="Zona 2 — Grafo relacional"
            title="Mapa da jornada"
            subtitle="Pessoa, família, serviços, eventos, fenótipos, protocolos e fontes conectados em um único grafo investigativo."
          />
          <div className={styles.graphWrap}>
            <CaseGraphCanvas nodes={graph.nodes} edges={graph.edges} height={540} />
            {selectedNode && (
              <div className={styles.floatingDetail}>
                <GraphDetailPanel />
              </div>
            )}
          </div>
        </div>

        <aside className={styles.sidebarCol}>
          <Panel raised>
            <p className="eyebrow" style={{ marginBottom: 4 }}>
              Zona 3 — Sidebar analítica
            </p>
            <MetricStat label="Índice de enredamento" value={`${summary.entanglementIndex}/100`} tone="terracotta" sublabel="Sinal agregado que prioriza esta jornada para revisão" />
            <MetricStat label="Jornada reconstruída" value={`${summary.reconstructedPercent}%`} />
            <MetricStat label="Serviços envolvidos" value={String(summary.servicesInvolved)} />
            <MetricStat label="Retornos" value={String(summary.returns)} />
            <MetricStat label="Rupturas" value={String(summary.ruptures)} tone={summary.ruptures > 0 ? 'terracotta' : 'neutral'} />
            <MetricStat label="Tempo sem resolução" value={`${summary.monthsUnresolved} meses`} tone="amber" />
            <MetricStat label="Fenótipos normalizados" value={String(summary.phenotypesNormalized)} />
            <MetricStat label="Conexões familiares" value={String(summary.familyConnections)} />
            <MetricStat label="Protocolo atual" value={summary.currentProtocol} />
          </Panel>

          <Panel raised className={styles.territoryPanel}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              Territory Context
            </p>
            <TerritoryContextPanel territory={territory} />
          </Panel>
        </aside>
      </div>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Painel analítico"
          title="Panorama da jornada"
          subtitle="Nove leituras complementares sobre eventos, serviços, fenótipos, família e território."
        />
        <ChartsGallery />
      </section>

      {explainability && (
        <section className={styles.section}>
          <SectionHeading eyebrow="Explicabilidade" title="Why this matters" subtitle="Toda priorização é explicável — nada é uma caixa-preta." />
          <Panel raised padded>
            <WhyThisMatters explainability={explainability} />
          </Panel>
        </section>
      )}
    </div>
  )
}
