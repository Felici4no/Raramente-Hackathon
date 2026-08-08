import { useQuery } from '@tanstack/react-query'
import { checkAllSources } from '@/services/raras/rarasHealth'

export function useSourceHealth() {
  return useQuery({
    queryKey: ['source-health'],
    queryFn: checkAllSources,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    retry: 0,
  })
}
