/**
 * Schematic tile-grid cartogram of Brazil's 27 states — not a precise
 * geographic projection, but a legible, editorial approximation (col/row on
 * a grid) commonly used for state-level dashboards. journeysAccompanied /
 * complexJourneys / prioritized / ruptures are DEMO DATA — QuaTiRare has no
 * real backend yet in this prototype (see Data Sources health panel).
 */
export interface BrazilUf {
  uf: string
  name: string
  region: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul'
  col: number
  row: number
  journeysAccompanied: number
  complexJourneys: number
  prioritized: number
  ruptures: number
}

export const brazilUfs: BrazilUf[] = [
  { uf: 'RR', name: 'Roraima', region: 'Norte', col: 2, row: 0, journeysAccompanied: 412, complexJourneys: 9, prioritized: 2, ruptures: 3 },
  { uf: 'AP', name: 'Amapá', region: 'Norte', col: 3, row: 0, journeysAccompanied: 388, complexJourneys: 7, prioritized: 1, ruptures: 2 },
  { uf: 'AM', name: 'Amazonas', region: 'Norte', col: 1, row: 1, journeysAccompanied: 2140, complexJourneys: 48, prioritized: 11, ruptures: 14 },
  { uf: 'PA', name: 'Pará', region: 'Norte', col: 3, row: 1, journeysAccompanied: 3320, complexJourneys: 71, prioritized: 18, ruptures: 22 },
  { uf: 'MA', name: 'Maranhão', region: 'Nordeste', col: 4, row: 1, journeysAccompanied: 2680, complexJourneys: 62, prioritized: 15, ruptures: 19 },
  { uf: 'CE', name: 'Ceará', region: 'Nordeste', col: 5, row: 1, journeysAccompanied: 3910, complexJourneys: 89, prioritized: 24, ruptures: 26 },
  { uf: 'RN', name: 'Rio Grande do Norte', region: 'Nordeste', col: 6, row: 1, journeysAccompanied: 1420, complexJourneys: 31, prioritized: 8, ruptures: 9 },
  { uf: 'AC', name: 'Acre', region: 'Norte', col: 0, row: 2, journeysAccompanied: 310, complexJourneys: 6, prioritized: 1, ruptures: 2 },
  { uf: 'RO', name: 'Rondônia', region: 'Norte', col: 1, row: 2, journeysAccompanied: 890, complexJourneys: 17, prioritized: 4, ruptures: 6 },
  { uf: 'TO', name: 'Tocantins', region: 'Norte', col: 3, row: 2, journeysAccompanied: 720, complexJourneys: 14, prioritized: 3, ruptures: 5 },
  { uf: 'PI', name: 'Piauí', region: 'Nordeste', col: 4, row: 2, journeysAccompanied: 1560, complexJourneys: 33, prioritized: 9, ruptures: 11 },
  { uf: 'PE', name: 'Pernambuco', region: 'Nordeste', col: 5, row: 2, journeysAccompanied: 4210, complexJourneys: 96, prioritized: 27, ruptures: 30 },
  { uf: 'PB', name: 'Paraíba', region: 'Nordeste', col: 6, row: 2, journeysAccompanied: 1680, complexJourneys: 36, prioritized: 10, ruptures: 12 },
  { uf: 'MT', name: 'Mato Grosso', region: 'Centro-Oeste', col: 2, row: 3, journeysAccompanied: 1340, complexJourneys: 28, prioritized: 7, ruptures: 8 },
  { uf: 'BA', name: 'Bahia', region: 'Nordeste', col: 4, row: 3, journeysAccompanied: 5680, complexJourneys: 128, prioritized: 34, ruptures: 41 },
  { uf: 'AL', name: 'Alagoas', region: 'Nordeste', col: 6, row: 3, journeysAccompanied: 1180, complexJourneys: 24, prioritized: 6, ruptures: 8 },
  { uf: 'MS', name: 'Mato Grosso do Sul', region: 'Centro-Oeste', col: 2, row: 4, journeysAccompanied: 980, complexJourneys: 19, prioritized: 5, ruptures: 6 },
  { uf: 'GO', name: 'Goiás', region: 'Centro-Oeste', col: 3, row: 4, journeysAccompanied: 2340, complexJourneys: 51, prioritized: 13, ruptures: 16 },
  { uf: 'DF', name: 'Distrito Federal', region: 'Centro-Oeste', col: 4, row: 4, journeysAccompanied: 1610, complexJourneys: 38, prioritized: 10, ruptures: 9 },
  { uf: 'SE', name: 'Sergipe', region: 'Nordeste', col: 6, row: 4, journeysAccompanied: 690, complexJourneys: 13, prioritized: 3, ruptures: 4 },
  { uf: 'SP', name: 'São Paulo', region: 'Sudeste', col: 3, row: 5, journeysAccompanied: 12481, complexJourneys: 348, prioritized: 41, ruptures: 52 },
  { uf: 'MG', name: 'Minas Gerais', region: 'Sudeste', col: 4, row: 5, journeysAccompanied: 6720, complexJourneys: 151, prioritized: 39, ruptures: 47 },
  { uf: 'ES', name: 'Espírito Santo', region: 'Sudeste', col: 5, row: 5, journeysAccompanied: 1290, complexJourneys: 27, prioritized: 7, ruptures: 9 },
  { uf: 'RJ', name: 'Rio de Janeiro', region: 'Sudeste', col: 4, row: 6, journeysAccompanied: 7340, complexJourneys: 166, prioritized: 43, ruptures: 49 },
  { uf: 'PR', name: 'Paraná', region: 'Sul', col: 3, row: 6, journeysAccompanied: 3980, complexJourneys: 87, prioritized: 22, ruptures: 26 },
  { uf: 'SC', name: 'Santa Catarina', region: 'Sul', col: 3, row: 7, journeysAccompanied: 2210, complexJourneys: 46, prioritized: 12, ruptures: 14 },
  { uf: 'RS', name: 'Rio Grande do Sul', region: 'Sul', col: 3, row: 8, journeysAccompanied: 3560, complexJourneys: 78, prioritized: 20, ruptures: 23 },
]
