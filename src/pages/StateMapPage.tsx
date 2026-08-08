import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMunicipalitiesList, useMunicipalityBoundaries } from '@/hooks/useIbgeGeo'
import { useReferenceCenters } from '@/hooks/useRarasData'
import { ufBySigla } from '@/mocks/brazilUf'
import { deriveMunicipalityMetrics } from '@/utils/municipalityMetrics'
import { BrazilChoropleth } from '@/components/map/BrazilChoropleth'
import { MapLegend } from '@/components/map/MapLegend'
import { MapTooltip } from '@/components/map/MapTooltip'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'
import { LoadingState } from '@/components/ui/LoadingState'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { EntityLink } from '@/components/entity/EntityLink'
import type { ExportRow } from '@/utils/exportCsv'
import styles from './StateMapPage.module.css'

export function StateMapPage() {
  const { uf } = useParams<{ uf: string }>()
  const navigate = useNavigate()
  const ufData = uf ? ufBySigla.get(uf.toUpperCase()) : undefined
  const [hoveredIbge, setHoveredIbge] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)

  const boundaries = useMunicipalityBoundaries(ufData?.codarea ?? null)
  const municipalities = useMunicipalitiesList(uf ?? null)
  // find_reference_centers doesn't reliably filter server-side by uf (see docs/raras-mcp-tools),
  // so the full sample is fetched once and filtered client-side by the UF's real `uf` field.
  const centersAll = useReferenceCenters('98896')
  const centers = useMemo(
    () => ({ ...centersAll, data: centersAll.data ? { ...centersAll.data, data: centersAll.data.data.filter((c) => c.uf === ufData?.uf) } : undefined }),
    [centersAll, ufData?.uf],
  )

  const metricsById = useMemo(() => {
    const out: Record<string, ReturnType<typeof deriveMunicipalityMetrics>> = {}
    for (const m of municipalities.data ?? []) out[String(m.id)] = deriveMunicipalityMetrics(m.id)
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [municipalities.data])

  const valueById = useMemo(() => {
    const out: Record<string, number> = {}
    for (const [id, m] of Object.entries(metricsById)) out[id] = m.complexJourneys
    return out
  }, [metricsById])

  const maxValue = Math.max(1, ...Object.values(valueById))

  const topMunicipalities = useMemo(
    () =>
      (municipalities.data ?? [])
        .map((m) => ({ ...m, metrics: metricsById[String(m.id)] }))
        .sort((a, b) => (b.metrics?.complexJourneys ?? 0) - (a.metrics?.complexJourneys ?? 0))
        .slice(0, 8),
    [municipalities.data, metricsById],
  )

  const hoveredMuni = hoveredIbge ? municipalities.data?.find((m) => String(m.id) === hoveredIbge) : null
  const hoveredMetrics = hoveredIbge ? metricsById[hoveredIbge] : null

  const exportRows: ExportRow[] = (municipalities.data ?? []).map((m) => {
    const met = metricsById[String(m.id)]
    return {
      entity_id: String(m.id),
      entity_type: 'MUNICIPIO',
      label: m.nome,
      value: met?.complexJourneys ?? 0,
      source: 'QuaTiRare · DEMO DATA',
      source_id: `${uf}:${m.id}`,
      verification_status: 'demo',
      retrieved_at: new Date().toISOString(),
    }
  })

  if (!ufData) {
    return (
      <Panel raised padded>
        <p>UF “{uf}” não reconhecida.</p>
      </Panel>
    )
  }

  return (
    <div className={styles.page}>
      <p className={styles.breadcrumb}>
        <Link to="/research/map">Brasil</Link> / {ufData.name}
      </p>
      <SectionHeading
        eyebrow="Atlas Territorial"
        title={ufData.name}
        subtitle={`${ufData.region} · população 2022: ${ufData.population.toLocaleString('pt-BR')}`}
        actions={<ExportCsvButton filename={`rarity-map-${ufData.uf}.csv`} rows={exportRows} />}
      />

      <div className={styles.layout}>
        <div className={styles.mapCol}>
          <p className="eyebrow" style={{ marginBottom: 8 }}>
            Mapa municipal — cor representa: jornadas complexas (demo)
          </p>
          {boundaries.isLoading ? (
            <LoadingState label={`Carregando malha municipal de ${ufData.uf}…`} />
          ) : boundaries.data ? (
            <>
              <div className={styles.mapFrame}>
                <BrazilChoropleth
                  geography={boundaries.data}
                  idProperty="codarea"
                  valueById={valueById}
                  maxValue={maxValue}
                  selectedId={hoveredIbge}
                  onHover={(id, e) => {
                    setHoveredIbge(id)
                    setTooltipPos(id && e ? { x: e.clientX, y: e.clientY } : null)
                  }}
                  onSelect={(ibge) => navigate(`/research/map/${ufData.uf}/${ibge}`)}
                />
              </div>
              <MapLegend />
              {hoveredMuni && tooltipPos && (
                <MapTooltip
                  x={tooltipPos.x}
                  y={tooltipPos.y}
                  title={hoveredMuni.nome}
                  rows={[
                    { label: 'Jornadas complexas', value: String(hoveredMetrics?.complexJourneys ?? 0) },
                    { label: 'Total analisado', value: String(hoveredMetrics?.journeysAccompanied ?? 0) },
                    { label: 'Código IBGE', value: String(hoveredMuni.id) },
                  ]}
                />
              )}
            </>
          ) : (
            <p className={styles.muted}>Não foi possível carregar a malha municipal.</p>
          )}
        </div>

        <Panel raised className={styles.sidebar}>
          <p className="eyebrow">{ufData.name} — visão geral</p>
          <div className={styles.statGrid}>
            <div className={styles.stat}>
              <span className={`${styles.statValue} mono`}>{municipalities.data?.length ?? '—'}</span>
              <span className={styles.statLabel}>Municípios</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} mono`}>{ufData.journeysAccompanied.toLocaleString('pt-BR')}</span>
              <span className={styles.statLabel}>Jornadas</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} mono`}>{ufData.complexJourneys}</span>
              <span className={styles.statLabel}>Complexas</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} mono`}>{ufData.prioritized}</span>
              <span className={styles.statLabel}>Para revisão</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} mono`}>{centers.data?.data.length ?? 0}</span>
              <span className={styles.statLabel}>Centros (amostra)</span>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHead}>
              <p className="eyebrow">Top municípios</p>
              <DataSourceBadge isMock />
            </div>
            <ul className={styles.list}>
              {topMunicipalities.map((m) => (
                <li key={m.id}>
                  <EntityLink entity={{ type: 'MUNICIPALITY', id: `${ufData.uf}:${m.id}`, label: m.nome, source: 'QuaTiRare · DEMO DATA', identifiers: { ibge: String(m.id), uf: ufData.uf } }} />
                  <span className="mono"> {m.metrics?.complexJourneys ?? 0}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHead}>
              <p className="eyebrow">Centros de referência</p>
              {centers.data && <DataSourceBadge isMock={centers.data.isMock} />}
            </div>
            <ul className={styles.list}>
              {(centers.data?.data ?? []).slice(0, 6).map((c) => (
                <li key={c.name}>
                  <EntityLink entity={{ type: 'REFERENCE_CENTER', id: c.cnes ?? c.name, label: c.name, sublabel: c.city, source: 'Raras Knowledge Graph', identifiers: { cnes: c.cnes, uf: c.uf } }} />
                </li>
              ))}
              {(centers.data?.data.length ?? 0) === 0 && <li className={styles.muted}>Nenhum centro na amostra atual.</li>}
            </ul>
          </div>

          <div className={styles.section}>
            <p className="eyebrow">Fontes</p>
            <p className={styles.muted}>IBGE (malha territorial) · QuaTiRare (demo) · Raras Knowledge Graph (centros, amostra)</p>
          </div>
        </Panel>
      </div>
    </div>
  )
}
