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

/** Used only when the live raras.org MCP call fails — always paired with isMock: true in the UI. */

export const fallbackSearchDiseases: RarasDiseaseSummary[] = [
  { name: 'Distrofia muscular, tipo Duchenne', orphaCode: '98896', mondoCode: '0010679', cid10: 'G71.0', prevalence: 'Rara (1-9 em 100.000)', susCoverage: true, activeTrials: 129 },
  { name: 'Distrofia muscular de Duchenne e Becker', orphaCode: '262', mondoCode: '0016899', prevalence: 'Muito rara (1-9 em 1.000.000)', susCoverage: false },
  { name: 'Atrofia muscular espinhal', orphaCode: '83330', prevalence: 'Rara (1-9 em 100.000)', susCoverage: true, activeTrials: 42 },
]

export const fallbackDiseaseDetail: RarasDiseaseDetail = {
  name: 'Distrofia muscular, tipo Duchenne',
  orphaCode: '98896',
  mondoCode: '0010679',
  omimCode: '310200',
  cid10: 'G71.0',
  prevalence: 'Rara (1-9 em 100.000)',
  inheritance: 'X-linked recessive',
  description: 'Doença neuromuscular caracterizada por fraqueza e perda de massa muscular progressivas.',
  phenotypes: [
    { hpoId: 'HP:0003701', label: 'Fraqueza muscular proximal', frequency: 'Muito frequente (99-80%)' },
    { hpoId: 'HP:0001270', label: 'Atraso motor', frequency: 'Muito frequente (99-80%)' },
    { hpoId: 'HP:0003236', label: 'Concentração elevada de creatina quinase circulante', frequency: 'Muito frequente (99-80%)' },
  ],
  genes: [{ symbol: 'DMD', hgnc: '2928' }],
  susCeafMeds: 0,
  susTrialsActive: 129,
}

export const fallbackSearchPhenotypes: RarasPhenotypeSearchResult[] = [
  { hpoId: 'HP:0001270', label: 'Atraso motor' },
  { hpoId: 'HP:0002275', label: 'Coordenação motora pobre' },
]

export const fallbackDiseaseCandidates: RarasDiseaseCandidate[] = [
  { name: 'Distrofia muscular de cinturas', orphaCode: '34515', matchedCount: 3, totalCount: 4, matchPercent: 75, matchedPhenotypeLabels: ['Atraso motor', 'Fraqueza muscular proximal', 'Concentração elevada de creatina quinase'] },
  { name: 'Doença de Charcot-Marie-Tooth', orphaCode: '64748', matchedCount: 2, totalCount: 4, matchPercent: 50, matchedPhenotypeLabels: ['Atraso motor', 'Fraqueza distal'] },
]

export const fallbackReferenceCenters: RarasReferenceCenter[] = [
  { name: 'Hospital das Clínicas (HCFMUSP)', city: 'São Paulo', uf: 'SP' },
  { name: 'HU-UFAL - Genética Clínica', city: 'Maceió', uf: 'AL' },
]

export const fallbackSusCoverage = (diseaseName: string): RarasSusCoverage => ({
  diseaseName,
  integration: 'Cobertura mínima',
  ceafMeds: 0,
  sigtapProcedures: 2,
})

export const fallbackTrials: RarasTrialsResult = { hasTrials: false, summary: 'Dados de demonstração — nenhum ensaio simulado.' }

export const fallbackPapers: RarasPaper[] = [
  { title: 'A novel mouse model of Duchenne muscular dystrophy carrying a multi-exonic Dmd deletion', journal: 'Disease Models & Mechanisms', year: '2020', similarity: 0.93 },
]

export const fallbackGraphStats: RarasGraphStats = { diseases: 10468, phenotypes: 11652, genes: 5571, trials: 2793 }

export const fallbackEvidence = (orphaCode: string, name: string): RarasEvidence => ({
  orphaCode,
  name,
  xrefs: { orphanet: `https://www.orpha.net/en/disease/detail/${orphaCode}` },
  verificationStatus: 'não verificado (dados de demonstração)',
  pubmedIds: [],
})
