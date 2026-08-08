import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigate, Route, HashRouter, Routes } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { PageContainer } from '@/components/layout/PageContainer'
import { CaseUIProvider } from '@/context/CaseUIContext'
import { EntityDrawerProvider } from '@/context/EntityDrawerContext'
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
import { StateMapPage } from '@/pages/StateMapPage'
import { MunicipalityReportPage } from '@/pages/MunicipalityReportPage'
import { DiseaseProfile } from '@/pages/DiseaseProfile'
import { GenePage } from '@/pages/GenePage'
import { PhenotypePage } from '@/pages/PhenotypePage'

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
      <EntityDrawerProvider>
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
                path="/research/disease/:diseaseId"
                element={
                  <PageContainer>
                    <DiseaseProfile />
                  </PageContainer>
                }
              />
              <Route
                path="/research/gene/:geneSymbol"
                element={
                  <PageContainer>
                    <GenePage />
                  </PageContainer>
                }
              />
              <Route
                path="/research/phenotype/:hpoId"
                element={
                  <PageContainer>
                    <PhenotypePage />
                  </PageContainer>
                }
              />
              <Route
                path="/research/map"
                element={
                  <PageContainer>
                    <RarityMap />
                  </PageContainer>
                }
              />
              <Route
                path="/research/map/:uf"
                element={
                  <PageContainer>
                    <StateMapPage />
                  </PageContainer>
                }
              />
              <Route
                path="/research/map/:uf/:ibgeCode"
                element={
                  <PageContainer>
                    <MunicipalityReportPage />
                  </PageContainer>
                }
              />
              <Route path="/rarity-map" element={<Navigate to="/research/map" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppShell>
        </HashRouter>
      </EntityDrawerProvider>
      </CaseUIProvider>
    </QueryClientProvider>
  )
}
