/** Structured shapes parsed out of raras.org's live MCP tool responses. */

export interface RarasDiseaseSummary {
  name: string
  orphaCode: string
  mondoCode?: string
  cid10?: string
  prevalence?: string
  susCoverage: boolean
  activeTrials?: number
  url?: string
}

export interface RarasPhenotypeRef {
  hpoId: string
  label: string
  frequency?: string
}

export interface RarasGene {
  symbol: string
  hgnc?: string
}

export interface RarasDiseaseDetail {
  name: string
  orphaCode: string
  mondoCode?: string
  omimCode?: string
  cid10?: string
  prevalence?: string
  inheritance?: string
  description?: string
  phenotypes: RarasPhenotypeRef[]
  genes: RarasGene[]
  susCeafMeds?: number
  susTrialsActive?: number
  url?: string
}

export interface RarasPhenotypeSearchResult {
  hpoId: string
  label: string
}

export interface RarasDiseaseCandidate {
  name: string
  orphaCode: string
  matchedCount: number
  totalCount: number
  matchPercent: number
  matchedPhenotypeLabels: string[]
}

export interface RarasReferenceCenter {
  name: string
  city?: string
  uf?: string
  cnes?: string
}

export interface RarasSusCoverage {
  diseaseName: string
  integration: string
  ceafMeds: number
  sigtapProcedures: number
}

export interface RarasTrialsResult {
  hasTrials: boolean
  summary: string
}

export interface RarasPaper {
  title: string
  journal?: string
  year?: string
  similarity?: number
  url?: string
}

export interface RarasGraphStats {
  diseases: number
  phenotypes: number
  genes: number
  trials: number
}

export interface RarasEvidence {
  orphaCode: string
  name: string
  xrefs: Record<string, string>
  verificationStatus: string
  pubmedIds: string[]
}

export type SourceStatus = 'online' | 'offline' | 'checking' | 'mock'

export interface SourceHealth {
  name: string
  status: SourceStatus
  detail?: string
}
