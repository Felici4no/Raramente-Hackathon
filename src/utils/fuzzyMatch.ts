/**
 * The live Raras API returns canonical short HPO labels (e.g. "Atraso
 * motor"), while case phenotype descriptions are often longer clinical
 * phrasing ("Atraso motor / marcha independente ausente"). Exact string
 * equality misses these, so match on shared significant words instead.
 */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s]/g, ' ')
}

export function fuzzyLabelMatch(a: string, b: string): boolean {
  const na = normalize(a)
  const nb = normalize(b)
  if (na === nb) return true
  const wordsA = new Set(na.split(/\s+/).filter((w) => w.length >= 4))
  const wordsB = nb.split(/\s+/).filter((w) => w.length >= 4)
  return wordsB.some((w) => wordsA.has(w))
}
