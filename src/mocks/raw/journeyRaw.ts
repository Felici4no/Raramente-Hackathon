import { journeyEvents } from '@/mocks/case9104'

/** Shape approximating the raw wire format of the QuaTiRare Journey API. */
export interface RawJourneyEvent {
  id: string
  data_evento: string
  tipo_evento: string
  categoria: string
  titulo: string
  descricao: string
  origem: {
    fonte: string
    fonte_id?: string
    data_registro: string
    status_verificacao: string
    explicacao: string
  }
}

export const rawJourneyEvents: RawJourneyEvent[] = journeyEvents.map((e) => ({
  id: e.id,
  data_evento: e.date,
  tipo_evento: e.type,
  categoria: e.category,
  titulo: e.title,
  descricao: e.description,
  origem: {
    fonte: e.provenance.source,
    fonte_id: e.provenance.sourceId,
    data_registro: e.provenance.date,
    status_verificacao: e.provenance.status,
    explicacao: e.provenance.explanation,
  },
}))
