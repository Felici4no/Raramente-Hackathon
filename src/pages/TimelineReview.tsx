import { useJourneyEvents } from '@/hooks/useCaseData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/ui/LoadingState'
import { JourneyTimeline } from '@/components/timeline/JourneyTimeline'

const CASE_ID = '9104'

export function TimelineReview() {
  const { data: events } = useJourneyEvents(CASE_ID)

  return (
    <div>
      <SectionHeading
        eyebrow="Reconstrução cronológica"
        title="Journey Timeline"
        subtitle="Cada evento assistencial, familiar, fenotípico e de protocolo, na ordem em que aconteceu."
        note="14 eventos reconstruídos a partir de múltiplas fontes — verificados, pendentes e de relato."
      />
      {events ? <JourneyTimeline events={events} /> : <LoadingState label="Ordenando eventos da jornada…" />}
    </div>
  )
}
