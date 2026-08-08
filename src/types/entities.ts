/**
 * Every clickable thing in QuaTiRare is an entity: it has an identity, a
 * type, a canonical identifier, a source, and — where the app has built
 * one — its own page. The same disease clicked from search, a candidate
 * card, or the comparator always resolves to the same route.
 */
export type EntityType =
  | 'DISEASE'
  | 'PHENOTYPE'
  | 'GENE'
  | 'CASE'
  | 'PERSON'
  | 'REFERENCE_CENTER'
  | 'SERVICE'
  | 'PAPER'
  | 'TRIAL'
  | 'PROTOCOL'
  | 'STATE'
  | 'MUNICIPALITY'
  | 'SOURCE'

export interface EntityIdentifiers {
  orpha?: string
  mondo?: string
  hpo?: string
  wikidata?: string
  pmid?: string
  cnes?: string
  ibge?: string
  uf?: string
  url?: string
}

export interface EntityRef {
  type: EntityType
  id: string
  label: string
  sublabel?: string
  source?: string
  identifiers?: EntityIdentifiers
}
