import { resolve } from '@/services/apiClient'
import { caseSummary, graphEdges, graphNodes } from '@/mocks/case9104'
import { rawJourneyEvents } from '@/mocks/raw/journeyRaw'
import { fromRawJourneyEvents } from '@/adapters/journeyAdapter'
import type { CaseGraphEdge, CaseGraphNode, CaseSummary, JourneyEvent } from '@/types/domain'

export async function getCaseSummary(_caseId: string): Promise<CaseSummary> {
  return resolve(() => caseSummary)
}

export async function getJourneyEvents(_caseId: string): Promise<JourneyEvent[]> {
  return resolve(() => fromRawJourneyEvents(rawJourneyEvents))
}

export async function getGraph(_caseId: string): Promise<{ nodes: CaseGraphNode[]; edges: CaseGraphEdge[] }> {
  return resolve(() => ({ nodes: graphNodes, edges: graphEdges }))
}
