import { relatedDiseases } from '@/mocks/case9104'

/** Shape approximating the raw wire format of the Raras Knowledge Graph API. */
export interface RawRelatedDisease {
  id: string
  nome: string
  orpha_code?: string
  fenotipos_compartilhados: number
  nota_interpretativa: string
}

export const rawRelatedDiseases: RawRelatedDisease[] = relatedDiseases.map((d) => ({
  id: d.id,
  nome: d.name,
  orpha_code: d.orphaCode,
  fenotipos_compartilhados: d.sharedPhenotypes,
  nota_interpretativa: d.note,
}))
