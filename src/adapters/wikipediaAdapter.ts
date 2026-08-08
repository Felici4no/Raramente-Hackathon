import DOMPurify from 'dompurify'
import {
  getPageSections,
  getPageSummary,
  getSectionHtml,
  pageUrl,
  searchWikipedia,
  type WikiSection,
} from '@/services/wikipediaService'
import type { MatchMethod, WikipediaLanguage, WikipediaMatch, WikipediaSummary } from '@/types/wikipedia'

const MEDICAL_TERMS = [
  'doença', 'doenca', 'síndrome', 'sindrome', 'distrofia', 'condição', 'condicao',
  'transtorno', 'deficiência', 'deficiencia', 'atrofia',
  'disease', 'syndrome', 'disorder', 'deficiency', 'condition',
]

function normalizeTitle(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Jaccard similarity over normalized words — good enough to catch "Distrofia muscular de Duchenne" vs "Distrofia muscular" without a full NLP stack. */
function titleSimilarity(a: string, b: string): number {
  const wordsA = new Set(normalizeTitle(a).split(' ').filter(Boolean))
  const wordsB = new Set(normalizeTitle(b).split(' ').filter(Boolean))
  if (wordsA.size === 0 || wordsB.size === 0) return 0
  const intersection = [...wordsA].filter((w) => wordsB.has(w)).length
  const union = new Set([...wordsA, ...wordsB]).size
  return intersection / union
}

function hasMedicalTerm(text: string): boolean {
  const n = normalizeTitle(text)
  return MEDICAL_TERMS.some((term) => n.includes(normalizeTitle(term)))
}

function clamp(n: number, min = 0, max = 0.99) {
  return Math.min(max, Math.max(min, n))
}

async function attemptLanguage(diseaseId: string, name: string, lang: WikipediaLanguage): Promise<WikipediaMatch | null> {
  const direct = await getPageSummary(name, lang)

  if (direct) {
    const isExact = normalizeTitle(direct.title) === normalizeTitle(name)
    const method: MatchMethod = direct.redirectedFrom ? 'REDIRECT' : isExact ? 'EXACT_TITLE' : 'SEARCH_MATCH'
    let confidence = method === 'EXACT_TITLE' ? 0.95 : method === 'REDIRECT' ? 0.88 : titleSimilarity(direct.title, name)
    confidence = clamp(confidence + (hasMedicalTerm(direct.extract) ? 0.03 : -0.05))
    return {
      diseaseId,
      wikipediaTitle: direct.title,
      wikipediaLanguage: lang,
      wikipediaPageId: direct.pageId,
      wikidataId: direct.wikidataId,
      matchMethod: method,
      matchConfidence: confidence,
      matchedAt: new Date().toISOString(),
    }
  }

  const results = await searchWikipedia(name, lang, 5)
  if (results.length === 0) return null

  // The search endpoint ranks by its own relevance score, which isn't
  // always the closest title match — e.g. searching "Distrofia muscular,
  // tipo Duchenne" can rank the generic "Distrofia muscular" article above
  // the specific "Distrofia muscular de Duchenne" one. Re-rank candidates
  // by title similarity to the disease name instead of trusting position 0.
  const ranked = results
    .map((r) => ({ result: r, similarity: titleSimilarity(r.title, name) }))
    .sort((a, b) => b.similarity - a.similarity)

  const { result: best, similarity } = ranked[0]
  if (similarity < 0.25) return null

  const summary = await getPageSummary(best.title, lang)
  if (!summary) return null

  const confidence = clamp(similarity * 0.9 + (hasMedicalTerm(summary.extract) || hasMedicalTerm(best.description ?? '') ? 0.1 : 0))

  return {
    diseaseId,
    wikipediaTitle: summary.title,
    wikipediaLanguage: lang,
    wikipediaPageId: summary.pageId,
    wikidataId: summary.wikidataId,
    matchMethod: 'SEARCH_MATCH',
    matchConfidence: confidence,
    matchedAt: new Date().toISOString(),
  }
}

const NO_MATCH = (diseaseId: string): WikipediaMatch => ({
  diseaseId,
  wikipediaTitle: null,
  wikipediaLanguage: null,
  wikipediaPageId: null,
  wikidataId: null,
  matchMethod: 'NO_MATCH',
  matchConfidence: 0,
  matchedAt: new Date().toISOString(),
})

const LOW_CONFIDENCE_THRESHOLD = 0.45

/**
 * Match order: canonical RARAS name in PT, then the same name in EN. RARAS'
 * MCP tools don't expose disease synonyms/aliases in structured form today,
 * so the ALIAS tier is defined in the type system but not reachable yet —
 * it's here for when that data becomes available, not silently faked.
 */
export async function matchDiseaseToWikipedia(diseaseId: string, name: string): Promise<WikipediaMatch> {
  const ptMatch = await attemptLanguage(diseaseId, name, 'pt')
  if (ptMatch && ptMatch.matchConfidence >= LOW_CONFIDENCE_THRESHOLD) return ptMatch

  const enMatch = await attemptLanguage(diseaseId, name, 'en')
  if (enMatch && (!ptMatch || enMatch.matchConfidence > ptMatch.matchConfidence)) {
    return enMatch.matchConfidence >= LOW_CONFIDENCE_THRESHOLD || !ptMatch ? enMatch : ptMatch
  }

  return ptMatch ?? NO_MATCH(diseaseId)
}

export async function fetchWikipediaSummary(match: WikipediaMatch): Promise<WikipediaSummary | null> {
  if (!match.wikipediaTitle || !match.wikipediaLanguage) return null
  const raw = await getPageSummary(match.wikipediaTitle, match.wikipediaLanguage)
  if (!raw) return null
  return {
    title: raw.title,
    pageId: raw.pageId,
    language: match.wikipediaLanguage,
    extract: raw.extract,
    thumbnailUrl: raw.thumbnailUrl,
    wikidataId: raw.wikidataId,
    url: pageUrl(raw.title, match.wikipediaLanguage),
  }
}

export async function fetchWikipediaSections(match: WikipediaMatch): Promise<WikiSection[]> {
  if (!match.wikipediaTitle || !match.wikipediaLanguage) return []
  return getPageSections(match.wikipediaTitle, match.wikipediaLanguage)
}

const SECTION_NAME_GROUPS: Record<string, { pt: string[]; en: string[] }> = {
  signs: {
    pt: ['sinais e sintomas', 'sintomas', 'características', 'manifestações'],
    en: ['signs and symptoms', 'symptoms', 'clinical features'],
  },
  diagnosis: { pt: ['diagnóstico'], en: ['diagnosis'] },
  treatment: { pt: ['tratamento'], en: ['treatment'] },
  epidemiology: { pt: ['epidemiologia'], en: ['epidemiology'] },
  causes: { pt: ['causas'], en: ['causes'] },
  genetics: { pt: ['genética', 'genetica'], en: ['genetics'] },
}

export function findSection(sections: WikiSection[], group: keyof typeof SECTION_NAME_GROUPS, lang: WikipediaLanguage): WikiSection | null {
  const candidates = SECTION_NAME_GROUPS[group][lang]
  for (const name of candidates) {
    const hit = sections.find((s) => normalizeTitle(s.line) === normalizeTitle(name))
    if (hit) return hit
  }
  for (const name of candidates) {
    const hit = sections.find((s) => normalizeTitle(s.line).includes(normalizeTitle(name)))
    if (hit) return hit
  }
  return null
}

export async function fetchSanitizedSectionHtml(match: WikipediaMatch, section: WikiSection): Promise<string> {
  if (!match.wikipediaTitle || !match.wikipediaLanguage) return ''
  const raw = await getSectionHtml(match.wikipediaTitle, section.index, match.wikipediaLanguage)
  return sanitizeWikipediaHtml(raw, match.wikipediaLanguage)
}

/** Strips edit-section links, reference superscripts, and infoboxes; rewrites relative links/images to absolute. Never trust raw MediaWiki HTML directly in the DOM. */
export function sanitizeWikipediaHtml(rawHtml: string, lang: WikipediaLanguage): string {
  const clean = DOMPurify.sanitize(rawHtml, { ADD_ATTR: ['target'] })
  if (typeof document === 'undefined') return clean

  const container = document.createElement('div')
  container.innerHTML = clean
  container.querySelectorAll('.mw-editsection, .mw-cite-backlink, sup.reference, .reference, table.infobox, .navbox, .hatnote, style, script').forEach((el) => el.remove())
  container.querySelectorAll('a[href^="/wiki/"]').forEach((a) => {
    const href = a.getAttribute('href')
    if (href) a.setAttribute('href', `https://${lang}.wikipedia.org${href}`)
    a.setAttribute('target', '_blank')
    a.setAttribute('rel', 'noreferrer noopener')
  })
  container.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src')
    if (src?.startsWith('//')) img.setAttribute('src', `https:${src}`)
  })
  return container.innerHTML
}
