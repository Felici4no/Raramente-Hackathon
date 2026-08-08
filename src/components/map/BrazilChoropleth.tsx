import { useMemo } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import type { ProjectionFunction } from 'react-simple-maps'
import { geoCentroid, geoMercator } from 'd3-geo'
import type { GeoFeatureCollection } from '@/services/ibgeGeoService'
import { CHOROPLETH_NO_DATA, CHOROPLETH_OUTLINE, CHOROPLETH_SELECTED_OUTLINE, colorForValue } from '@/utils/choroplethScale'
import styles from './BrazilChoropleth.module.css'

export interface ChoroplethMarker {
  id: string
  value: number
  label: string
}

interface BrazilChoroplethProps {
  geography: GeoFeatureCollection
  idProperty: string
  valueById: Record<string, number>
  maxValue: number
  selectedId?: string | null
  markers?: ChoroplethMarker[]
  onHover?: (id: string | null, event?: React.MouseEvent) => void
  onSelect?: (id: string) => void
}

const MAP_WIDTH = 800
const MAP_HEIGHT = 600
const FIT_PADDING = 24

export function BrazilChoropleth({
  geography,
  idProperty,
  valueById,
  maxValue,
  selectedId,
  markers,
  onHover,
  onSelect,
}: BrazilChoroplethProps) {
  // react-simple-maps' string-based `projection` prop has no way to
  // configure the underlying d3 projection beyond center/rotate/scale, and
  // a fixed center/scale tuned for all of Brazil leaves a single state's
  // municipalities as a near-invisible speck. Building the projection
  // ourselves and fitting it to whatever `geography` is actually passed in
  // (national boundaries, or one UF's municipalities) auto-zooms correctly
  // for both callers. Two more fixes are needed to get IBGE's malha
  // boundaries rendering as real shapes instead of a solid rectangle:
  //  1. `clipExtent` bounds the projected output to the viewBox — without
  //     it, d3-geo's antimeridian preclip stage can decide a ring needs
  //     stitching along the sphere's back side and appends a frame-corner
  //     artifact extending far outside the viewBox.
  //  2. Even with clipExtent set, the default antimeridian preclip
  //     (`geoClipAntimeridian`) still occasionally misjudges these rings'
  //     orientation and prepends a spurious full-canvas rectangle subpath,
  //     which the SVG's nonzero fill-rule composites with the real shape —
  //     painting the whole map one solid color. Brazil's coordinates never
  //     approach ±180° longitude, so antimeridian handling is unnecessary;
  //     replacing it with a pass-through preclip removes the artifact.
  const projection = useMemo(() => {
    const proj = geoMercator().preclip((sink: unknown) => sink as never)
    proj.fitExtent(
      [
        [FIT_PADDING, FIT_PADDING],
        [MAP_WIDTH - FIT_PADDING, MAP_HEIGHT - FIT_PADDING],
      ],
      geography as unknown as Parameters<typeof proj.fitExtent>[1],
    )
    proj.clipExtent([
      [0, 0],
      [MAP_WIDTH, MAP_HEIGHT],
    ])
    return proj
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geography])

  const markerPositions = useMemo(() => {
    if (!markers || markers.length === 0) return []
    const byId = new Map(markers.map((m) => [m.id, m]))
    return geography.features
      .map((f) => {
        const id = String((f.properties as Record<string, unknown>)[idProperty])
        const marker = byId.get(id)
        if (!marker) return null
        const centroid = geoCentroid(f as GeoJSON.Feature)
        return { ...marker, coordinates: centroid as [number, number] }
      })
      .filter((m): m is ChoroplethMarker & { coordinates: [number, number] } => m !== null)
  }, [geography, markers, idProperty])

  return (
    <ComposableMap
      width={MAP_WIDTH}
      height={MAP_HEIGHT}
      projection={projection as unknown as ProjectionFunction}
      className={styles.svg}
    >
      <Geographies geography={geography}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const id = String((geo.properties as Record<string, unknown>)[idProperty])
            const value = valueById[id]
            const isSelected = selectedId === id
            const fill = colorForValue(value, maxValue)
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={(e) => onHover?.(id, e)}
                onMouseMove={(e) => onHover?.(id, e)}
                onMouseLeave={() => onHover?.(null)}
                onClick={() => onSelect?.(id)}
                style={{
                  default: { fill, stroke: CHOROPLETH_OUTLINE, strokeWidth: isSelected ? 2 : 1, vectorEffect: 'non-scaling-stroke', outline: 'none' },
                  hover: { fill, stroke: CHOROPLETH_SELECTED_OUTLINE, strokeWidth: 1.5, vectorEffect: 'non-scaling-stroke', outline: 'none', cursor: 'pointer' },
                  pressed: { fill, stroke: CHOROPLETH_SELECTED_OUTLINE, strokeWidth: 2, vectorEffect: 'non-scaling-stroke', outline: 'none' },
                }}
                className={isSelected ? styles.selected : undefined}
              />
            )
          })
        }
      </Geographies>
      {markerPositions.map((m) => (
        <Marker key={m.id} coordinates={m.coordinates}>
          <circle r={Math.max(2, Math.min(9, Math.sqrt(m.value) * 2))} fill="#c75b39" fillOpacity={0.8} stroke="#fff" strokeWidth={0.6} />
        </Marker>
      ))}
    </ComposableMap>
  )
}

export { CHOROPLETH_NO_DATA }
