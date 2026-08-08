/**
 * Thin wrappers around the MediaWiki REST and Action APIs. Called directly
 * from the browser — unlike raras.org, Wikipedia sends permissive CORS
 * headers when `origin=*` is passed, so no same-origin proxy is needed.
 */

export interface WikiSearchPage {
  id: number
  key: string
  title: string
  excerpt: string
  description: string | null
  thumbnailUrl: string | null
}

export interface WikiPageSummaryRaw {
  pageId: number
  title: string
  extract: string
  thumbnailUrl: string | null
  wikidataId: string | null
  redirectedFrom: string | null
  missing: boolean
}

export interface WikiSection {
  index: string
  line: string
  level: number
}

function baseUrl(lang: 'pt' | 'en') {
  return `https://${lang}.wikipedia.org/w`
}

export async function searchWikipedia(query: string, lang: 'pt' | 'en', limit = 5): Promise<WikiSearchPage[]> {
  const url = `${baseUrl(lang)}/rest.php/v1/search/page?q=${encodeURIComponent(query)}&limit=${limit}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Wikipedia search HTTP ${res.status}`)
  const json = await res.json()
  return (json.pages ?? []).map((p: any) => ({
    id: p.id,
    key: p.key,
    title: p.title,
    excerpt: String(p.excerpt ?? '').replace(/<[^>]+>/g, ''),
    description: p.description ?? null,
    thumbnailUrl: p.thumbnail?.url ? `https:${p.thumbnail.url}` : null,
  }))
}

export async function getPageSummary(title: string, lang: 'pt' | 'en'): Promise<WikiPageSummaryRaw | null> {
  const params = new URLSearchParams({
    action: 'query',
    prop: 'extracts|pageimages|pageprops',
    exintro: '1',
    explaintext: '1',
    piprop: 'thumbnail',
    pithumbsize: '1000',
    titles: title,
    redirects: '1',
    format: 'json',
    formatversion: '2',
    origin: '*',
  })
  const res = await fetch(`${baseUrl(lang)}/api.php?${params}`)
  if (!res.ok) throw new Error(`Wikipedia summary HTTP ${res.status}`)
  const json = await res.json()
  const page = json.query?.pages?.[0]
  if (!page || page.missing) return null
  const redirectedFrom: string | null = json.query?.redirects?.[0]?.from ?? null
  return {
    pageId: page.pageid,
    title: page.title,
    extract: page.extract ?? '',
    thumbnailUrl: page.thumbnail?.source ?? null,
    wikidataId: page.pageprops?.wikibase_item ?? null,
    redirectedFrom,
    missing: false,
  }
}

export async function getPageSections(title: string, lang: 'pt' | 'en'): Promise<WikiSection[]> {
  const params = new URLSearchParams({
    action: 'parse',
    page: title,
    prop: 'sections',
    format: 'json',
    formatversion: '2',
    origin: '*',
  })
  const res = await fetch(`${baseUrl(lang)}/api.php?${params}`)
  if (!res.ok) throw new Error(`Wikipedia sections HTTP ${res.status}`)
  const json = await res.json()
  if (json.error) return []
  return (json.parse?.sections ?? []).map((s: any) => ({ index: s.index, line: s.line, level: Number(s.level) }))
}

export async function getSectionHtml(title: string, sectionIndex: string, lang: 'pt' | 'en'): Promise<string> {
  const params = new URLSearchParams({
    action: 'parse',
    page: title,
    section: sectionIndex,
    prop: 'text',
    format: 'json',
    formatversion: '2',
    origin: '*',
  })
  const res = await fetch(`${baseUrl(lang)}/api.php?${params}`)
  if (!res.ok) throw new Error(`Wikipedia section text HTTP ${res.status}`)
  const json = await res.json()
  if (json.error) return ''
  return json.parse?.text ?? ''
}

export function pageUrl(title: string, lang: 'pt' | 'en'): string {
  return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`
}
