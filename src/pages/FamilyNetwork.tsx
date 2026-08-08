import { useCaseGraph, useFamilyMembers, useFamilySimilarities } from '@/hooks/useCaseData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/ui/LoadingState'
import { FamilyMemberCard } from '@/components/family/FamilyMemberCard'
import { FamilySimilarityBanner } from '@/components/family/FamilySimilarityBanner'
import { CaseGraphCanvas } from '@/components/graph/CaseGraphCanvas'
import { GraphDetailPanel } from '@/components/graph/GraphDetailPanel'
import { Panel } from '@/components/ui/Panel'
import { useCaseUI } from '@/context/CaseUIContext'
import styles from './FamilyNetwork.module.css'

const CASE_ID = '9104'

export function FamilyNetwork() {
  const { data: members } = useFamilyMembers(CASE_ID)
  const { data: similarities } = useFamilySimilarities(CASE_ID)
  const { data: graph } = useCaseGraph(CASE_ID)
  const { selectedNode } = useCaseUI()

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Rede familiar"
        title="Family Network"
        subtitle="Relações familiares, consentimento, jornadas relacionadas e padrões assistenciais semelhantes."
        note="Linguagem sempre não conclusiva sobre genética — nunca causalidade hereditária afirmada."
      />

      {similarities?.map((s) => (
        <FamilySimilarityBanner key={s.id} similarity={s} />
      ))}

      {members ? (
        <div className={styles.grid}>
          {members.map((m) => (
            <FamilyMemberCard key={m.id} member={m} />
          ))}
        </div>
      ) : (
        <LoadingState label="Carregando rede familiar…" />
      )}

      {graph && (
        <section className={styles.section}>
          <SectionHeading eyebrow="Visualização" title="Modo familiar do grafo" subtitle="Mesmo grafo do caso, com destaque para pessoa, familiares, eventos e sinais." />
          <div className={styles.graphWrap}>
            <CaseGraphCanvas nodes={graph.nodes} edges={graph.edges} height={460} initialMode="familiar" />
            {selectedNode && (
              <div className={styles.floatingDetail}>
                <Panel raised padded={false}>
                  <GraphDetailPanel />
                </Panel>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
