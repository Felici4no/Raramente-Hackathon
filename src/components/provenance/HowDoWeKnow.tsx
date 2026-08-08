import { useState } from 'react'
import { DataSourceBadge } from './DataSourceBadge'
import styles from './HowDoWeKnow.module.css'

interface HowDoWeKnowProps {
  source: string
  sourceId?: string
  retrievedAt: string
  verificationStatus: string
  isMock: boolean
  links?: { label: string; url: string }[]
}

export function HowDoWeKnow({ source, sourceId, retrievedAt, verificationStatus, isMock, links }: HowDoWeKnowProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.wrap}>
      <button className={styles.trigger} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        Como sabemos disso?
      </button>
      {open && (
        <div className={styles.panel}>
          <div className={styles.row}>
            <DataSourceBadge isMock={isMock} />
          </div>
          <dl className={styles.fields}>
            <div className={styles.field}>
              <dt>Fonte</dt>
              <dd>{source}</dd>
            </div>
            {sourceId && (
              <div className={styles.field}>
                <dt>Identificador</dt>
                <dd className="mono">{sourceId}</dd>
              </div>
            )}
            <div className={styles.field}>
              <dt>Consultado em</dt>
              <dd className="mono">{new Date(retrievedAt).toLocaleString('pt-BR')}</dd>
            </div>
            <div className={styles.field}>
              <dt>Status de verificação</dt>
              <dd>{verificationStatus}</dd>
            </div>
          </dl>
          {links && links.length > 0 && (
            <ul className={styles.links}>
              {links.map((l) => (
                <li key={l.url}>
                  <a href={l.url} target="_blank" rel="noreferrer noopener">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
