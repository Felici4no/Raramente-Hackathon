import type { WikipediaMatch, WikipediaSummary } from '@/types/wikipedia'
import { MATCH_METHOD_LABEL } from './wikipediaMeta'
import { WikipediaSourceBadge } from './WikipediaSourceBadge'
import styles from './WikipediaProvenancePanel.module.css'

interface WikipediaProvenancePanelProps {
  match: WikipediaMatch
  summary?: WikipediaSummary | null
}

export function WikipediaProvenancePanel({ match, summary }: WikipediaProvenancePanelProps) {
  return (
    <div className={styles.panel}>
      <WikipediaSourceBadge />
      <dl className={styles.fields}>
        <div className={styles.field}>
          <dt>Título da página</dt>
          <dd>{match.wikipediaTitle ?? '—'}</dd>
        </div>
        <div className={styles.field}>
          <dt>Idioma</dt>
          <dd>{match.wikipediaLanguage === 'pt' ? 'Português (pt.wikipedia.org)' : match.wikipediaLanguage === 'en' ? 'Inglês (en.wikipedia.org)' : '—'}</dd>
        </div>
        <div className={styles.field}>
          <dt>Page ID</dt>
          <dd className="mono">{match.wikipediaPageId ?? '—'}</dd>
        </div>
        <div className={styles.field}>
          <dt>Wikidata ID</dt>
          <dd className="mono">{match.wikidataId ?? 'não disponível'}</dd>
        </div>
        <div className={styles.field}>
          <dt>Método de correspondência</dt>
          <dd>
            {MATCH_METHOD_LABEL[match.matchMethod]} · {Math.round(match.matchConfidence * 100)}%
          </dd>
        </div>
        <div className={styles.field}>
          <dt>Última consulta</dt>
          <dd className="mono">{new Date(match.matchedAt).toLocaleString('pt-BR')}</dd>
        </div>
      </dl>
      {summary?.url && (
        <a className={styles.link} href={summary.url} target="_blank" rel="noreferrer noopener">
          Abrir página na Wikipedia ↗
        </a>
      )}
    </div>
  )
}
