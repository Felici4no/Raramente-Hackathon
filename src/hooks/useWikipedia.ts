import { useQuery } from '@tanstack/react-query'
import {
  fetchSanitizedSectionHtml,
  fetchWikipediaSections,
  fetchWikipediaSummary,
  findSection,
  matchDiseaseToWikipedia,
} from '@/adapters/wikipediaAdapter'
import type { WikipediaMatch } from '@/types/wikipedia'
import type { WikiSection } from '@/services/wikipediaService'

/** Wikipedia rarely changes for a given condition — cache aggressively so it isn't refetched on every navigation. */
const staleTime = 24 * 60 * 60 * 1000

function cacheKey(match: WikipediaMatch | null | undefined, suffix: string) {
  if (!match?.wikipediaLanguage || !match?.wikipediaTitle) return ['wiki', 'none', suffix]
  return [`wiki:${match.wikipediaLanguage}:${match.wikipediaTitle}`, suffix]
}

export function useWikipediaMatch(diseaseId: string | null, name: string | null) {
  return useQuery({
    queryKey: ['wiki-match', diseaseId, name],
    queryFn: () => matchDiseaseToWikipedia(diseaseId as string, name as string),
    enabled: !!diseaseId && !!name,
    staleTime,
    retry: 0,
  })
}

export function useWikipediaSummary(match: WikipediaMatch | null | undefined) {
  return useQuery({
    queryKey: cacheKey(match, 'summary'),
    queryFn: () => fetchWikipediaSummary(match as WikipediaMatch),
    enabled: !!match?.wikipediaTitle,
    staleTime,
    retry: 0,
  })
}

export function useWikipediaSections(match: WikipediaMatch | null | undefined) {
  return useQuery({
    queryKey: cacheKey(match, 'sections'),
    queryFn: () => fetchWikipediaSections(match as WikipediaMatch),
    enabled: !!match?.wikipediaTitle,
    staleTime,
    retry: 0,
  })
}

/** Resolves the "signs and symptoms"-shaped section (by name, PT or EN) and fetches its sanitized HTML — or null if the article simply doesn't have one. */
export function useWikipediaSignsSection(match: WikipediaMatch | null | undefined) {
  const sections = useWikipediaSections(match)
  const signsSection: WikiSection | null =
    match?.wikipediaLanguage && sections.data ? findSection(sections.data, 'signs', match.wikipediaLanguage) : null

  const content = useQuery({
    queryKey: cacheKey(match, `section:${signsSection?.index ?? 'none'}`),
    queryFn: () => fetchSanitizedSectionHtml(match as WikipediaMatch, signsSection as WikiSection),
    enabled: !!match?.wikipediaTitle && !!signsSection,
    staleTime,
    retry: 0,
  })

  return { sectionsQuery: sections, signsSection, contentQuery: content }
}
