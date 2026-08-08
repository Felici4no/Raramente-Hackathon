import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, HashRouter, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { CaseUIProvider } from '@/context/CaseUIContext'
import { ResearchWorkspace } from '@/pages/ResearchWorkspace'
import { CaseOverview } from '@/pages/CaseOverview'
import { CaseGraph } from '@/pages/CaseGraph'
import { EvidenceWall } from '@/pages/EvidenceWall'
import { TimelineReview } from '@/pages/TimelineReview'
import { SimilarityPanel } from '@/pages/SimilarityPanel'
import { FamilyNetwork } from '@/pages/FamilyNetwork'
import { ProtocolReport } from '@/pages/ProtocolReport'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CaseUIProvider>
        <HashRouter>
          <AppShell>
            <Routes>
              <Route path="/" element={<Navigate to="/case/9104" replace />} />
              <Route path="/case/:caseId" element={<ResearchWorkspace />}>
                <Route index element={<CaseOverview />} />
                <Route path="graph" element={<CaseGraph />} />
                <Route path="evidence" element={<EvidenceWall />} />
                <Route path="timeline" element={<TimelineReview />} />
                <Route path="phenotypes" element={<SimilarityPanel />} />
                <Route path="family" element={<FamilyNetwork />} />
                <Route path="report" element={<ProtocolReport />} />
              </Route>
              <Route path="*" element={<Navigate to="/case/9104" replace />} />
            </Routes>
          </AppShell>
        </HashRouter>
      </CaseUIProvider>
    </QueryClientProvider>
  )
}
