import type { WikipediaMatch } from '@/types/wikipedia'
import { MATCH_METHOD_LABEL, REVIEW_CONFIDENCE_THRESHOLD } from './wikipediaMeta'
import styles from './MatchConfidenceBadge.module.css'

export function MatchConfidenceBadge({ match }: { match: WikipediaMatch }) {
  if (match.matchMethod === 'NO_MATCH') {
    return <span className={`${styles.pill} ${styles.none}`}>Sem correspondência Wikipedia</span>
  }

  const needsReview = match.matchConfidence < REVIEW_CONFIDENCE_THRESHOLD

  return (
    <span className={`${styles.pill} ${needsReview ? styles.review : styles.ok}`} title={`${Math.round(match.matchConfidence * 100)}% de confiança`}>
      {needsReview ? '⚠ Correspondência precisa de revisão' : `✓ ${MATCH_METHOD_LABEL[match.matchMethod]}`}
      <span className={`${styles.pct} mono`}>{Math.round(match.matchConfidence * 100)}%</span>
    </span>
  )
}
