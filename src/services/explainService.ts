import { resolve } from '@/services/apiClient'
import { evidenceCards, explainability } from '@/mocks/case9104'
import type { EvidenceCardData, ExplainabilityData } from '@/types/domain'

export async function getExplainability(_caseId: string): Promise<ExplainabilityData> {
  return resolve(() => explainability)
}

export async function getEvidenceCards(_caseId: string): Promise<EvidenceCardData[]> {
  return resolve(() => evidenceCards)
}
