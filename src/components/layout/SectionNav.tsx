import { NavLink } from 'react-router-dom'
import styles from './SectionNav.module.css'

const CASE_ID = '9104'

const ITEMS = [
  { to: `/case/${CASE_ID}`, label: 'Visão Geral', end: true },
  { to: `/case/${CASE_ID}/graph`, label: 'Grafo' },
  { to: `/case/${CASE_ID}/evidence`, label: 'Evidências' },
  { to: `/case/${CASE_ID}/timeline`, label: 'Timeline' },
  { to: `/case/${CASE_ID}/phenotypes`, label: 'Fenótipos' },
  { to: `/case/${CASE_ID}/family`, label: 'Família' },
  { to: `/case/${CASE_ID}/report`, label: 'Relatório' },
]

export function SectionNav() {
  return (
    <nav className={styles.nav} aria-label="Seções do dossiê">
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
