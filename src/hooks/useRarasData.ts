import { useQuery } from '@tanstack/react-query'
import * as raras from '@/services/raras/rarasRealService'

const staleTime = 10 * 60 * 1000
const retry = 1

export function useDiseaseSearch(query: string, limit = 10) {
  return useQuery({
    queryKey: ['raras-search-diseases', query, limit],
    queryFn: () => raras.searchDiseases(query, limit),
    enabled: query.trim().length >= 2,
    staleTime,
    retry,
  })
}

export function useDiseaseDetail(orphaCode: string | null) {
  return useQuery({
    queryKey: ['raras-disease-detail', orphaCode],
    queryFn: () => raras.getDiseaseDetail(orphaCode as string),
    enabled: !!orphaCode,
    staleTime,
    retry,
  })
}

export function usePhenotypeSearch(query: string, limit = 10) {
  return useQuery({
    queryKey: ['raras-search-phenotypes', query, limit],
    queryFn: () => raras.searchPhenotypes(query, limit),
    enabled: query.trim().length >= 2,
    staleTime,
    retry,
  })
}

export function useDiseasesByPhenotypes(hpoIds: string[], limit = 10) {
  return useQuery({
    queryKey: ['raras-diseases-by-phenotypes', hpoIds, limit],
    queryFn: () => raras.findDiseasesByPhenotypes(hpoIds, limit),
    enabled: hpoIds.length > 0,
    staleTime,
    retry,
  })
}

export function useReferenceCenters(orphaCode: string | null, uf?: string) {
  return useQuery({
    queryKey: ['raras-reference-centers', orphaCode, uf],
    queryFn: () => raras.findReferenceCenters(orphaCode as string, uf),
    enabled: !!orphaCode,
    staleTime,
    retry,
  })
}

export function useSusCoverage(orphaCode: string | null, diseaseName: string) {
  return useQuery({
    queryKey: ['raras-sus-coverage', orphaCode],
    queryFn: () => raras.getSusCoverage(orphaCode as string, diseaseName),
    enabled: !!orphaCode,
    staleTime,
    retry,
  })
}

export function useActiveTrials(orphaCode: string | null) {
  return useQuery({
    queryKey: ['raras-active-trials', orphaCode],
    queryFn: () => raras.findActiveTrials(orphaCode as string),
    enabled: !!orphaCode,
    staleTime,
    retry,
  })
}

export function usePapersForDisease(orphaCode: string | null, limit = 5) {
  return useQuery({
    queryKey: ['raras-papers', orphaCode, limit],
    queryFn: () => raras.findPapersForDisease(orphaCode as string, limit),
    enabled: !!orphaCode,
    staleTime,
    retry,
  })
}

export function usePublicGraph() {
  return useQuery({
    queryKey: ['raras-public-graph'],
    queryFn: () => raras.getPublicGraph(),
    staleTime,
    retry,
  })
}

export function useGraphStats() {
  return useQuery({
    queryKey: ['raras-graph-stats'],
    queryFn: () => raras.getGraphStats(),
    staleTime,
    retry,
  })
}

export function useEvidence(orphaCode: string | null, diseaseName: string) {
  return useQuery({
    queryKey: ['raras-evidence', orphaCode],
    queryFn: () => raras.getEvidence(orphaCode as string, diseaseName),
    enabled: !!orphaCode,
    staleTime,
    retry,
  })
}
