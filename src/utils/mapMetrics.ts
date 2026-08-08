export type MapMetric = 'complexJourneys' | 'prioritized' | 'referenceCenters' | 'rarasRecords' | 'selectedPhenotypes' | 'ruptures'
export type ValueMode = 'absolute' | 'per100k' | 'percentAnalyzed'

export const MAP_METRIC_LABEL: Record<MapMetric, string> = {
  complexJourneys: 'Jornadas complexas',
  prioritized: 'Jornadas para revisão',
  referenceCenters: 'Centros de referência',
  rarasRecords: 'Registros RARAS',
  selectedPhenotypes: 'Fenótipos selecionados',
  ruptures: 'Rupturas assistenciais',
}

/** Metrics without a geography-indexed source yet — shown, but honestly empty rather than fabricated. */
export const MAP_METRIC_UNAVAILABLE: Record<MapMetric, boolean> = {
  complexJourneys: false,
  prioritized: false,
  referenceCenters: false,
  rarasRecords: true,
  selectedPhenotypes: true,
  ruptures: false,
}

export const MAP_METRIC_SOURCE: Record<MapMetric, string> = {
  complexJourneys: 'QuaTiRare · DEMO DATA',
  prioritized: 'QuaTiRare · DEMO DATA',
  referenceCenters: 'Raras Knowledge Graph · amostra por doença',
  rarasRecords: 'Sem fonte geográfica conectada',
  selectedPhenotypes: 'Sem fonte geográfica conectada',
  ruptures: 'QuaTiRare · DEMO DATA',
}

export const VALUE_MODE_LABEL: Record<ValueMode, string> = {
  absolute: 'Absoluto',
  per100k: 'Por 100 mil habitantes',
  percentAnalyzed: '% das jornadas analisadas',
}

export function normalizeValue(value: number, mode: ValueMode, population: number, totalAnalyzed: number): number {
  if (mode === 'absolute') return value
  if (mode === 'per100k') return population > 0 ? (value / population) * 100000 : 0
  return totalAnalyzed > 0 ? (value / totalAnalyzed) * 100 : 0
}

export function formatValue(value: number, mode: ValueMode): string {
  if (mode === 'percentAnalyzed') return `${value.toFixed(1)}%`
  if (mode === 'per100k') return value.toFixed(1)
  return value.toLocaleString('pt-BR')
}
