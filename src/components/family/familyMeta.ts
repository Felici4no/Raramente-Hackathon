import type { ConsentStatus } from '@/types/domain'
import type { TagTone } from '@/components/ui/Tag'

export const CONSENT_TONE: Record<ConsentStatus, TagTone> = {
  autorizado: 'green',
  pendente: 'amber',
  nao_informado: 'neutral',
}

export const CONSENT_LABEL: Record<ConsentStatus, string> = {
  autorizado: 'Consentimento autorizado',
  pendente: 'Consentimento pendente',
  nao_informado: 'Não informado',
}
