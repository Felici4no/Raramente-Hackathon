import type { JourneyEvent, TimelineCategory, TimelineEventType, VerificationStatus, SourceName } from '@/types/domain'
import type { RawJourneyEvent } from '@/mocks/raw/journeyRaw'

export function fromRawJourneyEvent(raw: RawJourneyEvent): JourneyEvent {
  return {
    id: raw.id,
    date: raw.data_evento,
    type: raw.tipo_evento as TimelineEventType,
    category: raw.categoria as TimelineCategory,
    title: raw.titulo,
    description: raw.descricao,
    provenance: {
      source: raw.origem.fonte as SourceName,
      sourceId: raw.origem.fonte_id,
      date: raw.origem.data_registro,
      status: raw.origem.status_verificacao as VerificationStatus,
      explanation: raw.origem.explicacao,
    },
  }
}

export function fromRawJourneyEvents(raw: RawJourneyEvent[]): JourneyEvent[] {
  return raw.map(fromRawJourneyEvent).sort((a, b) => a.date.localeCompare(b.date))
}
