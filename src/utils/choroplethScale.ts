/**
 * Fixed 6-level quantized scale — color means value, nothing else. Never
 * assign color per-state identity (that reads as decoration, not data).
 */
export const CHOROPLETH_LEVELS = ['#D7E3F4', '#A9C4E8', '#759FD7', '#417AC5', '#1858AF', '#0C3474'] as const
export const CHOROPLETH_NO_DATA = '#E8E3D8'
export const CHOROPLETH_OUTLINE = '#F3EEE3'
export const CHOROPLETH_SELECTED_OUTLINE = '#14243A'

export function colorForValue(value: number | undefined, max: number): string {
  if (value === undefined || value <= 0 || max <= 0) return CHOROPLETH_NO_DATA
  const ratio = Math.min(1, value / max)
  const idx = Math.min(CHOROPLETH_LEVELS.length - 1, Math.floor(ratio * CHOROPLETH_LEVELS.length))
  return CHOROPLETH_LEVELS[idx]
}
