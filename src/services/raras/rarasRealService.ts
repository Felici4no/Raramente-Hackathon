import { callMcpTool } from './rarasMcpClient'
import {
  parseActiveTrials,
  parseDiseaseDetail,
  parseDiseasesByPhenotypes,
  parseEvidence,
  parseGraphStats,
  parsePapersForDisease,
  parseReferenceCenters,
  parseSearchDiseases,
  parseSearchPhenotypes,
  parseSusCoverage,
} from './rarasParsers'
import * as fallback from '@/mocks/rarasFallback'
import type {
  RarasDiseaseCandidate,
  RarasDiseaseDetail,
  RarasDiseaseSummary,
  RarasEvidence,
  RarasGraphStats,
  RarasPaper,
  RarasPhenotypeSearchResult,
  RarasReferenceCenter,
  RarasSusCoverage,
  RarasTrialsResult,
} from '@/types/raras'

export interface RarasResult<T> {
  data: T
  isMock: boolean
  retrievedAt: string
}

async function withFallback<T>(live: () => Promise<T>, mock: T): Promise<RarasResult<T>> {
  const retrievedAt = new Date().toISOString()
  try {
    return { data: await live(), isMock: false, retrievedAt }
  } catch {
    return { data: mock, isMock: true, retrievedAt }
  }
}

export async function searchDiseases(query: string, limit = 10): Promise<RarasResult<RarasDiseaseSummary[]>> {
  return withFallback(async () => {
    const { text } = await callMcpTool('search_diseases', { query, limit })
    const parsed = parseSearchDiseases(text)
    if (parsed.length === 0 && text) throw new Error('empty')
    return parsed
  }, fallback.fallbackSearchDiseases)
}

export async function getDiseaseDetail(orphaCode: string): Promise<RarasResult<RarasDiseaseDetail>> {
  return withFallback(async () => {
    const { text } = await callMcpTool('get_disease_detail', { orphaCode })
    const parsed = parseDiseaseDetail(text, orphaCode)
    if (!parsed) throw new Error('unparseable')
    return parsed
  }, fallback.fallbackDiseaseDetail)
}

export async function searchPhenotypes(query: string, limit = 10): Promise<RarasResult<RarasPhenotypeSearchResult[]>> {
  return withFallback(async () => {
    const { text } = await callMcpTool('search_phenotypes', { query, limit })
    return parseSearchPhenotypes(text)
  }, fallback.fallbackSearchPhenotypes)
}

export async function findDiseasesByPhenotypes(hpoIds: string[], limit = 10): Promise<RarasResult<RarasDiseaseCandidate[]>> {
  return withFallback(async () => {
    const { text } = await callMcpTool('find_diseases_by_phenotypes', { hpo_ids: hpoIds, limit })
    const parsed = parseDiseasesByPhenotypes(text)
    if (parsed.length === 0 && text) throw new Error('empty')
    return parsed
  }, fallback.fallbackDiseaseCandidates)
}

export async function findReferenceCenters(orphaCode: string, uf?: string): Promise<RarasResult<RarasReferenceCenter[]>> {
  return withFallback(async () => {
    const { text } = await callMcpTool('find_reference_centers', { orpha_code: orphaCode, uf })
    return parseReferenceCenters(text)
  }, fallback.fallbackReferenceCenters)
}

export async function getSusCoverage(orphaCode: string, diseaseName: string): Promise<RarasResult<RarasSusCoverage>> {
  return withFallback(async () => {
    const { text } = await callMcpTool('get_sus_coverage', { orphaCode })
    return parseSusCoverage(text, diseaseName)
  }, fallback.fallbackSusCoverage(diseaseName))
}

export async function findActiveTrials(orphaCode: string): Promise<RarasResult<RarasTrialsResult>> {
  return withFallback(async () => {
    const { text } = await callMcpTool('find_active_trials', { orphaCode })
    return parseActiveTrials(text)
  }, fallback.fallbackTrials)
}

export async function findPapersForDisease(orphaCode: string, limit = 5): Promise<RarasResult<RarasPaper[]>> {
  return withFallback(async () => {
    const { text } = await callMcpTool('find_papers_for_disease', { orphaCode, limit })
    return parsePapersForDisease(text)
  }, fallback.fallbackPapers)
}

export async function searchPapersSemantic(query: string, limit = 5): Promise<RarasResult<RarasPaper[]>> {
  return withFallback(async () => {
    const { text } = await callMcpTool('search_papers_semantic', { query, limit })
    return parsePapersForDisease(text)
  }, fallback.fallbackPapers)
}

export async function getGraphStats(): Promise<RarasResult<RarasGraphStats>> {
  return withFallback(async () => {
    const { text } = await callMcpTool('get_graph_stats', {})
    return parseGraphStats(text)
  }, fallback.fallbackGraphStats)
}

export interface RarasGraphPublicNode {
  id: string
  type: string
  label: string
  connections: number
  extra?: string
}

export async function getPublicGraph(): Promise<RarasResult<RarasGraphPublicNode[]>> {
  return withFallback(async () => {
    const res = await fetch('/api/raras/graph/public')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const payload = (await res.json()) as { nodes: RarasGraphPublicNode[] }
    if (!Array.isArray(payload.nodes) || payload.nodes.length === 0) throw new Error('empty')
    return payload.nodes
  }, fallback.fallbackSearchDiseases.map((d) => ({ id: `disease:${d.orphaCode}`, type: 'disease', label: d.name, connections: d.activeTrials ?? 0, extra: d.prevalence })))
}

export async function getEvidence(orphaCode: string, diseaseName: string): Promise<RarasResult<RarasEvidence>> {
  return withFallback(async () => {
    const { text, structured } = await callMcpTool('get_evidence', { orphaCode })
    return parseEvidence(structured, text, orphaCode)
  }, fallback.fallbackEvidence(orphaCode, diseaseName))
}
