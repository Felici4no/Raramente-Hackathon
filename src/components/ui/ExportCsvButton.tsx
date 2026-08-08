import { useState } from 'react'
import { Button } from './Button'
import { downloadCsv, type ExportRow } from '@/utils/exportCsv'
import styles from './ExportCsvButton.module.css'

export function ExportCsvButton({ filename, rows }: { filename: string; rows: ExportRow[] }) {
  const [justExported, setJustExported] = useState(false)

  function handleExport() {
    downloadCsv(filename, rows)
    setJustExported(true)
    setTimeout(() => setJustExported(false), 2500)
  }

  return (
    <div className={styles.wrap}>
      <Button variant="secondary" size="sm" onClick={handleExport} disabled={rows.length === 0}>
        Export CSV
      </Button>
      {justExported && <span className={styles.toast}>Dados exportados com proveniência.</span>}
    </div>
  )
}
