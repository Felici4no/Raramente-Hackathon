import { Outlet } from 'react-router-dom'
import { useCaseSummary } from '@/hooks/useCaseData'
import { CaseHeader } from '@/components/layout/CaseHeader'
import { SectionNav } from '@/components/layout/SectionNav'
import { PageContainer } from '@/components/layout/PageContainer'

const CASE_ID = '9104'

export function ResearchWorkspace() {
  const { data: summary } = useCaseSummary(CASE_ID)

  return (
    <div>
      <div className="print-hide">
        {summary && <CaseHeader summary={summary} />}
        <SectionNav />
      </div>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </div>
  )
}
