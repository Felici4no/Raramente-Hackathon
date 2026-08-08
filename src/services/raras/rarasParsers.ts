import type {
  RarasDiseaseCandidate,
  RarasDiseaseDetail,
  RarasDiseaseSummary,
  RarasEvidence,
  RarasGraphStats,
  RarasPaper,
  RarasPhenotypeRef,
  RarasPhenotypeSearchResult,
  RarasReferenceCenter,
  RarasSusCoverage,
  RarasTrialsResult,
} from '@/types/raras'

/**
 * The raras.org MCP tools are designed to hand an LLM readable markdown, not
 * a UI a typed payload. These parsers turn that markdown back into
 * structured data so it can drive real components. They're intentionally
 * tolerant — a block that doesn't match is skipped rather than throwing, so
 * a formatting quirk degrades gracefully instead of blanking a whole page.
 */

export function parseSearchDiseases(text: string): RarasDiseaseSummary[] {
  const blocks = text.split(/\n\n+/)
  const out: RarasDiseaseSummary[] = []
  for (const block of blocks) {
    const head = block.match(/\*\*(.+?)\*\*\s*\(ORPHA:(\d+)(?:\s*·\s*MONDO:([\w:.]+))?(?:\s*·\s*CID10:([\w.]+))?\)/)
    if (!head) continue
    const trials = block.match(/🧪\s*(\d+)\s*trials?/)
    const url = block.match(/(https?:\/\/\S+)/)
    const prevalenceLine = block.split('\n')[1]?.trim()
    out.push({
      name: head[1],
      orphaCode: head[2],
      mondoCode: head[3],
      cid10: head[4],
      prevalence: prevalenceLine?.replace(/✅ SUS|🧪.*$/g, '').trim(),
      susCoverage: block.includes('✅ SUS'),
      activeTrials: trials ? Number(trials[1]) : undefined,
      url: url?.[1],
    })
  }
  return out
}

export function parseDiseaseDetail(text: string, orphaCode: string): RarasDiseaseDetail | null {
  const nameMatch = text.match(/^#\s*(.+)$/m)
  if (!nameMatch) return null

  const idsLine = text.match(/\*\*IDs:\*\*\s*(.+)/)?.[1] ?? ''
  const mondo = idsLine.match(/MONDO:([\w.]+)/)?.[1]
  const omim = idsLine.match(/OMIM:(\d+)/)?.[1]
  const cid10 = idsLine.match(/CID-10:\s*([\w.]+)/)?.[1]

  const prevalence = text.match(/\*\*Prevalência:\*\*\s*(.+)/)?.[1]
  const inheritance = text.match(/\*\*Herança:\*\*\s*(.+)/)?.[1]
  const description = text.match(/## Descrição\n([\s\S]+?)(?=\n##|\n*$)/)?.[1]?.trim()

  const phenotypesBlock = text.match(/## Fenótipos HPO\n([\s\S]+?)(?=\n##|\n*$)/)?.[1] ?? ''
  const phenotypes: RarasPhenotypeRef[] = Array.from(
    phenotypesBlock.matchAll(/-\s*(.+?)\s*\(HP:(\d+)\)(?:\s*·\s*(.+))?/g),
  ).map((m) => ({ label: m[1], hpoId: `HP:${m[2]}`, frequency: m[3]?.trim() }))

  const genesBlock = text.match(/## Genes\n([\s\S]+?)(?=\n##|\n*$)/)?.[1] ?? ''
  const genes = Array.from(genesBlock.matchAll(/-\s*(\S+)(?:\s*\(HGNC:(\d+)\))?/g)).map((m) => ({
    symbol: m[1],
    hgnc: m[2],
  }))

  const susCeaf = text.match(/Medicamentos CEAF:\s*(\d+)/)?.[1]
  const susTrials = text.match(/Ensaios clínicos ativos:\s*(\d+)/)?.[1]
  const url = text.match(/(https?:\/\/raras\.org\/doenca\/\S+)/)?.[1]

  return {
    name: nameMatch[1],
    orphaCode,
    mondoCode: mondo,
    omimCode: omim,
    cid10,
    prevalence,
    inheritance,
    description,
    phenotypes,
    genes,
    susCeafMeds: susCeaf ? Number(susCeaf) : undefined,
    susTrialsActive: susTrials ? Number(susTrials) : undefined,
    url,
  }
}

export function parseSearchPhenotypes(text: string): RarasPhenotypeSearchResult[] {
  return Array.from(text.matchAll(/\*\*(.+?)\*\*\s*\(HP:(\d+)\)/g)).map((m) => ({
    label: m[1],
    hpoId: `HP:${m[2]}`,
  }))
}

export function parseDiseasesByPhenotypes(text: string): RarasDiseaseCandidate[] {
  const blocks = text.split(/\n\n+/)
  const out: RarasDiseaseCandidate[] = []
  for (const block of blocks) {
    const m = block.match(/\*\*(.+?)\*\*\s*\(ORPHA:(\d+)\)\s*—\s*(\d+)\/(\d+)\s*\((\d+)%\)\n\s*(.+)/)
    if (!m) continue
    out.push({
      name: m[1],
      orphaCode: m[2],
      matchedCount: Number(m[3]),
      totalCount: Number(m[4]),
      matchPercent: Number(m[5]),
      matchedPhenotypeLabels: m[6].split(',').map((s) => s.trim()).filter(Boolean),
    })
  }
  return out
}

export function parseReferenceCenters(text: string): RarasReferenceCenter[] {
  return Array.from(text.matchAll(/-\s*\*\*(.+?)\*\*\s*—\s*(?:([^/\n]+)\/([A-Z]{2}))?(?:\s*·\s*CNES:(\S+))?/g)).map(
    (m) => ({ name: m[1], city: m[2]?.trim(), uf: m[3], cnes: m[4] }),
  )
}

export function parseSusCoverage(text: string, diseaseName: string): RarasSusCoverage {
  return {
    diseaseName,
    integration: text.match(/\*\*Integração:\*\*\s*(.+)/)?.[1] ?? 'Não informado',
    ceafMeds: Number(text.match(/CEAF:\s*(\d+)/)?.[1] ?? 0),
    sigtapProcedures: Number(text.match(/SIGTAP:\s*(\d+)/)?.[1] ?? 0),
  }
}

export function parseActiveTrials(text: string): RarasTrialsResult {
  return { hasTrials: !/nenhum/i.test(text), summary: text.trim() }
}

export function parsePapersForDisease(text: string): RarasPaper[] {
  return Array.from(
    text.matchAll(/-\s*\*\*(.+?)\.\*\*\s*\n\s*_(.+?),\s*(\d{4})_\s*(?:—\s*sim\s*([\d.]+))?\s*\n\s*(https?:\S+)/g),
  ).map((m) => ({
    title: m[1],
    journal: m[2],
    year: m[3],
    similarity: m[4] ? Number(m[4]) : undefined,
    url: m[5],
  }))
}

export function parseGraphStats(text: string): RarasGraphStats {
  const num = (label: string) => {
    const m = text.match(new RegExp(`\\*\\*([\\d.,]+)\\*\\*\\s*${label}`))
    return m ? Number(m[1].replace(/[.,]/g, '')) : 0
  }
  return {
    diseases: num('doenças'),
    phenotypes: num('fenótipos'),
    genes: num('genes'),
    trials: num('ensaios'),
  }
}

export function parseEvidence(structured: unknown, text: string, orphaCode: string): RarasEvidence {
  const s = (structured ?? {}) as Record<string, unknown>
  const xrefs = (s.xrefs as Record<string, string>) ?? {}
  const pubmedIds = Array.from(text.matchAll(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/g)).map((m) => m[1])
  return {
    orphaCode: (s.orphaCode as string) ?? orphaCode,
    name: (s.name as string) ?? text.match(/^#\s*Proveniência\s*—\s*(.+?)\s*\(/m)?.[1] ?? '',
    xrefs,
    verificationStatus: text.match(/Status:\s*(.+)/)?.[1] ?? 'não verificado',
    pubmedIds,
  }
}
