import type { ChartDatum } from '@/types/domain'

export const eventTypeDistribution: ChartDatum[] = [
  { label: 'Assistencial', value: 8 },
  { label: 'Familiar', value: 2 },
  { label: 'Fenotípico', value: 1 },
  { label: 'Protocolo', value: 1 },
  { label: 'Revisão', value: 1 },
]

export const resolutionOverTime: ChartDatum[] = [
  { label: '2023', value: 0, meses: 0 },
  { label: '2024', value: 12, meses: 12 },
  { label: '2025', value: 24, meses: 24 },
  { label: '2026', value: 36, meses: 36 },
]

export const servicesFrequency: ChartDatum[] = [
  { label: 'UBS', value: 3 },
  { label: 'Neurologia', value: 1 },
  { label: 'Ortopedia', value: 2 },
  { label: 'Fisioterapia', value: 1 },
]

export const phenotypesByOrigin: ChartDatum[] = [
  { label: 'Relato territorial', value: 2 },
  { label: 'Nota clínica', value: 1 },
  { label: 'Relato familiar', value: 1 },
]

export const verificationStatus: ChartDatum[] = [
  { label: 'Verificado', value: 9 },
  { label: 'Pendente', value: 3 },
  { label: 'Relato', value: 2 },
]

export const rupturesByStage: ChartDatum[] = [
  { label: 'UBS → Neuro', value: 0 },
  { label: 'Neuro → Exame', value: 0 },
  { label: 'Exame → Orto', value: 0 },
  { label: 'Orto → Fisio', value: 1 },
]

export const familyConnectionsByType: ChartDatum[] = [
  { label: 'Sinal compartilhado', value: 3 },
  { label: 'Consentimento autorizado', value: 1 },
  { label: 'Consentimento pendente', value: 2 },
]

export const protocolsOverTime: ChartDatum[] = [
  { label: '2023', value: 0 },
  { label: '2024', value: 0 },
  { label: '2025', value: 0 },
  { label: '2026', value: 1 },
]

export const microareaComparison: ChartDatum[] = [
  { label: 'Este caso', value: 78, media: 41 },
  { label: 'Média da microárea', value: 41, media: 41 },
]
