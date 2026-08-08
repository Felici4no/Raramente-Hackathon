import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { CaseFlowNode } from '@/adapters/graphAdapter'
import { NODE_TYPE_META } from './nodeTypeMeta'
import styles from './CaseNode.module.css'

export function CaseNode({ data, selected }: NodeProps<CaseFlowNode>) {
  const meta = NODE_TYPE_META[data.node.type]
  return (
    <div
      className={[styles.node, data.dimmed ? styles.dimmed : '', selected ? styles.selected : ''].join(' ')}
      style={{ borderColor: meta.color, background: meta.bg }}
    >
      <Handle type="target" position={Position.Left} className={styles.handle} style={{ background: meta.color }} />
      <span className={styles.type} style={{ color: meta.color }}>
        {meta.label}
      </span>
      <span className={styles.label}>{data.node.label}</span>
      {data.node.sublabel && <span className={styles.sublabel}>{data.node.sublabel}</span>}
      <Handle type="source" position={Position.Right} className={styles.handle} style={{ background: meta.color }} />
    </div>
  )
}
