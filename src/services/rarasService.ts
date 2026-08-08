import { resolve } from '@/services/apiClient'
import { rawRelatedDiseases } from '@/mocks/raw/rarasRaw'
import { fromRawRelatedDiseases } from '@/adapters/rarasAdapter'
import type { RelatedDisease } from '@/types/domain'

/**
 * Returns diseases associated with the given HPO phenotype ids. Language
 * downstream must stay non-diagnostic — "associado a", never "diagnosticado".
 */
export async function getRelatedDiseases(_phenotypeIds: string[]): Promise<RelatedDisease[]> {
  return resolve(() => fromRawRelatedDiseases(rawRelatedDiseases))
}
