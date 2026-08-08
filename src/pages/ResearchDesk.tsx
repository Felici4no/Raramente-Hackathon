import { Link } from 'react-router-dom'
import { UniversalSearchBar } from '@/components/search/UniversalSearchBar'
import { SourceHealthPanel } from '@/components/health/SourceHealthPanel'
import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { researchQueue } from '@/mocks/researchQueue'
import { useGraphStats } from '@/hooks/useRarasData'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import styles from './ResearchDesk.module.css'

const ACTIONS = [
  { label: 'Investigar caso', to: '/case/9104', tone: 'blue' as const },
  { label: 'Comparar doenças', to: '/compare', tone: 'green' as const },
  { label: 'Mapa da raridade', to: '/rarity-map', tone: 'terracotta' as const },
  { label: 'Explorar dados', to: '/data-explorer', tone: 'amber' as const },
]

export function ResearchDesk() {
  const stats = useGraphStats()

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className="eyebrow">QuaTiRare Research Desk</p>
        <h1 className={styles.title}>Inteligência investigativa para jornadas raras.</h1>
        <p className={styles.subtitle}>
          O que sabemos, como essas evidências se relacionam e o que merece ser investigado a seguir.
        </p>
        <UniversalSearchBar autoFocus />
        <div className={styles.actions}>
          {ACTIONS.map((a) => (
            <Link key={a.to} to={a.to} className={styles.actionBtn}>
              <span className={styles.actionDot} data-tone={a.tone} />
              {a.label}
            </Link>
          ))}
        </div>
      </section>

      <div className={styles.grid}>
        <Panel raised className={styles.col}>
          <SectionHeading eyebrow="Priorização territorial" title="Research Queue" />
          <ul className={styles.queueList}>
            {researchQueue.map((c) => {
              const content = (
                <>
                  <div className={styles.queueHead}>
                    <span className={styles.queueName}>
                      #{c.id} — {c.patientName}, {c.age}a
                    </span>
                    <Tag tone="terracotta" size="sm">
                      {c.entanglementIndex}/100
                    </Tag>
                  </div>
                  <p className={styles.queueMicro}>{c.microarea}</p>
                  <p className={styles.queueReason}>{c.reason}</p>
                </>
              )
              return c.id === '9104' ? (
                <li key={c.id}>
                  <Link to={`/case/${c.id}`} className={styles.queueItemLink}>
                    {content}
                  </Link>
                </li>
              ) : (
                <li key={c.id} className={styles.queueItemStatic}>
                  {content}
                </li>
              )
            })}
          </ul>
        </Panel>

        <Panel raised className={styles.col}>
          <SectionHeading eyebrow="Investigação assistida" title="Auto Research" />
          <p className={styles.blurb}>
            A partir dos fenótipos normalizados de um caso, o Auto Research cruza a base Raras em busca de
            candidatos investigativos — nunca um diagnóstico automático.
          </p>
          <Link to="/auto-research?case=9104" className={styles.ctaBtn}>
            Rodar Auto Research no caso #9104 →
          </Link>
        </Panel>

        <Panel raised className={styles.col}>
          <SectionHeading eyebrow="Atlas territorial" title="Rarity Map" />
          <p className={styles.blurb}>
            Centros de referência, jornadas acompanhadas e cobertura SUS agregados por estado — sem expor
            localização individual.
          </p>
          <div className={styles.statRow}>
            <div>
              <span className={`${styles.statValue} mono`}>{stats.data?.data.diseases.toLocaleString('pt-BR') ?? '—'}</span>
              <span className={styles.statLabel}>doenças no grafo</span>
            </div>
            {stats.data && <DataSourceBadge isMock={stats.data.isMock} />}
          </div>
          <Link to="/rarity-map" className={styles.ctaBtn}>
            Abrir mapa do Brasil →
          </Link>
        </Panel>
      </div>

      <Panel raised className={styles.sources}>
        <SourceHealthPanel />
      </Panel>
    </div>
  )
}
