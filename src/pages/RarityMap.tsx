import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useStateBoundaries } from '@/hooks/useIbgeGeo'
import { useReferenceCenters } from '@/hooks/useRarasData'
import { brazilUfs } from '@/mocks/brazilUf'
import { BrazilChoropleth } from '@/components/map/BrazilChoropleth'
import { MapLegend } from '@/components/map/MapLegend'
import { MapTooltip } from '@/components/map/MapTooltip'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'
import { LoadingState } from '@/components/ui/LoadingState'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import {
  MAP_METRIC_LABEL,
  MAP_METRIC_SOURCE,
  MAP_METRIC_UNAVAILABLE,
  VALUE_MODE_LABEL,
  formatValue,
  normalizeValue,
  type MapMetric,
  type ValueMode,
} from '@/utils/mapMetrics'
import type { ExportRow } from '@/utils/exportCsv'
import styles from './RarityMap.module.css'

const SAMPLE_DISEASE_ORPHA = '98896' // Distrofia muscular, tipo Duchenne — real sample for the "Centros" layer/metric

export function RarityMap() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const diseaseFilter = params.get('disease')

  const [metric, setMetric] = useState<MapMetric>('complexJourneys')
  const [valueMode, setValueMode] = useState<ValueMode>('absolute')
  const [showCentersLayer, setShowCentersLayer] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)

  const geo = useStateBoundaries()
  const centers = useReferenceCenters(SAMPLE_DISEASE_ORPHA)

  const centersByCodarea = useMemo(() => {
    const bySigla: Record<string, number> = {}
    for (const c of centers.data?.data ?? []) {
      if (!c.uf) continue
      bySigla[c.uf] = (bySigla[c.uf] ?? 0) + 1
    }
    const out: Record<string, number> = {}
    for (const u of brazilUfs) out[u.codarea] = bySigla[u.uf] ?? 0
    return out
  }, [centers.data])

  const totalAnalyzed = useMemo(() => brazilUfs.reduce((s, u) => s + u.journeysAccompanied, 0), [])

  function rawValue(uf: (typeof brazilUfs)[number]): number {
    switch (metric) {
      case 'complexJourneys':
        return uf.complexJourneys
      case 'prioritized':
        return uf.prioritized
      case 'ruptures':
        return uf.ruptures
      case 'referenceCenters':
        return centersByCodarea[uf.codarea] ?? 0
      default:
        return 0
    }
  }

  const valueByCodarea = useMemo(() => {
    const out: Record<string, number> = {}
    for (const u of brazilUfs) {
      out[u.codarea] = MAP_METRIC_UNAVAILABLE[metric] ? 0 : normalizeValue(rawValue(u), valueMode, u.population, totalAnalyzed)
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metric, valueMode, centersByCodarea, totalAnalyzed])

  const maxValue = Math.max(1, ...Object.values(valueByCodarea))
  const hoveredUf = hovered ? brazilUfs.find((u) => u.codarea === hovered) : null

  const totalComplex = brazilUfs.reduce((s, u) => s + u.complexJourneys, 0)
  const totalPrioritized = brazilUfs.reduce((s, u) => s + u.prioritized, 0)
  const totalCenters = Object.values(centersByCodarea).reduce((s, v) => s + v, 0)

  const exportRows: ExportRow[] = brazilUfs.map((u) => ({
    entity_id: u.uf,
    entity_type: 'UF',
    label: `${MAP_METRIC_LABEL[metric]} — ${u.name}`,
    value: formatValue(valueByCodarea[u.codarea] ?? 0, valueMode),
    source: MAP_METRIC_SOURCE[metric],
    source_id: u.codarea,
    verification_status: metric === 'referenceCenters' ? (centers.data?.isMock ? 'demo' : 'verificado') : 'demo',
    retrieved_at: centers.data?.retrievedAt ?? new Date().toISOString(),
  }))

  function handleHover(codarea: string | null, event?: React.MouseEvent) {
    setHovered(codarea)
    if (codarea && event) setTooltipPos({ x: event.clientX, y: event.clientY })
    else setTooltipPos(null)
  }

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Atlas territorial"
        title="Mapa da Raridade"
        subtitle="Explore a distribuição das evidências, jornadas e estruturas de cuidado disponíveis nas fontes conectadas."
        actions={<ExportCsvButton filename="rarity-map-brasil.csv" rows={exportRows} />}
      />

      {diseaseFilter && (
        <Panel raised className={styles.filterBanner}>
          <span className="eyebrow">Filtrado por doença</span>
          <Tag tone="blue">{diseaseFilter}</Tag>
          <button className={styles.clearFilter} onClick={() => navigate('/research/map')}>
            Remover filtro ✕
          </button>
        </Panel>
      )}

      <div className={styles.layout}>
        <Panel raised className={styles.controlsCol}>
          <div className={styles.controlGroup}>
            <p className="eyebrow">Métrica</p>
            <p className={styles.controlNote}>Cor representa: {MAP_METRIC_LABEL[metric]}</p>
            <div className={styles.metricList}>
              {(Object.keys(MAP_METRIC_LABEL) as MapMetric[]).map((m) => (
                <button key={m} className={metric === m ? styles.metricActive : styles.metricBtn} onClick={() => setMetric(m)}>
                  {MAP_METRIC_LABEL[m]}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <p className="eyebrow">Valor</p>
            <div className={styles.modeToggle}>
              {(Object.keys(VALUE_MODE_LABEL) as ValueMode[]).map((m) => (
                <button key={m} className={valueMode === m ? styles.modeActive : styles.modeBtn} onClick={() => setValueMode(m)}>
                  {VALUE_MODE_LABEL[m]}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.controlGroup}>
            <p className="eyebrow">Camadas</p>
            <label className={styles.layerToggle}>
              <input type="checkbox" checked disabled />
              Jornadas QuaTiRare (choropleth)
            </label>
            <label className={styles.layerToggle}>
              <input type="checkbox" checked={showCentersLayer} onChange={(e) => setShowCentersLayer(e.target.checked)} />
              Centros de referência (overlay)
            </label>
          </div>

          <div className={styles.controlGroup}>
            <p className="eyebrow">Brasil — panorama</p>
            <p className={styles.natStat}>
              <span className="mono">{totalAnalyzed.toLocaleString('pt-BR')}</span> jornadas analisadas
            </p>
            <p className={styles.natStat}>
              <span className="mono">{totalComplex.toLocaleString('pt-BR')}</span> complexas
            </p>
            <p className={styles.natStat}>
              <span className="mono">{totalPrioritized.toLocaleString('pt-BR')}</span> para revisão
            </p>
            <p className={styles.natStat}>
              <span className="mono">{totalCenters}</span> centros (amostra)
            </p>
          </div>
        </Panel>

        <div className={styles.mapCol}>
          {geo.isLoading ? (
            <LoadingState label="Carregando malha territorial do IBGE…" />
          ) : geo.data ? (
            <>
              {MAP_METRIC_UNAVAILABLE[metric] && (
                <p className={styles.unavailableNote}>
                  {MAP_METRIC_LABEL[metric]} ainda não tem fonte geográfica conectada — o mapa abaixo não representa
                  esta métrica até que uma fonte territorial esteja disponível.
                </p>
              )}
              <div className={styles.mapFrame}>
                <BrazilChoropleth
                  geography={geo.data}
                  idProperty="codarea"
                  valueById={valueByCodarea}
                  maxValue={maxValue}
                  selectedId={hovered}
                  markers={showCentersLayer ? brazilUfs.map((u) => ({ id: u.codarea, value: centersByCodarea[u.codarea] ?? 0, label: u.name })).filter((m) => m.value > 0) : undefined}
                  onHover={handleHover}
                  onSelect={(codarea) => {
                    const uf = brazilUfs.find((u) => u.codarea === codarea)
                    if (uf) navigate(`/research/map/${uf.uf}`)
                  }}
                />
              </div>
              <MapLegend />
              {hoveredUf && tooltipPos && (
                <MapTooltip
                  x={tooltipPos.x}
                  y={tooltipPos.y}
                  title={hoveredUf.name}
                  rows={[
                    { label: MAP_METRIC_LABEL[metric], value: formatValue(valueByCodarea[hoveredUf.codarea] ?? 0, valueMode) },
                    { label: 'Total analisado', value: hoveredUf.journeysAccompanied.toLocaleString('pt-BR') },
                    { label: 'Centros (amostra)', value: String(centersByCodarea[hoveredUf.codarea] ?? 0) },
                  ]}
                />
              )}
            </>
          ) : null}
        </div>

        <Panel raised className={styles.reportCol}>
          {!hoveredUf ? (
            <>
              <p className="eyebrow">Brasil</p>
              <h3 className={styles.panelTitle}>Panorama nacional</h3>
              <div className={styles.reportStats}>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{totalAnalyzed.toLocaleString('pt-BR')}</span>
                  <span className={styles.reportLabel}>Jornadas analisadas</span>
                </div>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{totalComplex.toLocaleString('pt-BR')}</span>
                  <span className={styles.reportLabel}>Complexas</span>
                </div>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{totalPrioritized.toLocaleString('pt-BR')}</span>
                  <span className={styles.reportLabel}>Para revisão</span>
                </div>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{totalCenters}</span>
                  <span className={styles.reportLabel}>Centros (amostra)</span>
                </div>
              </div>
              <p className={styles.hint}>Passe o mouse sobre um estado para pré-visualizar, ou clique para abrir o relatório territorial.</p>
            </>
          ) : (
            <>
              <p className="eyebrow">{hoveredUf.region}</p>
              <h3 className={styles.panelTitle}>{hoveredUf.name}</h3>
              <div className={styles.reportStats}>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{hoveredUf.journeysAccompanied.toLocaleString('pt-BR')}</span>
                  <span className={styles.reportLabel}>Jornadas analisadas</span>
                </div>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{hoveredUf.complexJourneys}</span>
                  <span className={styles.reportLabel}>Complexas</span>
                </div>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{hoveredUf.prioritized}</span>
                  <span className={styles.reportLabel}>Para revisão</span>
                </div>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{centersByCodarea[hoveredUf.codarea] ?? 0}</span>
                  <span className={styles.reportLabel}>Centros (amostra)</span>
                </div>
              </div>
              <p className={styles.hint}>Fonte: QuaTiRare + RARAS</p>
              <button className={styles.openBtn} onClick={() => navigate(`/research/map/${hoveredUf.uf}`)}>
                Abrir {hoveredUf.name} →
              </button>
            </>
          )}
        </Panel>
      </div>

      <Panel raised className={styles.footer}>
        <div className={styles.footerCol}>
          <p className="eyebrow">Geography</p>
          <p>IBGE — malhas territoriais (2022)</p>
        </div>
        <div className={styles.footerCol}>
          <p className="eyebrow">Data</p>
          <p>QuaTiRare / RARAS · {MAP_METRIC_SOURCE[metric]}</p>
        </div>
        <div className={styles.footerCol}>
          <p className="eyebrow">Metric</p>
          <p>{MAP_METRIC_LABEL[metric]}</p>
        </div>
        <div className={styles.footerCol}>
          <p className="eyebrow">Normalization</p>
          <p>{VALUE_MODE_LABEL[valueMode]}</p>
        </div>
        <div className={styles.footerCol}>
          <p className="eyebrow">Last updated</p>
          <p className="mono">{new Date().toLocaleDateString('pt-BR')}</p>
        </div>
        {centers.data && (
          <div className={styles.footerCol}>
            <DataSourceBadge isMock={centers.data.isMock} />
          </div>
        )}
      </Panel>
    </div>
  )
}
