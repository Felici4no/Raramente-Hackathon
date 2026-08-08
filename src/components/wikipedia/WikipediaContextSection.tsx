import type { WikipediaMatch } from '@/types/wikipedia'
import { useWikipediaSignsSection } from '@/hooks/useWikipedia'
import { WikipediaSourceBadge } from './WikipediaSourceBadge'
import styles from './WikipediaContextSection.module.css'

/** The Wikipedia half of "Sinais e Fenótipos" — kept visually and semantically apart from RARAS/HPO structured data. */
export function WikipediaContextSection({ match }: { match: WikipediaMatch }) {
  const { sectionsQuery, signsSection, contentQuery } = useWikipediaSignsSection(match)

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <p className={styles.label}>Texto contextual da Wikipedia</p>
        <WikipediaSourceBadge />
      </div>

      {sectionsQuery.isLoading && <p className={styles.muted}>Procurando seção de sinais e sintomas…</p>}

      {!sectionsQuery.isLoading && !signsSection && (
        <p className={styles.muted}>
          Esta página da Wikipedia não tem uma seção dedicada de sinais e sintomas — apenas o resumo introdutório
          mostrado acima está disponível.
        </p>
      )}

      {signsSection && contentQuery.isLoading && <p className={styles.muted}>Carregando “{signsSection.line}”…</p>}

      {signsSection && contentQuery.data && (
        <>
          <p className={styles.sectionTitle}>{signsSection.line}</p>
          {/* Sanitized via DOMPurify + DOM allowlist pruning in wikipediaAdapter — see sanitizeWikipediaHtml. */}
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: contentQuery.data }} />
        </>
      )}

      <p className={styles.disclaimer}>
        Texto enciclopédico, não estruturado — nunca convertido automaticamente em fenótipos HPO.
      </p>
    </div>
  )
}
