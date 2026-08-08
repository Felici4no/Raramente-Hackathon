import { resolve } from '@/services/apiClient'
import { familyMembers, familySimilarities } from '@/mocks/case9104'
import type { FamilyMember, FamilySimilarity } from '@/types/domain'

export async function getFamilyMembers(_caseId: string): Promise<FamilyMember[]> {
  return resolve(() => familyMembers)
}

export async function getFamilySimilarities(_caseId: string): Promise<FamilySimilarity[]> {
  return resolve(() => familySimilarities)
}
