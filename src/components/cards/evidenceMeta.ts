import type { EvidenceCategory } from '@/types/domain'
import type { TagTone } from '@/components/ui/Tag'

export const CATEGORY_TONE: Record<EvidenceCategory, TagTone> = {
  EVENTO: 'neutral',
  FENOTIPO: 'terracotta',
  FONTE: 'neutral',
  PROTOCOLO: 'blue',
  FAMILIA: 'amber',
  TERRITORIO: 'green',
  SERVICO: 'green',
  ALERTA: 'terracotta',
  CONEXAO: 'blue',
}

export const CATEGORY_LABEL: Record<EvidenceCategory, string> = {
  EVENTO: 'Evento',
  FENOTIPO: 'Fenótipo',
  FONTE: 'Fonte',
  PROTOCOLO: 'Protocolo',
  FAMILIA: 'Família',
  TERRITORIO: 'Território',
  SERVICO: 'Serviço',
  ALERTA: 'Alerta',
  CONEXAO: 'Conexão',
}
