import { useEvidenceCards } from '@/hooks/useCaseData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/ui/LoadingState'
import { ExportCsvButton } from '@/components/ui/ExportCsvButton'
import { EvidenceWallGrid } from '@/components/evidence/EvidenceWallGrid'
import type { ExportRow } from '@/utils/exportCsv'

const CASE_ID = '9104'

export function EvidenceWall() {
  const { data: evidence } = useEvidenceCards(CASE_ID)

  const rows: ExportRow[] = (evidence ?? []).map((e) => ({
    entity_id: e.id,
    entity_type: e.category,
    label: e.title,
    value: e.currentValue,
    source: e.provenance.source,
    source_id: e.provenance.sourceId,
    verification_status: e.provenance.status,
    retrieved_at: e.provenance.date,
  }))

  return (
    <div>
      <SectionHeading
        eyebrow="Mural de evidências"
        title="Evidence Wall"
        subtitle="Cada peça de informação lida rapidamente: o que é, o que significa, o que a enfraqueceria e de onde veio."
        note="Filtre por categoria para focar em uma dimensão da investigação."
        actions={<ExportCsvButton filename="evidence-wall-9104.csv" rows={rows} />}
      />
      {evidence ? <EvidenceWallGrid evidence={evidence} /> : <LoadingState label="Reunindo evidências…" />}
    </div>
  )
}
