/**
 * Domain types shared across services, adapters, and components.
 * These shapes are designed to match what real APIs (QuaTiRare Journey,
 * Raras Knowledge Graph, HPO normalization, Territory Registry, Family
 * Network) would return, so mocks can be swapped for live calls without
 * touching consumers.
 */

export type SourceName =
  | 'QuaTiRare Journey API'
  | 'Raras Knowledge Graph'
  | 'HPO Normalization Service'
  | 'Territory Registry'
  | 'Family Network'
  | 'Nasua / Relato de Escuta'

export type VerificationStatus = 'relato' | 'pendente' | 'verificado'

export interface Provenance {
  source: SourceName
  sourceId?: string
  date: string
  status: VerificationStatus
  explanation: string
}

export type NodeType =
  | 'pessoa'
  | 'familiar'
  | 'servico'
  | 'evento'
  | 'fenotipo'
  | 'protocolo'
  | 'fonte'
  | 'sinal'

export interface CaseGraphNode {
  id: string
  type: NodeType
  label: string
  sublabel?: string
  description: string
  relevance: string
  provenance: Provenance
  meta?: Record<string, string | number>
}

export type EdgeType =
  | 'relatado_por'
  | 'relacionado_a'
  | 'percorrido_em'
  | 'confirmado_por'
  | 'associado_a'
  | 'similar_a'
  | 'originado_em'
  | 'gerou_protocolo'

export interface CaseGraphEdge {
  id: string
  source: string
  target: string
  type: EdgeType
  label: string
}

export type GraphMode = 'assistencial' | 'fenotipico' | 'familiar' | 'proveniencia'

export type TimelineCategory = 'assistencial' | 'familiar' | 'fenotipico' | 'protocolo' | 'revisao'

export type TimelineEventType =
  | 'escuta_inicial'
  | 'visita_acs'
  | 'retorno_ubs'
  | 'especialista'
  | 'exame'
  | 'encaminhamento'
  | 'ruptura'
  | 'confirmacao'
  | 'protocolo'
  | 'revisao'

export interface JourneyEvent {
  id: string
  date: string
  type: TimelineEventType
  category: TimelineCategory
  title: string
  description: string
  provenance: Provenance
}

export type EvidenceCategory =
  | 'EVENTO'
  | 'FENOTIPO'
  | 'FONTE'
  | 'PROTOCOLO'
  | 'FAMILIA'
  | 'TERRITORIO'
  | 'SERVICO'
  | 'ALERTA'
  | 'CONEXAO'

export interface EvidenceCardData {
  id: string
  category: EvidenceCategory
  title: string
  currentValue: string
  interpretation: string
  threshold?: string
  impact?: string
  falsifier?: string
  status: VerificationStatus
  provenance: Provenance
}

export interface PhenotypeNormalization {
  id: string
  originalReport: string
  normalizedTerm: string
  hpoId: string
  matchScore: number
  synonyms: string[]
  relatedDiseasesCount: number
  provenance: Provenance
}

export interface RelatedDisease {
  id: string
  name: string
  orphaCode?: string
  sharedPhenotypes: number
  note: string
}

export type ConsentStatus = 'autorizado' | 'pendente' | 'nao_informado'

export interface FamilyMember {
  id: string
  name: string
  relation: 'Mãe' | 'Pai' | 'Irmã(o)' | 'Avó/Avô' | 'Outro'
  consent: ConsentStatus
  journeyPercent: number
  protocolsCount: number
  newConnections: number
  pendingInfo: number
  sharedSignals: string[]
  provenance: Provenance
}

export interface FamilySimilarity {
  id: string
  members: string[]
  message: string
  sharedSignals: string[]
}

export interface TerritoryContextData {
  microarea: string
  ubs: string
  listeningOrigin: string
  journeysInRegion: number
  recurrentPatterns: string[]
  openMissions: number
  recentActions: { label: string; date: string }[]
  regionAverageEntanglement: number
  caseEntanglement: number
}

export type JourneyStatus = 'comum' | 'em_atencao' | 'atipica'

export interface CaseSummary {
  id: string
  patientName: string
  patientAge: number
  microarea: string
  listeningOrigin: string
  currentProtocol: string
  journeyStatus: JourneyStatus
  entanglementIndex: number
  reconstructedPercent: number
  servicesInvolved: number
  returns: number
  ruptures: number
  monthsUnresolved: number
  phenotypesNormalized: number
  familyConnections: number
}

export interface ExplainabilityFactor {
  id: string
  text: string
  weight: 'alto' | 'medio' | 'baixo'
}

export interface ExplainabilityData {
  headline: string
  contributingFactors: ExplainabilityFactor[]
  reportedOnly: string[]
  verified: string[]
  reinforcingConnections: string[]
  missingData: string[]
}

export interface ChartDatum {
  label: string
  value: number
  [key: string]: string | number
}

export interface SourceDescriptor {
  name: SourceName
  kind: 'API' | 'Registro' | 'Relato'
  description: string
  reliability: 'alta' | 'media' | 'variavel'
}
