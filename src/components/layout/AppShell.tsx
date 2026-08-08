import type { ReactNode } from 'react'
import { SourceRegistryDrawer } from '@/components/provenance/SourceRegistryDrawer'
import styles from './AppShell.module.css'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.mark}>◎</span>
          <div>
            <p className={styles.brandTitle}>QuaTiRare</p>
            <p className={styles.brandSub}>Core Investigativo</p>
          </div>
        </div>
        <p className={styles.tagline}>Não mostramos apenas dados. Mostramos relações, contexto, proveniência e significado clínico-assistencial.</p>
      </div>
      <main className={styles.main}>{children}</main>
      <SourceRegistryDrawer />
    </div>
  )
}
