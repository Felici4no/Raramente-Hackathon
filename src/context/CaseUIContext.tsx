import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { CaseGraphNode } from '@/types/domain'

interface CaseUIState {
  sourcesOpen: boolean
  openSources: () => void
  closeSources: () => void
  selectedNode: CaseGraphNode | null
  selectNode: (node: CaseGraphNode | null) => void
}

const CaseUIContext = createContext<CaseUIState | null>(null)

export function CaseUIProvider({ children }: { children: ReactNode }) {
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState<CaseGraphNode | null>(null)

  const value = useMemo<CaseUIState>(
    () => ({
      sourcesOpen,
      openSources: () => setSourcesOpen(true),
      closeSources: () => setSourcesOpen(false),
      selectedNode,
      selectNode: setSelectedNode,
    }),
    [sourcesOpen, selectedNode],
  )

  return <CaseUIContext.Provider value={value}>{children}</CaseUIContext.Provider>
}

export function useCaseUI() {
  const ctx = useContext(CaseUIContext)
  if (!ctx) throw new Error('useCaseUI must be used within CaseUIProvider')
  return ctx
}
