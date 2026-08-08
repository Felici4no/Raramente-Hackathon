import type { EntityRef } from '@/types/entities'

/**
 * Central resolution: one place decides where an entity's canonical page
 * lives. Components never build these paths themselves — they hand an
 * EntityRef to <EntityLink> and this module decides internal route vs
 * external URL vs "no page yet, open the drawer".
 *
 * Coverage is honest about what actually has a page today:
 * - DISEASE, PHENOTYPE, GENE, STATE, MUNICIPALITY, CASE: real internal routes.
 * - PAPER: resolves to its own external page (PubMed) — that already *is*
 *   the paper's canonical page, an internal wrapper would just be noise.
 * - REFERENCE_CENTER, PROTOCOL, PERSON, SERVICE, SOURCE, TRIAL: RARAS/case
 *   data doesn't carry enough about these yet for a standalone page, so
 *   they resolve to the Entity Drawer instead of a dead end.
 */

export type EntityDestination = { kind: 'internal'; path: string } | { kind: 'external'; url: string } | { kind: 'drawer' }

export function resolveEntity(entity: EntityRef): EntityDestination {
  const ids = entity.identifiers ?? {}

  switch (entity.type) {
    case 'DISEASE': {
      const orpha = ids.orpha ?? (entity.id.startsWith('ORPHA:') ? entity.id.slice(6) : entity.id)
      return orpha ? { kind: 'internal', path: `/research/disease/${orpha}` } : { kind: 'drawer' }
    }
    case 'PHENOTYPE': {
      const hpo = ids.hpo ?? entity.id
      return hpo ? { kind: 'internal', path: `/research/phenotype/${hpo}` } : { kind: 'drawer' }
    }
    case 'GENE':
      return entity.id ? { kind: 'internal', path: `/research/gene/${entity.id}` } : { kind: 'drawer' }
    case 'CASE':
      // Established route predates the entity layer — kept as-is rather than
      // moving every existing link to /research/case/:id for a cosmetic gain.
      return entity.id ? { kind: 'internal', path: `/case/${entity.id}` } : { kind: 'drawer' }
    case 'STATE':
      return entity.id ? { kind: 'internal', path: `/research/map/${entity.id}` } : { kind: 'drawer' }
    case 'MUNICIPALITY': {
      // id convention: "UF:ibgeCode" (e.g. "SP:3509502") — municipalities
      // only exist nested under a state, so the composite id keeps EntityRef
      // flat instead of adding a parent-entity field just for this case.
      const [uf, ibge] = entity.id.split(':')
      return uf && ibge ? { kind: 'internal', path: `/research/map/${uf}/${ibge}` } : { kind: 'drawer' }
    }
    case 'PAPER':
      return ids.url ? { kind: 'external', url: ids.url } : ids.pmid ? { kind: 'external', url: `https://pubmed.ncbi.nlm.nih.gov/${ids.pmid}/` } : { kind: 'drawer' }
    default:
      return { kind: 'drawer' }
  }
}

export function hasCanonicalPage(entity: EntityRef): boolean {
  return resolveEntity(entity).kind !== 'drawer'
}
