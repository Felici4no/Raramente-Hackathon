import type { WikipediaMatch } from '@/types/wikipedia'
import { FactCard } from '@/components/cards/FactCard'
import styles from './WikipediaFactCard.module.css'

export function WikipediaFactCard({ match, isLoading }: { match: WikipediaMatch | undefined; isLoading: boolean }) {
  if (isLoading) {
    return (
      <FactCard label="Wikipedia" source="Wikipedia">
        <p className={styles.muted}>Buscando página correspondente…</p>
      </FactCard>
    )
  }

  if (!match || match.matchMethod === 'NO_MATCH') {
    return (
      <FactCard label="Wikipedia" source="Wikipedia">
        <p className={styles.muted}>Nenhuma página confiável encontrada.</p>
      </FactCard>
    )
  }

  return (
    <FactCard label="Wikipedia" title={match.wikipediaTitle ?? undefined} source="Wikipedia">
      <div className={styles.rows}>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Página encontrada</span>
          <span>{match.wikipediaTitle}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Match</span>
          <span className="mono">
            {match.matchMethod} · {Math.round(match.matchConfidence * 100)}%
          </span>
        </div>
        {match.wikidataId && (
          <div className={styles.row}>
            <span className={styles.rowLabel}>Wikidata</span>
            <span className="mono">{match.wikidataId}</span>
          </div>
        )}
      </div>
    </FactCard>
  )
}
