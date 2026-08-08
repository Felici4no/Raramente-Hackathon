import { resolve } from '@/services/apiClient'
import { territoryContext } from '@/mocks/case9104'
import type { TerritoryContextData } from '@/types/domain'

export async function getTerritoryContext(_caseId: string): Promise<TerritoryContextData> {
  return resolve(() => territoryContext)
}
