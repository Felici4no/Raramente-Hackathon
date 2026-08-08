import { useMemo, useState } from 'react'
import { ReactFlow, Background, Controls, BackgroundVariant, type NodeMouseHandler } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { CaseGraphEdge, CaseGraphNode, GraphMode } from '@/types/domain'
import { toFlowGraph, applyModeDimming } from '@/adapters/graphAdapter'
import { useCaseUI } from '@/context/CaseUIContext'
import { CaseNode } from './CaseNode'
import { GraphModeToggle } from './GraphModeToggle'
import { GraphLegend } from './GraphLegend'
import styles from './CaseGraphCanvas.module.css'

const nodeTypes = { caseNode: CaseNode }

interface CaseGraphCanvasProps {
  nodes: CaseGraphNode[]
  edges: CaseGraphEdge[]
  height?: number
  initialMode?: GraphMode | null
}

export function CaseGraphCanvas({ nodes, edges, height = 560, initialMode = null }: CaseGraphCanvasProps) {
  const [mode, setMode] = useState<GraphMode | null>(initialMode)
  const { selectNode } = useCaseUI()

  const { flowNodes, flowEdges } = useMemo(() => toFlowGraph(nodes, edges), [nodes, edges])
  const dimmedNodes = useMemo(() => applyModeDimming(flowNodes, mode), [flowNodes, mode])

  const handleNodeClick: NodeMouseHandler = (_, node) => {
    const domainNode = nodes.find((n) => n.id === node.id) ?? null
    selectNode(domainNode)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <GraphModeToggle mode={mode} onChange={setMode} />
        <GraphLegend />
      </div>
      <div className={styles.canvas} style={{ height }}>
        <ReactFlow
          nodes={dimmedNodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          onNodeClick={handleNodeClick}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
          minZoom={0.3}
          maxZoom={1.5}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#d8cfc1" />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  )
}
