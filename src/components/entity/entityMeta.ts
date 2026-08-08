import type { EntityType } from '@/types/entities'

export const ENTITY_TYPE_LABEL: Record<EntityType, string> = {
  DISEASE: 'Doença',
  PHENOTYPE: 'Fenótipo',
  GENE: 'Gene',
  CASE: 'Caso',
  PERSON: 'Pessoa',
  REFERENCE_CENTER: 'Centro de referência',
  SERVICE: 'Serviço',
  PAPER: 'Paper',
  TRIAL: 'Ensaio clínico',
  PROTOCOL: 'Protocolo',
  STATE: 'Estado',
  MUNICIPALITY: 'Município',
  SOURCE: 'Fonte',
}

export const ENTITY_TYPE_GLYPH: Record<EntityType, string> = {
  DISEASE: '◈',
  PHENOTYPE: '◇',
  GENE: '⌬',
  CASE: '◉',
  PERSON: '◌',
  REFERENCE_CENTER: '▣',
  SERVICE: '▤',
  PAPER: '▦',
  TRIAL: '⊕',
  PROTOCOL: '▧',
  STATE: '▨',
  MUNICIPALITY: '▪',
  SOURCE: '○',
}
