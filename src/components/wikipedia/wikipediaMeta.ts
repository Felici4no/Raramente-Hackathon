import type { MatchMethod } from '@/types/wikipedia'

export const MATCH_METHOD_LABEL: Record<MatchMethod, string> = {
  EXACT_TITLE: 'Título exato',
  REDIRECT: 'Redirecionamento',
  ALIAS: 'Sinônimo conhecido',
  SEARCH_MATCH: 'Correspondência por busca',
  MANUAL: 'Curadoria manual',
  NO_MATCH: 'Sem correspondência',
}

/** Below this, the UI flags the match for human review instead of presenting it as confirmed. */
export const REVIEW_CONFIDENCE_THRESHOLD = 0.6
