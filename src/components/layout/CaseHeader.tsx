import { useNavigate } from 'react-router-dom'
import type { CaseSummary } from '@/types/domain'
import { Tag } from '@/components/ui/Tag'
import { Button } from '@/components/ui/Button'
import { useCaseUI } from '@/context/CaseUIContext'
import styles from './CaseHeader.module.css'

const STATUS_LABEL: Record<CaseSummary['journeyStatus'], string> = {
  comum: 'Jornada Comum',
  em_atencao: 'Em Atenção',
  atipica: 'Jornada Atípica',
}

const STATUS_TONE: Record<CaseSummary['journeyStatus'], 'green' | 'amber' | 'terracotta'> = {
  comum: 'green',
  em_atencao: 'amber',
  atipica: 'terracotta',
}

export function CaseHeader({ summary }: { summary: CaseSummary }) {
  const navigate = useNavigate()
  const { openSources } = useCaseUI()

  return (
    <header className={styles.header}>
      <div className={styles.identity}>
        <p className="eyebrow">Revisão clínica assistida por dados</p>
        <h1 className={styles.title}>
          História #{summary.id} — {summary.patientName}, {summary.patientAge}a
        </h1>
        <div className={styles.badges}>
          <Tag tone="blue">{summary.microarea}</Tag>
          <Tag tone="neutral">{summary.listeningOrigin}</Tag>
          <Tag tone="neutral">{summary.currentProtocol}</Tag>
          <Tag tone={STATUS_TONE[summary.journeyStatus]}>{STATUS_LABEL[summary.journeyStatus]}</Tag>
        </div>
      </div>
      <div className={styles.actions}>
        <Button variant="secondary" size="sm" onClick={openSources}>
          Abrir fontes
        </Button>
        <Button variant="secondary" size="sm" onClick={() => navigate('/case/9104/report')}>
          Compartilhar resumo
        </Button>
        <Button variant="primary" size="sm" onClick={() => navigate('/case/9104/report?export=1')}>
          Exportar protocolo
        </Button>
      </div>
    </header>
  )
}
