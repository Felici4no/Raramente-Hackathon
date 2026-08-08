import { useCaseUI } from '@/context/CaseUIContext'
import { ProvenanceRow } from '@/components/provenance/ProvenanceRow'
import { NODE_TYPE_META } from './nodeTypeMeta'
import styles from './GraphDetailPanel.module.css'

export function GraphDetailPanel() {
  const { selectedNode, selectNode } = useCaseUI()

  if (!selectedNode) {
    return (
      <div className={styles.empty}>
        <p className="eyebrow">Detalhe do nó</p>
        <p className={styles.emptyText}>Selecione um nó no grafo para ver nome, tipo, origem, data, status e por que ele é relevante para a investigação.</p>
      </div>
    )
  }

  const meta = NODE_TYPE_META[selectedNode.type]

  return (
    <div className={styles.panel}>
      <div className={styles.headerRow}>
        <span className={styles.type} style={{ color: meta.color, background: meta.bg }}>
          {meta.label}
        </span>
        <button className={styles.close} onClick={() => selectNode(null)} aria-label="Fechar detalhe">
          ✕
        </button>
      </div>
      <h4 className={styles.name}>{selectedNode.label}</h4>
      {selectedNode.sublabel && <p className={styles.sublabel}>{selectedNode.sublabel}</p>}

      <p className={styles.description}>{selectedNode.description}</p>

      <div className={styles.block}>
        <p className="eyebrow">Por que é relevante</p>
        <p className={styles.blockText}>{selectedNode.relevance}</p>
      </div>

      <div className={styles.block}>
        <p className="eyebrow">Proveniência</p>
        <ProvenanceRow provenance={selectedNode.provenance} />
        <p className={styles.blockText}>{selectedNode.provenance.explanation}</p>
      </div>

      {selectedNode.meta && Object.keys(selectedNode.meta).length > 0 && (
        <div className={styles.block}>
          <p className="eyebrow">Metadados</p>
          <dl className={styles.metaList}>
            {Object.entries(selectedNode.meta).map(([k, v]) => (
              <div key={k} className={styles.metaRow}>
                <dt>{k}</dt>
                <dd className="mono">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  )
}
