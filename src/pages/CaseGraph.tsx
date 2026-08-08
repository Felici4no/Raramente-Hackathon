import { useCaseGraph } from '@/hooks/useCaseData'
import { CaseGraphCanvas } from '@/components/graph/CaseGraphCanvas'
import { GraphDetailPanel } from '@/components/graph/GraphDetailPanel'
import { Panel } from '@/components/ui/Panel'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/ui/LoadingState'
import styles from './CaseGraph.module.css'

const CASE_ID = '9104'

export function CaseGraph() {
  const { data: graph } = useCaseGraph(CASE_ID)

  if (!graph) return <LoadingState label="Montando o grafo relacional…" />

  return (
    <div>
      <SectionHeading
        eyebrow="Exploração profunda"
        title="Case Graph"
        subtitle="Pan, zoom e filtros por modo investigativo. Clique em qualquer nó para ver origem, data, status e relevância."
        note="Modos: assistencial · fenotípico · familiar · proveniência — cada um destaca um subconjunto de nós, sem esconder o restante do grafo."
      />
      <div className={styles.layout}>
        <CaseGraphCanvas nodes={graph.nodes} edges={graph.edges} height={680} />
        <Panel raised className={styles.detail}>
          <GraphDetailPanel />
        </Panel>
      </div>
    </div>
  )
}
