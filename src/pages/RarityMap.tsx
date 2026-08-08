import { useMemo, useState } from 'react'
import { brazilUfs } from '@/mocks/brazilUf'
import { useReferenceCenters } from '@/hooks/useRarasData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import { BrazilTileMap } from '@/components/map/BrazilTileMap'
import type { ExportRow } from '@/utils/exportCsv'
import styles from './RarityMap.module.css'

type Layer = 'jornadas' | 'centros'

const SAMPLE_DISEASES = [
  { orphaCode: '98896', name: 'Distrofia muscular, tipo Duchenne' },
  { orphaCode: '83418', name: 'Atrofia muscular espinhal proximal tipo 2' },
]

export function RarityMap() {
  const [layer, setLayer] = useState<Layer>('jornadas')
  const [sampleDisease, setSampleDisease] = useState(SAMPLE_DISEASES[0].orphaCode)
  const [selectedUf, setSelectedUf] = useState<string | null>(null)

  const centers = useReferenceCenters(layer === 'centros' ? sampleDisease : null)

  const centersByUf = useMemo(() => {
    const map: Record<string, number> = {}
    for (const c of centers.data?.data ?? []) {
      if (!c.uf) continue
      map[c.uf] = (map[c.uf] ?? 0) + 1
    }
    return map
  }, [centers.data])

  const journeysByUf = useMemo(() => Object.fromEntries(brazilUfs.map((u) => [u.uf, u.journeysAccompanied])), [])

  const valueByUf = layer === 'jornadas' ? journeysByUf : centersByUf
  const activeUf = brazilUfs.find((u) => u.uf === selectedUf)
  const centersForSelected = (centers.data?.data ?? []).filter((c) => c.uf === selectedUf)

  const totalJourneys = brazilUfs.reduce((sum, u) => sum + u.journeysAccompanied, 0)
  const totalComplex = brazilUfs.reduce((sum, u) => sum + u.complexJourneys, 0)
  const totalPrioritized = brazilUfs.reduce((sum, u) => sum + u.prioritized, 0)

  const exportRows: ExportRow[] = brazilUfs.map((u) => ({
    entity_id: u.uf,
    entity_type: 'TERRITORIO_UF',
    label: u.name,
    value: layer === 'jornadas' ? u.journeysAccompanied : (centersByUf[u.uf] ?? 0),
    source: layer === 'jornadas' ? 'QuaTiRare (demo)' : 'Raras · find_reference_centers',
    source_id: u.uf,
    verification_status: layer === 'jornadas' ? 'demo' : centers.data?.isMock ? 'demo' : 'verificado',
    retrieved_at: centers.data?.retrievedAt ?? new Date().toISOString(),
  }))

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Atlas territorial"
        title="Rarity Map"
        subtitle="Cartograma esquemático do Brasil — sem localização individual de pessoas."
        actions={<ExportCsvButton filename="rarity-map.csv" rows={exportRows} />}
      />

      <div className={styles.layout}>
        <Panel raised className={styles.filtersCol}>
          <p className="eyebrow">Camadas</p>
          <div className={styles.layerToggle}>
            <button className={layer === 'jornadas' ? styles.layerActive : styles.layerBtn} onClick={() => setLayer('jornadas')}>
              Jornadas (QuaTiRare)
            </button>
            <button className={layer === 'centros' ? styles.layerActive : styles.layerBtn} onClick={() => setLayer('centros')}>
              Centros de referência
            </button>
          </div>

          {layer === 'jornadas' && (
            <p className={styles.layerNote}>
              <DataSourceBadge isMock /> Dados agregados de demonstração — sem backend assistencial real neste protótipo.
            </p>
          )}

          {layer === 'centros' && (
            <div className={styles.diseaseSelect}>
              <p className="eyebrow">Amostra real (Raras)</p>
              <select value={sampleDisease} onChange={(e) => setSampleDisease(e.target.value)} className={styles.select}>
                {SAMPLE_DISEASES.map((d) => (
                  <option key={d.orphaCode} value={d.orphaCode}>
                    {d.name}
                  </option>
                ))}
              </select>
              {centers.data && (
                <p className={styles.layerNote}>
                  <DataSourceBadge isMock={centers.data.isMock} /> {centers.data.data.length} centros retornados
                </p>
              )}
            </div>
          )}

          <div className={styles.ufJump}>
            <p className="eyebrow">Ir para UF</p>
            <select value={selectedUf ?? ''} onChange={(e) => setSelectedUf(e.target.value || null)} className={styles.select}>
              <option value="">Selecione…</option>
              {brazilUfs.map((u) => (
                <option key={u.uf} value={u.uf}>
                  {u.name} ({u.uf})
                </option>
              ))}
            </select>
          </div>

          <div className={styles.nationalStats}>
            <p className="eyebrow">Brasil — panorama</p>
            <p className={styles.natStat}>
              <span className="mono">{totalJourneys.toLocaleString('pt-BR')}</span> jornadas acompanhadas
            </p>
            <p className={styles.natStat}>
              <span className="mono">{totalComplex.toLocaleString('pt-BR')}</span> complexas
            </p>
            <p className={styles.natStat}>
              <span className="mono">{totalPrioritized.toLocaleString('pt-BR')}</span> sugeridas para revisão
            </p>
          </div>
        </Panel>

        <div className={styles.mapCol}>
          <BrazilTileMap
            valueByUf={valueByUf}
            selectedUf={selectedUf}
            onSelectUf={setSelectedUf}
            colorTone={layer === 'jornadas' ? 'blue' : 'terracotta'}
          />
        </div>

        <Panel raised className={styles.reportCol}>
          {!activeUf ? (
            <p className={styles.emptyReport}>Selecione um estado no mapa ou na lista para abrir o relatório territorial.</p>
          ) : (
            <>
              <p className="eyebrow">{activeUf.region}</p>
              <h3 className={styles.ufName}>{activeUf.name}</h3>
              <Tag tone="neutral" size="sm">
                {activeUf.uf}
              </Tag>

              <div className={styles.reportStats}>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{activeUf.journeysAccompanied.toLocaleString('pt-BR')}</span>
                  <span className={styles.reportLabel}>Jornadas acompanhadas</span>
                </div>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{activeUf.complexJourneys}</span>
                  <span className={styles.reportLabel}>Complexas</span>
                </div>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{activeUf.prioritized}</span>
                  <span className={styles.reportLabel}>Sugeridas para revisão</span>
                </div>
                <div className={styles.reportStat}>
                  <span className={`${styles.reportValue} mono`}>{activeUf.ruptures}</span>
                  <span className={styles.reportLabel}>Rupturas</span>
                </div>
              </div>

              <div className={styles.centersBlock}>
                <p className="eyebrow">Centros de referência (amostra Raras)</p>
                {centersForSelected.length > 0 ? (
                  <ul className={styles.centersList}>
                    {centersForSelected.map((c) => (
                      <li key={c.name}>{c.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.emptyCenters}>
                    {layer === 'centros' ? 'Nenhum centro na amostra atual para este estado.' : 'Troque para a camada “Centros de referência” para ver esta lista.'}
                  </p>
                )}
              </div>
            </>
          )}
        </Panel>
      </div>
    </div>
  )
}
