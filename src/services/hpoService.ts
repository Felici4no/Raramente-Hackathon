import { resolve } from '@/services/apiClient'
import { phenotypes } from '@/mocks/case9104'
import type { PhenotypeNormalization } from '@/types/domain'

export async function getPhenotypeNormalizations(_caseId: string): Promise<PhenotypeNormalization[]> {
  return resolve(() => phenotypes)
}
