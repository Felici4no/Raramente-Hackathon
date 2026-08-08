import { useQuery } from '@tanstack/react-query'
import * as journeyService from '@/services/journeyService'
import * as rarasService from '@/services/rarasService'
import * as hpoService from '@/services/hpoService'
import * as familyService from '@/services/familyService'
import * as territoryService from '@/services/territoryService'
import * as explainService from '@/services/explainService'

export function useCaseSummary(caseId: string) {
  return useQuery({ queryKey: ['case-summary', caseId], queryFn: () => journeyService.getCaseSummary(caseId) })
}

export function useJourneyEvents(caseId: string) {
  return useQuery({ queryKey: ['journey-events', caseId], queryFn: () => journeyService.getJourneyEvents(caseId) })
}

export function useCaseGraph(caseId: string) {
  return useQuery({ queryKey: ['case-graph', caseId], queryFn: () => journeyService.getGraph(caseId) })
}

export function usePhenotypes(caseId: string) {
  return useQuery({ queryKey: ['phenotypes', caseId], queryFn: () => hpoService.getPhenotypeNormalizations(caseId) })
}

export function useRelatedDiseases(phenotypeIds: string[]) {
  return useQuery({
    queryKey: ['related-diseases', phenotypeIds],
    queryFn: () => rarasService.getRelatedDiseases(phenotypeIds),
    enabled: phenotypeIds.length > 0,
  })
}

export function useFamilyMembers(caseId: string) {
  return useQuery({ queryKey: ['family-members', caseId], queryFn: () => familyService.getFamilyMembers(caseId) })
}

export function useFamilySimilarities(caseId: string) {
  return useQuery({ queryKey: ['family-similarities', caseId], queryFn: () => familyService.getFamilySimilarities(caseId) })
}

export function useTerritoryContext(caseId: string) {
  return useQuery({ queryKey: ['territory', caseId], queryFn: () => territoryService.getTerritoryContext(caseId) })
}

export function useExplainability(caseId: string) {
  return useQuery({ queryKey: ['explainability', caseId], queryFn: () => explainService.getExplainability(caseId) })
}

export function useEvidenceCards(caseId: string) {
  return useQuery({ queryKey: ['evidence-cards', caseId], queryFn: () => explainService.getEvidenceCards(caseId) })
}
