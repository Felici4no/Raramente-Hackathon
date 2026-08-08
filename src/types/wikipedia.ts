/**
 * Wikipedia is treated as a CONTEXTUAL / ENCYCLOPEDIC source — never as
 * clinical evidence. RARAS/HPO remain the primary investigative layer;
 * everything here exists to answer "what is this condition, in plain
 * language" and "what does the encyclopedia say", each clearly labeled and
 * separated from structured phenotype data.
 */

export type WikipediaLanguage = 'pt' | 'en'

export type MatchMethod =
  | 'EXACT_TITLE'
  | 'REDIRECT'
  | 'ALIAS'
  | 'SEARCH_MATCH'
  | 'MANUAL'
  | 'NO_MATCH'

export interface WikipediaMatch {
  diseaseId: string
  wikipediaTitle: string | null
  wikipediaLanguage: WikipediaLanguage | null
  wikipediaPageId: number | null
  wikidataId: string | null
  matchMethod: MatchMethod
  matchConfidence: number
  matchedAt: string
}

export interface WikipediaSummary {
  title: string
  pageId: number
  language: WikipediaLanguage
  extract: string
  thumbnailUrl: string | null
  wikidataId: string | null
  url: string
}

export interface WikipediaSection {
  index: string
  title: string
  level: number
}

export interface WikipediaSectionContent {
  section: WikipediaSection
  sanitizedHtml: string
}

/** Attached to every piece of Wikipedia-derived content shown in the UI. */
export interface WikipediaProvenance {
  source: 'Wikipedia'
  sourceType: 'CONTEXTUAL'
  language: WikipediaLanguage
  pageTitle: string
  pageId: number
  wikidataId: string | null
  retrievedAt: string
  url: string
}
