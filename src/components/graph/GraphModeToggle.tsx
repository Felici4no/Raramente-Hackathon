import type { GraphMode } from '@/types/domain'
import styles from './GraphModeToggle.module.css'

const MODES: { value: GraphMode | null; label: string }[] = [
  { value: null, label: 'Todos' },
  { value: 'assistencial', label: 'Assistencial' },
  { value: 'fenotipico', label: 'Fenotípico' },
  { value: 'familiar', label: 'Familiar' },
  { value: 'proveniencia', label: 'Proveniência' },
]

interface GraphModeToggleProps {
  mode: GraphMode | null
  onChange: (mode: GraphMode | null) => void
}

export function GraphModeToggle({ mode, onChange }: GraphModeToggleProps) {
  return (
    <div className={styles.toggle} role="tablist" aria-label="Modo do grafo">
      {MODES.map((m) => (
        <button
          key={m.label}
          role="tab"
          aria-selected={mode === m.value}
          className={`${styles.btn} ${mode === m.value ? styles.active : ''}`}
          onClick={() => onChange(m.value)}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}
