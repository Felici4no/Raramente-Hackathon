import { Link, useParams } from 'react-router-dom'
import { useMunicipalitiesList } from '@/hooks/useIbgeGeo'
import { ufBySigla } from '@/mocks/brazilUf'
import { deriveMunicipalityMetrics } from '@/utils/municipalityMetrics'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'
import { LoadingState } from '@/components/ui/LoadingState'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import { DataSourceBadge } from '@/components/provenance/DataSourceBadge'
import { EvidenceCard } from '@/components/cards/EvidenceCard'
import type { ExportRow } from '@/utils/exportCsv'
import type { EvidenceCardData } from '@/types/domain'
import styles from './MunicipalityReportPage.module.css'

export function MunicipalityReportPage() {
  const { uf, ibgeCode } = useParams<{ uf: string; ibgeCode: string }>()
  const ufData = uf ? ufBySigla.get(uf.toUpperCase()) : undefined
  const municipalities = useMunicipalitiesList(uf ?? null)
  const municipality = municipalities.data?.find((m) => String(m.id) === ibgeCode)
  const metrics = ibgeCode ? deriveMunicipalityMetrics(Number(ibgeCode)) : null

  if (!ufData) {
    return (
      <Panel raised padded>
        <p>UF "{uf}" não reconhecida.</p>
      </Panel>
    )
  }

  if (municipalities.isLoading) return <LoadingState label="Carregando município…" />

  const name = municipality?.nome ?? `Município ${ibgeCode}`
  const retrievedAt = new Date().toISOString()

  const exportRows: ExportRow[] = metrics
    ? [
        { entity_id: ibgeCode ?? '', entity_type: 'MUNICIPIO_METRICA', label: 'Jornadas analisadas', value: metrics.journeysAccompanied, source: 'QuaTiRare · DEMO DATA', source_id: ibgeCode, verification_status: 'demo', retrieved_at: retrievedAt },
        { entity_id: ibgeCode ?? '', entity_type: 'MUNICIPIO_METRICA', label: 'Jornadas complexas', value: metrics.complexJourneys, source: 'QuaTiRare · DEMO DATA', source_id: ibgeCode, verification_status: 'demo', retrieved_at: retrievedAt },
        { entity_id: ibgeCode ?? '', entity_type: 'MUNICIPIO_METRICA', label: 'Para revisão', value: metrics.prioritized, source: 'QuaTiRare · DEMO DATA', source_id: ibgeCode, verification_status: 'demo', retrieved_at: retrievedAt },
        { entity_id: ibgeCode ?? '', entity_type: 'MUNICIPIO_METRICA', label: 'Rupturas', value: metrics.ruptures, source: 'QuaTiRare · DEMO DATA', source_id: ibgeCode, verification_status: 'demo', retrieved_at: retrievedAt },
        { entity_id: ibgeCode ?? '', entity_type: 'MUNICIPIO_METRICA', label: 'Centros de referência', value: metrics.referenceCenters, source: 'QuaTiRare · DEMO DATA', source_id: ibgeCode, verification_status: 'demo', retrieved_at: retrievedAt },
      ]
    : []

  const evidenceCards: EvidenceCardData[] = metrics
    ? [
        {
          id: 'ev-journeys',
          category: 'TERRITORIO',
          title: 'Volume de jornadas analisadas',
          currentValue: `${metrics.journeysAccompanied} jornadas`,
          interpretation: 'Total de jornadas agregadas para este município na amostra atual.',
          status: 'pendente',
          provenance: { source: 'QuaTiRare Journey API', date: retrievedAt, status: 'pendente', explanation: 'Dado de demonstração — sem backend assistencial real conectado por município.' },
        },
        {
          id: 'ev-complex',
          category: 'ALERTA',
          title: 'Jornadas complexas',
          currentValue: `${metrics.complexJourneys} jornadas`,
          interpretation: 'Jornadas com múltiplos retornos, especialidades ou tempo prolongado sem resolução.',
          threshold: 'Classificação demonstrativa',
          status: 'pendente',
          provenance: { source: 'QuaTiRare Journey API', date: retrievedAt, status: 'pendente', explanation: 'Derivado de forma determinística para fins de demonstração.' },
        },
        {
          id: 'ev-ruptures',
          category: 'EVENTO',
          title: 'Rupturas assistenciais',
          currentValue: `${metrics.ruptures} registros`,
          interpretation: 'Interrupções de cuidado acima do limiar de 90 dias, agregadas no município.',
          status: 'pendente',
          provenance: { source: 'QuaTiRare Journey API', date: retrievedAt, status: 'pendente', explanation: 'Dado de demonstração.' },
        },
        {
          id: 'ev-centers',
          category: 'SERVICO',
          title: 'Centros de referência (amostra)',
          currentValue: `${metrics.referenceCenters} centros`,
          interpretation: 'Contagem de centros de referência associados a uma doença amostral (Distrofia Muscular de Duchenne) neste município.',
          status: metrics.referenceCenters > 0 ? 'verificado' : 'pendente',
          provenance: { source: 'Raras Knowledge Graph', date: retrievedAt, status: metrics.referenceCenters > 0 ? 'verificado' : 'pendente', explanation: 'Amostra por doença, não é levantamento exaustivo de centros no município.' },
        },
      ]
    : []

  return (
    <div className={styles.page}>
      <p className={styles.breadcrumb}>
        <Link to="/research/map">Brasil</Link> / <Link to={`/research/map/${ufData.uf}`}>{ufData.name}</Link> / {name}
      </p>
      <SectionHeading
        eyebrow="Territory Report"
        title={`${name} — ${ufData.uf}`}
        subtitle="Dados agregados por município — nunca localização residencial individual."
        actions={<ExportCsvButton filename={`territory-report-${uf}-${ibgeCode}.csv`} rows={exportRows} />}
      />

      <div className={styles.badges}>
        <Tag tone="neutral">Código IBGE: {ibgeCode}</Tag>
        <Tag tone="neutral">{ufData.name}</Tag>
        <DataSourceBadge isMock />
      </div>

      {metrics && (
        <div className={styles.cardGrid}>
          <Panel raised padded>
            <p className="eyebrow">Jornadas analisadas</p>
            <p className={styles.bigValue}>{metrics.journeysAccompanied}</p>
          </Panel>
          <Panel raised padded>
            <p className="eyebrow">Jornadas complexas</p>
            <p className={styles.bigValue}>{metrics.complexJourneys}</p>
          </Panel>
          <Panel raised padded>
            <p className="eyebrow">Para revisão</p>
            <p className={styles.bigValue}>{metrics.prioritized}</p>
          </Panel>
          <Panel raised padded>
            <p className="eyebrow">Tempo médio de resolução</p>
            <p className={styles.bigValue}>{14 + (metrics.ruptures % 20)}m</p>
          </Panel>
          <Panel raised padded>
            <p className="eyebrow">Rupturas</p>
            <p className={styles.bigValue}>{metrics.ruptures}</p>
          </Panel>
          <Panel raised padded>
            <p className="eyebrow">Centros de referência</p>
            <p className={styles.bigValue}>{metrics.referenceCenters}</p>
          </Panel>
        </div>
      )}

      <section>
        <SectionHeading eyebrow="Mural territorial" title="Evidence Wall — Território" subtitle="Cada card mantém proveniência própria, agregada por município." />
        <div className={styles.evidenceGrid}>
          {evidenceCards.map((e) => (
            <EvidenceCard key={e.id} evidence={e} />
          ))}
        </div>
      </section>

      <Panel raised padded>
        <p className="eyebrow">Nota metodológica</p>
        <p className={styles.note}>
          Este relatório mostra apenas dados agregados por município — nenhuma localização residencial individual é
          exibida em nenhum momento. Métricas de jornada são de demonstração (QuaTiRare); centros de referência
          vêm de uma amostra real da Raras Knowledge Graph para uma única doença de referência.
        </p>
      </Panel>
    </div>
  )
}
