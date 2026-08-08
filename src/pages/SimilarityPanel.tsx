import { usePhenotypes, useRelatedDiseases } from '@/hooks/useCaseData'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/ui/LoadingState'
import { Panel } from '@/components/ui/Panel'
import { PhenotypeRow } from '@/components/phenotype/PhenotypeRow'
import { RelatedDiseasesPanel } from '@/components/phenotype/RelatedDiseasesPanel'
import styles from './SimilarityPanel.module.css'

const CASE_ID = '9104'

export function SimilarityPanel() {
  const { data: phenotypes } = usePhenotypes(CASE_ID)
  const { data: relatedDiseases } = useRelatedDiseases(phenotypes?.map((p) => p.id) ?? [])

  return (
    <div className={styles.page}>
      <SectionHeading
        eyebrow="Normalização fenotípica"
        title="Phenotype Normalization"
        subtitle="Relatos livres transformados em conceitos HPO padronizados, com score de correspondência e sinônimos."
        note="Linguagem sempre associativa — 'associado a', 'compatível com investigação'. Nunca 'diagnosticado' ou 'confirmado'."
      />

      {phenotypes ? (
        <Panel raised padded>
          {phenotypes.map((p) => (
            <PhenotypeRow key={p.id} phenotype={p} />
          ))}
        </Panel>
      ) : (
        <LoadingState label="Normalizando fenótipos…" />
      )}

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Raras Knowledge Graph"
          title="Doenças associadas aos fenótipos"
          subtitle="Compatibilidade com investigação, nunca diagnóstico automático."
        />
        {relatedDiseases ? <RelatedDiseasesPanel diseases={relatedDiseases} /> : <LoadingState label="Consultando base de doenças raras…" />}
      </section>
    </div>
  )
}
