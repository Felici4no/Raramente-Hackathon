import { brazilUfs } from '@/mocks/brazilUf'
import styles from './BrazilTileMap.module.css'

const CELL = 54

interface BrazilTileMapProps {
  valueByUf: Record<string, number>
  selectedUf: string | null
  onSelectUf: (uf: string) => void
  colorTone?: 'blue' | 'terracotta'
}

export function BrazilTileMap({ valueByUf, selectedUf, onSelectUf, colorTone = 'blue' }: BrazilTileMapProps) {
  const max = Math.max(1, ...Object.values(valueByUf))
  const maxCol = Math.max(...brazilUfs.map((u) => u.col))
  const maxRow = Math.max(...brazilUfs.map((u) => u.row))

  return (
    <div className={styles.wrap} style={{ width: (maxCol + 1) * CELL, height: (maxRow + 1) * CELL }}>
      {brazilUfs.map((u) => {
        const value = valueByUf[u.uf] ?? 0
        const intensity = value / max
        return (
          <button
            key={u.uf}
            className={`${styles.tile} ${selectedUf === u.uf ? styles.selected : ''} ${styles[colorTone]}`}
            style={{
              left: u.col * CELL,
              top: u.row * CELL,
              width: CELL - 4,
              height: CELL - 4,
              opacity: 0.28 + intensity * 0.72,
            }}
            onClick={() => onSelectUf(u.uf)}
            title={`${u.name}: ${value.toLocaleString('pt-BR')}`}
          >
            <span className={styles.ufCode}>{u.uf}</span>
            <span className={styles.ufValue}>{value.toLocaleString('pt-BR')}</span>
          </button>
        )
      })}
    </div>
  )
}
