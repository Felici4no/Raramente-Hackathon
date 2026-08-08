import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { EntityRef } from '@/types/entities'

interface EntityDrawerState {
  entity: EntityRef | null
  openEntity: (entity: EntityRef) => void
  closeEntity: () => void
}

const EntityDrawerContext = createContext<EntityDrawerState | null>(null)

export function EntityDrawerProvider({ children }: { children: ReactNode }) {
  const [entity, setEntity] = useState<EntityRef | null>(null)

  const value = useMemo<EntityDrawerState>(
    () => ({ entity, openEntity: setEntity, closeEntity: () => setEntity(null) }),
    [entity],
  )

  return <EntityDrawerContext.Provider value={value}>{children}</EntityDrawerContext.Provider>
}

export function useEntityDrawer() {
  const ctx = useContext(EntityDrawerContext)
  if (!ctx) throw new Error('useEntityDrawer must be used within EntityDrawerProvider')
  return ctx
}
