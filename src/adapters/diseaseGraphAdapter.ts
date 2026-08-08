import type { CaseGraphEdge, CaseGraphNode } from '@/types/domain'
import type { RarasDiseaseDetail } from '@/types/raras'
import type { WikipediaMatch } from '@/types/wikipedia'

const MAX_PHENOTYPES_IN_GRAPH = 8

/**
 * Builds the "disease → phenotypes / genes / ORPHA / Wikipedia → Wikidata"
 * mini relational graph for a Disease Profile page, reusing the same
 * CaseGraphNode/CaseGraphEdge shape (and CaseGraphCanvas component) as the
 * case investigation graph.
 */
export function buildDiseaseGraph(detail: RarasDiseaseDetail, wikiMatch: WikipediaMatch | null): { nodes: CaseGraphNode[]; edges: CaseGraphEdge[] } {
  const retrievedAt = new Date().toISOString()
  const nodes: CaseGraphNode[] = []
  const edges: CaseGraphEdge[] = []

  nodes.push({
    id: 'disease',
    type: 'doenca',
    label: detail.name,
    sublabel: `ORPHA:${detail.orphaCode}`,
    description: detail.description ?? 'Doença rara catalogada na Raras Knowledge Graph.',
    relevance: 'Entidade central deste perfil investigativo.',
    provenance: { source: 'Raras Knowledge Graph', sourceId: `ORPHA:${detail.orphaCode}`, date: retrievedAt, status: 'verificado', explanation: 'Registro estruturado da base pública Raras.' },
  })

  nodes.push({
    id: 'orpha',
    type: 'fonte',
    label: `ORPHA:${detail.orphaCode}`,
    description: 'Identificador Orphanet — nomenclatura de referência para doenças raras.',
    relevance: 'Identifica esta condição de forma inequívoca entre catálogos.',
    provenance: { source: 'Raras Knowledge Graph', date: retrievedAt, status: 'verificado', explanation: 'Código de referência Orphanet.' },
  })
  edges.push({ id: 'e-orpha', source: 'disease', target: 'orpha', type: 'associado_a', label: 'identificado por' })

  for (const phenotype of detail.phenotypes.slice(0, MAX_PHENOTYPES_IN_GRAPH)) {
    const id = `hpo:${phenotype.hpoId}`
    nodes.push({
      id,
      type: 'fenotipo',
      label: phenotype.label,
      sublabel: phenotype.hpoId,
      description: phenotype.frequency ? `Frequência observada: ${phenotype.frequency}.` : 'Fenótipo característico desta condição.',
      relevance: 'Um dos fenótipos HPO que caracterizam esta doença.',
      provenance: { source: 'Raras Knowledge Graph', sourceId: phenotype.hpoId, date: retrievedAt, status: 'verificado', explanation: 'Fenótipo estruturado HPO vinculado à doença.' },
    })
    edges.push({ id: `e-${id}`, source: 'disease', target: id, type: 'associado_a', label: 'hasPhenotype' })
  }

  for (const gene of detail.genes) {
    const id = `gene:${gene.symbol}`
    nodes.push({
      id,
      type: 'gene',
      label: gene.symbol,
      sublabel: gene.hgnc ? `HGNC:${gene.hgnc}` : undefined,
      description: `Gene associado a ${detail.name}.`,
      relevance: 'Base genética conhecida desta condição.',
      provenance: { source: 'Raras Knowledge Graph', sourceId: gene.hgnc ? `HGNC:${gene.hgnc}` : gene.symbol, date: retrievedAt, status: 'verificado', explanation: 'Associação gene–doença da base Raras.' },
    })
    edges.push({ id: `e-${id}`, source: 'disease', target: id, type: 'associado_a', label: 'associatedGene' })
  }

  if (wikiMatch?.wikipediaTitle && wikiMatch.wikipediaLanguage) {
    nodes.push({
      id: 'wikipedia',
      type: 'fonte',
      label: 'Wikipedia',
      sublabel: wikiMatch.wikipediaLanguage === 'pt' ? 'PT-BR' : 'EN',
      description: `Página "${wikiMatch.wikipediaTitle}" — fonte contextual/enciclopédica, não clínica.`,
      relevance: 'Explica a condição em linguagem acessível para contexto geral.',
      provenance: {
        source: 'Wikipedia',
        sourceId: String(wikiMatch.wikipediaPageId ?? ''),
        date: wikiMatch.matchedAt,
        status: wikiMatch.matchConfidence >= 0.6 ? 'verificado' : 'pendente',
        explanation: `Correspondência por ${wikiMatch.matchMethod} (${Math.round(wikiMatch.matchConfidence * 100)}% de confiança). Fonte contextual — não substitui RARAS/HPO.`,
      },
    })
    edges.push({ id: 'e-wikipedia', source: 'disease', target: 'wikipedia', type: 'descrito_por', label: 'describedBy' })

    if (wikiMatch.wikidataId) {
      nodes.push({
        id: 'wikidata',
        type: 'fonte',
        label: 'Wikidata',
        sublabel: wikiMatch.wikidataId,
        description: 'Identificador Wikidata associado à página da Wikipedia.',
        relevance: 'Ponte para outras bases de conhecimento abertas.',
        provenance: { source: 'Wikipedia', sourceId: wikiMatch.wikidataId, date: wikiMatch.matchedAt, status: 'verificado', explanation: 'QID extraído de pageprops.wikibase_item.' },
      })
      edges.push({ id: 'e-wikidata', source: 'wikipedia', target: 'wikidata', type: 'associado_a', label: 'associado a' })
    }
  }

  return { nodes, edges }
}
