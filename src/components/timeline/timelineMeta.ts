import type { TimelineCategory, TimelineEventType } from '@/types/domain'
import type { TagTone } from '@/components/ui/Tag'

export const CATEGORY_TONE: Record<TimelineCategory, TagTone> = {
  assistencial: 'green',
  familiar: 'amber',
  fenotipico: 'terracotta',
  protocolo: 'blue',
  revisao: 'neutral',
}

export const CATEGORY_LABEL: Record<TimelineCategory, string> = {
  assistencial: 'Assistencial',
  familiar: 'Familiar',
  fenotipico: 'Fenotípico',
  protocolo: 'Protocolo',
  revisao: 'Revisão',
}

export const EVENT_TYPE_LABEL: Record<TimelineEventType, string> = {
  escuta_inicial: 'Escuta',
  visita_acs: 'Visita ACS',
  retorno_ubs: 'Retorno UBS',
  especialista: 'Especialista',
  exame: 'Exame',
  encaminhamento: 'Encaminhamento',
  ruptura: 'Ruptura',
  confirmacao: 'Confirmação',
  protocolo: 'Protocolo',
  revisao: 'Revisão',
}
