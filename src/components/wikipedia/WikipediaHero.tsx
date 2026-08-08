import type { WikipediaMatch, WikipediaSummary } from '@/types/wikipedia'
import { WikipediaSourceBadge } from './WikipediaSourceBadge'
import { MatchConfidenceBadge } from './MatchConfidenceBadge'
import styles from './WikipediaHero.module.css'

interface WikipediaHeroProps {
  diseaseName: string
  match: WikipediaMatch | undefined
  summary: WikipediaSummary | null | undefined
  isLoading: boolean
}

export function WikipediaHero({ diseaseName, match, summary, isLoading }: WikipediaHeroProps) {
  return (
    <div className={styles.hero}>
      <div className={styles.left}>
        <p className="eyebrow">O que é?</p>
        <h2 className={styles.name}>{diseaseName}</h2>

        {isLoading && <p className={styles.loading}>Procurando página correspondente na Wikipedia…</p>}

        {!isLoading && match?.matchMethod === 'NO_MATCH' && (
          <p className={styles.noMatch}>Não encontramos uma página Wikipedia confiável para esta condição.</p>
        )}

        {!isLoading && match && match.matchMethod !== 'NO_MATCH' && summary && (
          <>
            <p className={styles.extract}>{summary.extract}</p>
            <div className={styles.badgeRow}>
              <WikipediaSourceBadge />
              <MatchConfidenceBadge match={match} />
            </div>
          </>
        )}

        <p className={styles.disclaimer}>Esta descrição é enciclopédica e não substitui informação clínica especializada.</p>
      </div>

      <div className={styles.right}>
        {summary?.thumbnailUrl ? (
          <img className={styles.image} src={summary.thumbnailUrl} alt={summary.title} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>
            <span aria-hidden="true">◈</span>
            <span className={styles.placeholderLabel}>Sem imagem disponível</span>
          </div>
        )}
      </div>
    </div>
  )
}
