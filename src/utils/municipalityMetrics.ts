/**
 * QuaTiRare has no real per-municipality assistencial data yet (same
 * DEMO DATA boundary as the state-level numbers in mocks/brazilUf.ts).
 * This derives small, plausible, internally-consistent counts from the
 * municipality's IBGE code so the same municipality always shows the same
 * numbers across a session — a seeded generator, not live data.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export interface MunicipalityMetrics {
  journeysAccompanied: number
  complexJourneys: number
  prioritized: number
  ruptures: number
  referenceCenters: number
}

export function deriveMunicipalityMetrics(ibgeCode: number): MunicipalityMetrics {
  const r1 = seededRandom(ibgeCode)
  const r2 = seededRandom(ibgeCode * 7 + 3)
  const r3 = seededRandom(ibgeCode * 13 + 11)
  const r4 = seededRandom(ibgeCode * 19 + 17)

  const journeysAccompanied = Math.round(20 + r1 * 900)
  const complexJourneys = Math.round(journeysAccompanied * (0.015 + r2 * 0.04))
  const prioritized = Math.round(complexJourneys * (0.15 + r3 * 0.35))
  const ruptures = Math.round(complexJourneys * (0.2 + r4 * 0.4))
  const referenceCenters = r1 > 0.85 ? 2 : r1 > 0.55 ? 1 : 0

  return { journeysAccompanied, complexJourneys, prioritized, ruptures, referenceCenters }
}
