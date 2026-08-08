/**
 * Real IBGE reference data for Brazil's 27 states: codarea matches the
 * `codarea` property in public/maps/brazil-states.json (real IBGE malha,
 * fetched via servicodados.ibge.gov.br/api/v3/malhas), and population is
 * the 2022 Census figure (servicodados.ibge.gov.br/api/v3/agregados/9514),
 * both live-verified during development — see docs/rarity-map/README.md.
 *
 * journeysAccompanied / complexJourneys / prioritized / ruptures are DEMO
 * DATA — QuaTiRare has no real assistencial backend yet (see the Data
 * Sources health panel). They're kept plausible and internally consistent,
 * not fabricated to look like real epidemiology.
 */
export interface BrazilUf {
  codarea: string
  uf: string
  name: string
  region: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul'
  population: number
  journeysAccompanied: number
  complexJourneys: number
  prioritized: number
  ruptures: number
}

export const brazilUfs: BrazilUf[] = [
  { codarea: '11', uf: 'RO', name: 'Rondônia', region: 'Norte', population: 1581196, journeysAccompanied: 890, complexJourneys: 17, prioritized: 4, ruptures: 6 },
  { codarea: '12', uf: 'AC', name: 'Acre', region: 'Norte', population: 830018, journeysAccompanied: 310, complexJourneys: 6, prioritized: 1, ruptures: 2 },
  { codarea: '13', uf: 'AM', name: 'Amazonas', region: 'Norte', population: 3941613, journeysAccompanied: 2140, complexJourneys: 48, prioritized: 11, ruptures: 14 },
  { codarea: '14', uf: 'RR', name: 'Roraima', region: 'Norte', population: 636707, journeysAccompanied: 412, complexJourneys: 9, prioritized: 2, ruptures: 3 },
  { codarea: '15', uf: 'PA', name: 'Pará', region: 'Norte', population: 8120131, journeysAccompanied: 3320, complexJourneys: 71, prioritized: 18, ruptures: 22 },
  { codarea: '16', uf: 'AP', name: 'Amapá', region: 'Norte', population: 733759, journeysAccompanied: 388, complexJourneys: 7, prioritized: 1, ruptures: 2 },
  { codarea: '17', uf: 'TO', name: 'Tocantins', region: 'Norte', population: 1511460, journeysAccompanied: 720, complexJourneys: 14, prioritized: 3, ruptures: 5 },
  { codarea: '21', uf: 'MA', name: 'Maranhão', region: 'Nordeste', population: 6776699, journeysAccompanied: 2680, complexJourneys: 62, prioritized: 15, ruptures: 19 },
  { codarea: '22', uf: 'PI', name: 'Piauí', region: 'Nordeste', population: 3271199, journeysAccompanied: 1560, complexJourneys: 33, prioritized: 9, ruptures: 11 },
  { codarea: '23', uf: 'CE', name: 'Ceará', region: 'Nordeste', population: 8794957, journeysAccompanied: 3910, complexJourneys: 89, prioritized: 24, ruptures: 26 },
  { codarea: '24', uf: 'RN', name: 'Rio Grande do Norte', region: 'Nordeste', population: 3302729, journeysAccompanied: 1420, complexJourneys: 31, prioritized: 8, ruptures: 9 },
  { codarea: '25', uf: 'PB', name: 'Paraíba', region: 'Nordeste', population: 3974687, journeysAccompanied: 1680, complexJourneys: 36, prioritized: 10, ruptures: 12 },
  { codarea: '26', uf: 'PE', name: 'Pernambuco', region: 'Nordeste', population: 9058931, journeysAccompanied: 4210, complexJourneys: 96, prioritized: 27, ruptures: 30 },
  { codarea: '27', uf: 'AL', name: 'Alagoas', region: 'Nordeste', population: 3127683, journeysAccompanied: 1180, complexJourneys: 24, prioritized: 6, ruptures: 8 },
  { codarea: '28', uf: 'SE', name: 'Sergipe', region: 'Nordeste', population: 2210004, journeysAccompanied: 690, complexJourneys: 13, prioritized: 3, ruptures: 4 },
  { codarea: '29', uf: 'BA', name: 'Bahia', region: 'Nordeste', population: 14141626, journeysAccompanied: 5680, complexJourneys: 128, prioritized: 34, ruptures: 41 },
  { codarea: '31', uf: 'MG', name: 'Minas Gerais', region: 'Sudeste', population: 20539989, journeysAccompanied: 6720, complexJourneys: 151, prioritized: 39, ruptures: 47 },
  { codarea: '32', uf: 'ES', name: 'Espírito Santo', region: 'Sudeste', population: 3833712, journeysAccompanied: 1290, complexJourneys: 27, prioritized: 7, ruptures: 9 },
  { codarea: '33', uf: 'RJ', name: 'Rio de Janeiro', region: 'Sudeste', population: 16055174, journeysAccompanied: 7340, complexJourneys: 166, prioritized: 43, ruptures: 49 },
  { codarea: '35', uf: 'SP', name: 'São Paulo', region: 'Sudeste', population: 44411238, journeysAccompanied: 12481, complexJourneys: 348, prioritized: 41, ruptures: 52 },
  { codarea: '41', uf: 'PR', name: 'Paraná', region: 'Sul', population: 11444380, journeysAccompanied: 3980, complexJourneys: 87, prioritized: 22, ruptures: 26 },
  { codarea: '42', uf: 'SC', name: 'Santa Catarina', region: 'Sul', population: 7610361, journeysAccompanied: 2210, complexJourneys: 46, prioritized: 12, ruptures: 14 },
  { codarea: '43', uf: 'RS', name: 'Rio Grande do Sul', region: 'Sul', population: 10882965, journeysAccompanied: 3560, complexJourneys: 78, prioritized: 20, ruptures: 23 },
  { codarea: '50', uf: 'MS', name: 'Mato Grosso do Sul', region: 'Centro-Oeste', population: 2757013, journeysAccompanied: 980, complexJourneys: 19, prioritized: 5, ruptures: 6 },
  { codarea: '51', uf: 'MT', name: 'Mato Grosso', region: 'Centro-Oeste', population: 3658649, journeysAccompanied: 1340, complexJourneys: 28, prioritized: 7, ruptures: 8 },
  { codarea: '52', uf: 'GO', name: 'Goiás', region: 'Centro-Oeste', population: 7056495, journeysAccompanied: 2340, complexJourneys: 51, prioritized: 13, ruptures: 16 },
  { codarea: '53', uf: 'DF', name: 'Distrito Federal', region: 'Centro-Oeste', population: 2817381, journeysAccompanied: 1610, complexJourneys: 38, prioritized: 10, ruptures: 9 },
]

export const ufByCodarea = new Map(brazilUfs.map((u) => [u.codarea, u]))
export const ufBySigla = new Map(brazilUfs.map((u) => [u.uf, u]))
