/**
 * Generic CSV export shared by every surface that lets a researcher take a
 * filtered dataset out of the app. Every row preserves provenance — the
 * point isn't the spreadsheet, it's that whoever opens it can still trace
 * each value back to where it came from.
 */
export interface ExportRow {
  entity_id: string
  entity_type: string
  label: string
  value: string | number
  source: string
  source_id?: string
  verification_status: string
  retrieved_at: string
}

function escapeCsvCell(value: string | number): string {
  const str = String(value)
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function rowsToCsv(rows: ExportRow[]): string {
  const columns: (keyof ExportRow)[] = [
    'entity_id',
    'entity_type',
    'label',
    'value',
    'source',
    'source_id',
    'verification_status',
    'retrieved_at',
  ]
  const header = columns.join(',')
  const lines = rows.map((row) => columns.map((col) => escapeCsvCell(row[col] ?? '')).join(','))
  return [header, ...lines].join('\n')
}

export function downloadCsv(filename: string, rows: ExportRow[]) {
  const csv = rowsToCsv(rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename.endsWith('.csv') ? filename : `${filename}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
