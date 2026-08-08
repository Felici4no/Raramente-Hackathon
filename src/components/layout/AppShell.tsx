import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { SourceRegistryDrawer } from '@/components/provenance/SourceRegistryDrawer'
import styles from './AppShell.module.css'

const TOP_LINKS = [
  { to: '/', label: 'Research Desk', end: true },
  { to: '/case/9104', label: 'Caso #9104' },
  { to: '/auto-research', label: 'Auto Research' },
  { to: '/compare', label: 'Comparador' },
  { to: '/rarity-map', label: 'Mapa da Raridade' },
  { to: '/data-explorer', label: 'Data Explorer' },
]

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={`${styles.topbar} print-hide`}>
        <NavLink to="/" className={styles.brand}>
          <span className={styles.mark}>◎</span>
          <div>
            <p className={styles.brandTitle}>QuaTiRare</p>
            <p className={styles.brandSub}>Core Investigativo</p>
          </div>
        </NavLink>
        <p className={styles.tagline}>Não mostramos apenas dados. Mostramos relações, contexto, proveniência e significado clínico-assistencial.</p>
      </div>
      <nav className={`${styles.topNav} print-hide`} aria-label="Navegação principal">
        {TOP_LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `${styles.topNavLink} ${isActive ? styles.topNavActive : ''}`}>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <main className={styles.main}>{children}</main>
      <SourceRegistryDrawer />
    </div>
  )
}
