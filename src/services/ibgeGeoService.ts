/**
 * Real IBGE geography. States load from a pre-fetched local file (small,
 * ~98KB, fine to ship); municipalities are lazy-fetched live per UF only
 * when a researcher actually drills into that state — 27 states' worth of
 * municipal boundaries would be several MB if bundled up front, so this
 * mirrors the "Brasil → UF → Municípios" lazy-load QuaTiRare asks for
 * without pre-generating 27 static files.
 */

export interface GeoFeatureCollection {
  type: 'FeatureCollection'
  features: GeoJSON.Feature[]
}

export async function fetchStateBoundaries(): Promise<GeoFeatureCollection> {
  const res = await fetch('/maps/brazil-states.json')
  if (!res.ok) throw new Error(`Malha de estados HTTP ${res.status}`)
  return res.json()
}

export async function fetchMunicipalityBoundaries(ufCodarea: string): Promise<GeoFeatureCollection> {
  const url = `https://servicodados.ibge.gov.br/api/v3/malhas/estados/${ufCodarea}?formato=application/vnd.geo+json&intrarregiao=municipio&qualidade=minima`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Malha municipal HTTP ${res.status}`)
  return res.json()
}

export interface IbgeMunicipality {
  id: number
  nome: string
}

export async function fetchMunicipalitiesList(ufSigla: string): Promise<IbgeMunicipality[]> {
  const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSigla}/municipios`)
  if (!res.ok) throw new Error(`Lista de municípios HTTP ${res.status}`)
  const json = await res.json()
  return json.map((m: { id: number; nome: string }) => ({ id: m.id, nome: m.nome }))
}
