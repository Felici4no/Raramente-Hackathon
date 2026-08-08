import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  useCaseSummary,
  useEvidenceCards,
  useExplainability,
  useFamilyMembers,
  useFamilySimilarities,
  useTerritoryContext,
} from '@/hooks/useCaseData'
import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { StatusPill } from '@/components/ui/StatusPill'
import { LoadingState } from '@/components/ui/LoadingState'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CONSENT_LABEL } from '@/components/family/familyMeta'
import { useCaseUI } from '@/context/CaseUIContext'
import styles from './ProtocolReport.module.css'

const CASE_ID = '9104'

function buildShareText(args: { patientName: string; age: number; microarea: string; protocol: string; headline: string }) {
  return [
    `História #${CASE_ID} — ${args.patientName}, ${args.age}a`,
    args.microarea,
    `Protocolo: ${args.protocol}`,
    '',
    args.headline,
    '',
    'Classificação demonstrativa — não representa diagnóstico médico.',
  ].join('\n')
}

export function ProtocolReport() {
  const [searchParams] = useSearchParams()
  const { openSources } = useCaseUI()
  const [copied, setCopied] = useState(false)

  const { data: summary } = useCaseSummary(CASE_ID)
  const { data: evidence } = useEvidenceCards(CASE_ID)
  const { data: family } = useFamilyMembers(CASE_ID)
  const { data: similarities } = useFamilySimilarities(CASE_ID)
  const { data: territory } = useTerritoryContext(CASE_ID)
  const { data: explainability } = useExplainability(CASE_ID)

  useEffect(() => {
    if (searchParams.get('export') === '1') {
      const t = setTimeout(() => window.print(), 300)
      return () => clearTimeout(t)
    }
  }, [searchParams])

  if (!summary || !evidence || !family || !territory || !explainability) {
    return <LoadingState label="Montando relatório do protocolo…" />
  }

  const verifiedCount = evidence.filter((e) => e.status === 'verificado').length
  const pendingCount = evidence.filter((e) => e.status === 'pendente').length
  const relatoCount = evidence.filter((e) => e.status === 'relato').length
  const topEvidence = [...evidence].sort((a, b) => (a.status === 'verificado' ? -1 : 1)).slice(0, 4)

  const shareText = buildShareText({
    patientName: summary.patientName,
    age: summary.patientAge,
    microarea: summary.microarea,
    protocol: summary.currentProtocol,
    headline: explainability.headline,
  })

  async function handleCopy() {
    await navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const waLink = `https://wa.me/?text=${encodeURIComponent(shareText)}`

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Documento compartilhável"
        title="Protocol Report"
        subtitle="Resumo profissional do dossiê, pronto para revisão e compartilhamento com a equipe de saúde."
      />

      <div className={`${styles.actions} print-hide`}>
        <Button variant="secondary" size="sm" onClick={openSources}>
          Abrir fontes
        </Button>
        <Button variant="secondary" size="sm" onClick={handleCopy}>
          {copied ? 'Copiado ✓' : 'Copiar resumo'}
        </Button>
        <a href={waLink} target="_blank" rel="noreferrer noopener" className={styles.waLink}>
          <Button variant="secondary" size="sm">
            Compartilhar por WhatsApp
          </Button>
        </a>
        <Button variant="primary" size="sm" onClick={() => window.print()}>
          Exportar PDF
        </Button>
      </div>

      <Panel raised className={styles.sheet}>
        <div className={styles.sheetHeader}>
          <div>
            <p className="eyebrow">Identificação</p>
            <h2 className={styles.sheetTitle}>
              História #{summary.id} — {summary.patientName}, {summary.patientAge}a
            </h2>
          </div>
          <Tag tone="terracotta">{summary.currentProtocol}</Tag>
        </div>

        <div className={styles.badgeRow}>
          <Tag tone="blue">{summary.microarea}</Tag>
          <Tag tone="neutral">{summary.listeningOrigin}</Tag>
        </div>

        <section className={styles.block}>
          <p className="eyebrow">Resumo da jornada</p>
          <p className={styles.paragraph}>{explainability.headline}</p>
        </section>

        <section className={styles.block}>
          <p className="eyebrow">Nível de verificação dos dados</p>
          <div className={styles.verificationRow}>
            <span>{verifiedCount} verificados</span>
            <span>{pendingCount} pendentes</span>
            <span>{relatoCount} relato</span>
          </div>
        </section>

        <section className={styles.block}>
          <p className="eyebrow">Principais evidências</p>
          <ul className={styles.evidenceList}>
            {topEvidence.map((e) => (
              <li key={e.id}>
                <div className={styles.evidenceHead}>
                  <span className={styles.evidenceTitle}>{e.title}</span>
                  <StatusPill status={e.status} />
                </div>
                <p className={styles.evidenceValue}>{e.currentValue}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.block}>
          <p className="eyebrow">Conexões familiares relevantes</p>
          {similarities && similarities.length > 0 && (
            <p className={styles.paragraph}>{similarities[0].message}</p>
          )}
          <ul className={styles.familyList}>
            {family.map((m) => (
              <li key={m.id}>
                <span>
                  {m.relation} — {m.name}
                </span>
                <span className={styles.familyMeta}>{CONSENT_LABEL[m.consent]}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.block}>
          <p className="eyebrow">Observações territoriais</p>
          <p className={styles.paragraph}>
            {territory.ubs} · {territory.microarea}. {territory.journeysInRegion.toLocaleString('pt-BR')} jornadas
            acompanhadas na região, com {territory.openMissions} missões abertas. Padrão recorrente: {territory.recurrentPatterns[0]}.
          </p>
        </section>

        <section className={styles.recommendation}>
          <p className={styles.recommendationLabel}>Recomendação assistencial</p>
          <p className={styles.paragraph}>
            Priorizar revisão clínica coordenada desta jornada, com foco em confirmar o histórico familiar
            relatado e retomar o encaminhamento interrompido. Esta é uma sugestão de investigação — não
            substitui avaliação médica.
          </p>
        </section>

        <p className={styles.disclaimer}>Classificação demonstrativa — não representa avaliação clínica nem diagnóstico médico.</p>
      </Panel>
    </div>
  )
}
