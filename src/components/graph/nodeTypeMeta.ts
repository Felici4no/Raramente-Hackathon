import type { EdgeType, NodeType } from '@/types/domain'

export const NODE_TYPE_META: Record<NodeType, { label: string; color: string; bg: string }> = {
  pessoa: { label: 'Pessoa', color: '#1e5bb8', bg: '#e4ecf9' },
  familiar: { label: 'Familiar', color: '#d97706', bg: '#f8ecd9' },
  servico: { label: 'Serviço', color: '#0b6b2b', bg: '#e2ede2' },
  evento: { label: 'Evento', color: '#3c4d63', bg: '#e7e2d6' },
  fenotipo: { label: 'Fenótipo', color: '#c75b39', bg: '#f5e4dc' },
  protocolo: { label: 'Protocolo', color: '#14243a', bg: '#dbe1ea' },
  fonte: { label: 'Fonte', color: '#6b7688', bg: '#ece5d5' },
  sinal: { label: 'Sinal / Conexão', color: '#a6321f', bg: '#f5e4dc' },
}

export const EDGE_TYPE_LABEL: Record<EdgeType, string> = {
  relatado_por: 'relatado por',
  relacionado_a: 'relacionado a',
  percorrido_em: 'percorrido em',
  confirmado_por: 'confirmado por',
  associado_a: 'associado a',
  similar_a: 'similar a',
  originado_em: 'originado em',
  gerou_protocolo: 'gerou protocolo',
}
