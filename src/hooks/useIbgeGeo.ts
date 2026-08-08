import { useQuery } from '@tanstack/react-query'
import { fetchMunicipalitiesList, fetchMunicipalityBoundaries, fetchStateBoundaries } from '@/services/ibgeGeoService'

const staleTime = 24 * 60 * 60 * 1000

export function useStateBoundaries() {
  return useQuery({
    queryKey: ['ibge-state-boundaries'],
    queryFn: fetchStateBoundaries,
    staleTime,
    retry: 1,
  })
}

export function useMunicipalityBoundaries(ufCodarea: string | null) {
  return useQuery({
    queryKey: ['ibge-municipality-boundaries', ufCodarea],
    queryFn: () => fetchMunicipalityBoundaries(ufCodarea as string),
    enabled: !!ufCodarea,
    staleTime,
    retry: 1,
  })
}

export function useMunicipalitiesList(ufSigla: string | null) {
  return useQuery({
    queryKey: ['ibge-municipalities-list', ufSigla],
    queryFn: () => fetchMunicipalitiesList(ufSigla as string),
    enabled: !!ufSigla,
    staleTime,
    retry: 1,
  })
}
