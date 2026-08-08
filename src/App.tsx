import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, HashRouter, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { PageContainer } from '@/components/layout/PageContainer'
import { CaseUIProvider } from '@/context/CaseUIContext'
import { ResearchDesk } from '@/pages/ResearchDesk'
import { ResearchWorkspace } from '@/pages/ResearchWorkspace'
import { CaseOverview } from '@/pages/CaseOverview'
import { CaseGraph } from '@/pages/CaseGraph'
import { EvidenceWall } from '@/pages/EvidenceWall'
import { TimelineReview } from '@/pages/TimelineReview'
import { SimilarityPanel } from '@/pages/SimilarityPanel'
import { FamilyNetwork } from '@/pages/FamilyNetwork'
import { ProtocolReport } from '@/pages/ProtocolReport'
import { AutoResearch } from '@/pages/AutoResearch'
import { DiseaseComparator } from '@/pages/DiseaseComparator'
import { DataExplorer } from '@/pages/DataExplorer'
import { RarityMap } from '@/pages/RarityMap'

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
              <Route path="/" element={<ResearchDesk />} />
              <Route path="/case/:caseId" element={<ResearchWorkspace />}>
                <Route index element={<CaseOverview />} />
                <Route path="graph" element={<CaseGraph />} />
                <Route path="evidence" element={<EvidenceWall />} />
                <Route path="timeline" element={<TimelineReview />} />
                <Route path="phenotypes" element={<SimilarityPanel />} />
                <Route path="family" element={<FamilyNetwork />} />
                <Route path="report" element={<ProtocolReport />} />
              </Route>
              <Route
                path="/auto-research"
                element={
                  <PageContainer>
                    <AutoResearch />
                  </PageContainer>
                }
              />
              <Route
                path="/compare"
                element={
                  <PageContainer>
                    <DiseaseComparator />
                  </PageContainer>
                }
              />
              <Route
                path="/data-explorer"
                element={
                  <PageContainer>
                    <DataExplorer />
                  </PageContainer>
                }
              />
              <Route
                path="/rarity-map"
                element={
                  <PageContainer>
                    <RarityMap />
                  </PageContainer>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppShell>
        </HashRouter>
      </CaseUIProvider>
    </QueryClientProvider>
  )
}
