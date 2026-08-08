import { useEvidenceCards } from '@/hooks/useCaseData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/ui/LoadingState'
import { EvidenceWallGrid } from '@/components/evidence/EvidenceWallGrid'

const CASE_ID = '9104'

export function EvidenceWall() {
  const { data: evidence } = useEvidenceCards(CASE_ID)

  return (
    <div>
      <SectionHeading
        eyebrow="Mural de evidências"
        title="Evidence Wall"
        subtitle="Cada peça de informação lida rapidamente: o que é, o que significa, o que a enfraqueceria e de onde veio."
        note="Filtre por categoria para focar em uma dimensão da investigação."
      />
      {evidence ? <EvidenceWallGrid evidence={evidence} /> : <LoadingState label="Reunindo evidências…" />}
    </div>
  )
}
