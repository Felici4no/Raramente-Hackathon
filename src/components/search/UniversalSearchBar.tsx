import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useDiseaseSearch, usePhenotypeSearch } from '@/hooks/useRarasData'
import { useQuery } from '@tanstack/react-query'
import { searchPapersSemantic } from '@/services/raras/rarasRealService'
import { Tag } from '@/components/ui/Tag'
import styles from './UniversalSearchBar.module.css'

const CASE_MATCHES = ['9104', 'lia']
const PROTOCOL_MATCHES = ['p04', 'protocolo']

export function UniversalSearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const debounced = useDebouncedValue(query, 350)
  const wrapRef = useRef<HTMLDivElement>(null)

  const diseases = useDiseaseSearch(debounced, 5)
  const phenotypes = usePhenotypeSearch(debounced, 5)
  const papers = useQuery({
    queryKey: ['raras-search-papers', debounced],
    queryFn: () => searchPapersSemantic(debounced, 3),
    enabled: debounced.trim().length >= 4,
    staleTime: 10 * 60 * 1000,
  })

  const lower = debounced.toLowerCase().trim()
  const caseMatch = lower.length > 0 && CASE_MATCHES.some((m) => m.includes(lower) || lower.includes(m))
  const protocolMatch = lower.length > 0 && PROTOCOL_MATCHES.some((m) => m.includes(lower) || lower.includes(m))

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const hasResults =
    (diseases.data?.data.length ?? 0) > 0 ||
    (phenotypes.data?.data.length ?? 0) > 0 ||
    (papers.data?.data.length ?? 0) > 0 ||
    caseMatch ||
    protocolMatch

  function go(to: string) {
    setOpen(false)
    setQuery('')
    navigate(to)
  }

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.inputRow}>
        <span className={styles.icon} aria-hidden="true">
          ⌕
        </span>
        <input
          className={styles.input}
          type="text"
          autoFocus={autoFocus}
          placeholder="Buscar doença, ORPHA, MONDO, HPO, gene, caso ou protocolo…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && debounced.trim().length >= 2 && (
        <div className={styles.dropdown}>
          {!hasResults && <p className={styles.empty}>Nenhum resultado ainda para “{debounced}”.</p>}

          {caseMatch && (
            <div className={styles.group}>
              <p className={styles.groupLabel}>CASO</p>
              <button className={styles.result} onClick={() => go('/case/9104')}>
                <Tag tone="blue" size="sm">
                  CASO
                </Tag>
                <span>História #9104 — Lia, 7a</span>
              </button>
            </div>
          )}

          {protocolMatch && (
            <div className={styles.group}>
              <p className={styles.groupLabel}>PROTOCOLO</p>
              <button className={styles.result} onClick={() => go('/case/9104/report')}>
                <Tag tone="terracotta" size="sm">
                  PROTOCOLO
                </Tag>
                <span>Protocolo P04 — Investigação de atraso motor</span>
              </button>
            </div>
          )}

          {(diseases.data?.data.length ?? 0) > 0 && (
            <div className={styles.group}>
              <p className={styles.groupLabel}>DOENÇA {diseases.data?.isMock && '· demo'}</p>
              {diseases.data!.data.map((d) => (
                <button key={d.orphaCode} className={styles.result} onClick={() => go(`/compare?orpha=${d.orphaCode}`)}>
                  <Tag tone="green" size="sm">
                    DOENÇA
                  </Tag>
                  <span>
                    {d.name} <span className="mono">ORPHA:{d.orphaCode}</span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {(phenotypes.data?.data.length ?? 0) > 0 && (
            <div className={styles.group}>
              <p className={styles.groupLabel}>FENÓTIPO {phenotypes.data?.isMock && '· demo'}</p>
              {phenotypes.data!.data.map((p) => (
                <button key={p.hpoId} className={styles.result} onClick={() => go(`/auto-research?hpo=${p.hpoId}`)}>
                  <Tag tone="amber" size="sm">
                    FENÓTIPO
                  </Tag>
                  <span>
                    {p.label} <span className="mono">{p.hpoId}</span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {(papers.data?.data.length ?? 0) > 0 && (
            <div className={styles.group}>
              <p className={styles.groupLabel}>PAPER {papers.data?.isMock && '· demo'}</p>
              {papers.data!.data.map((p) => (
                <a key={p.title} className={styles.resultLink} href={p.url} target="_blank" rel="noreferrer noopener">
                  <Tag tone="neutral" size="sm">
                    PAPER
                  </Tag>
                  <span>{p.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
