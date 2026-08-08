import type { RelatedDisease } from '@/types/domain'
import type { RawRelatedDisease } from '@/mocks/raw/rarasRaw'

export function fromRawRelatedDisease(raw: RawRelatedDisease): RelatedDisease {
  return {
    id: raw.id,
    name: raw.nome,
    orphaCode: raw.orpha_code,
    sharedPhenotypes: raw.fenotipos_compartilhados,
    note: raw.nota_interpretativa,
  }
}

export function fromRawRelatedDiseases(raw: RawRelatedDisease[]): RelatedDisease[] {
  return raw.map(fromRawRelatedDisease)
}
