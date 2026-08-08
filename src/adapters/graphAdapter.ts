import type { Edge, Node } from '@xyflow/react'
import type { CaseGraphEdge, CaseGraphNode, GraphMode, NodeType } from '@/types/domain'

const COLUMN_ORDER: NodeType[] = ['familiar', 'pessoa', 'servico', 'evento', 'fenotipo', 'protocolo', 'sinal', 'fonte']

const COLUMN_X: Record<NodeType, number> = COLUMN_ORDER.reduce((acc, type, i) => {
  acc[type] = i * 250
  return acc
}, {} as Record<NodeType, number>)

export interface CaseFlowNodeData extends Record<string, unknown> {
  node: CaseGraphNode
  dimmed: boolean
}

export type CaseFlowNode = Node<CaseFlowNodeData, 'caseNode'>
export type CaseFlowEdge = Edge<{ edge: CaseGraphEdge }>

/** Lays out the domain graph into React Flow nodes/edges, columns by node type. */
export function toFlowGraph(nodes: CaseGraphNode[], edges: CaseGraphEdge[]): { flowNodes: CaseFlowNode[]; flowEdges: CaseFlowEdge[] } {
  const columnCounts: Partial<Record<NodeType, number>> = {}

  const flowNodes: CaseFlowNode[] = nodes.map((node) => {
    const count = columnCounts[node.type] ?? 0
    columnCounts[node.type] = count + 1
    return {
      id: node.id,
      type: 'caseNode',
      position: { x: COLUMN_X[node.type], y: count * 132 },
      data: { node, dimmed: false },
    }
  })

  const flowEdges: CaseFlowEdge[] = edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    label: edge.label,
    data: { edge },
    type: 'smoothstep',
  }))

  return { flowNodes, flowEdges }
}

const MODE_NODE_TYPES: Record<GraphMode, NodeType[]> = {
  assistencial: ['pessoa', 'familiar', 'servico', 'evento', 'protocolo'],
  fenotipico: ['pessoa', 'fenotipo', 'evento', 'protocolo'],
  familiar: ['pessoa', 'familiar', 'evento', 'sinal'],
  proveniencia: ['pessoa', 'fonte', 'evento', 'fenotipo', 'protocolo'],
}

/** Dims nodes that fall outside the active investigative mode, without removing them from the canvas. */
export function applyModeDimming(nodes: CaseFlowNode[], mode: GraphMode | null): CaseFlowNode[] {
  if (!mode) return nodes.map((n) => (n.data.dimmed ? { ...n, data: { ...n.data, dimmed: false } } : n))
  const visibleTypes = new Set(MODE_NODE_TYPES[mode])
  return nodes.map((n) => ({ ...n, data: { ...n.data, dimmed: !visibleTypes.has(n.data.node.type) } }))
}
