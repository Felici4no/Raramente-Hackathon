import {
  eventTypeDistribution,
  familyConnectionsByType,
  microareaComparison,
  phenotypesByOrigin,
  protocolsOverTime,
  resolutionOverTime,
  rupturesByStage,
  servicesFrequency,
  verificationStatus,
} from '@/mocks/charts'
import { ChartFrame } from './ChartFrame'
import { BarChartPanel } from './BarChartPanel'
import { LineChartPanel } from './LineChartPanel'
import { DonutChartPanel } from './DonutChartPanel'
import { ComparisonBarPanel } from './ComparisonBarPanel'
import styles from './ChartsGallery.module.css'

export function ChartsGallery() {
  return (
    <div className={styles.grid}>
      <ChartFrame
        title="Distribuição por tipo de evento"
        subtitle="Como os 14 eventos da jornada se dividem por categoria."
        note="Fonte: QuaTiRare Journey API · categorização automática por evento."
      >
        <BarChartPanel data={eventTypeDistribution} color="#1e5bb8" />
      </ChartFrame>

      <ChartFrame
        title="Tempo sem resolução ao longo do tempo"
        subtitle="Meses acumulados sem resolução diagnóstica desde o primeiro evento."
        note="Cálculo: diferença entre data do evento e primeiro registro assistencial."
      >
        <LineChartPanel data={resolutionOverTime} dataKey="meses" color="#c75b39" />
      </ChartFrame>

      <ChartFrame
        title="Serviços percorridos por frequência"
        subtitle="Quantas vezes cada serviço assistencial foi acionado nesta jornada."
        note="Fonte: QuaTiRare Journey API."
      >
        <BarChartPanel data={servicesFrequency} color="#0b6b2b" />
      </ChartFrame>

      <ChartFrame
        title="Fenótipos detectados por origem"
        subtitle="De onde vieram os relatos que originaram cada fenótipo normalizado."
        note="Fonte: HPO Normalization Service."
      >
        <BarChartPanel data={phenotypesByOrigin} color="#d97706" />
      </ChartFrame>

      <ChartFrame
        title="Status de verificação dos dados"
        subtitle="Proporção de eventos verificados, pendentes e apenas relatados."
        note="Verificado = sincronizado de sistema assistencial. Relato = escuta territorial não confirmada."
      >
        <DonutChartPanel data={verificationStatus} />
      </ChartFrame>

      <ChartFrame
        title="Rupturas por etapa da jornada"
        subtitle="Em qual transição entre serviços ocorreu interrupção do cuidado."
        note="Ruptura = ausência de evento subsequente por mais de 90 dias."
      >
        <BarChartPanel data={rupturesByStage} color="#c75b39" />
      </ChartFrame>

      <ChartFrame
        title="Conexões familiares por tipo"
        subtitle="Sinais compartilhados e status de consentimento na rede familiar."
        note="Fonte: Family Network."
      >
        <BarChartPanel data={familyConnectionsByType} color="#d97706" />
      </ChartFrame>

      <ChartFrame
        title="Protocolos acionados ao longo da jornada"
        subtitle="Quando protocolos assistenciais foram gerados para este caso."
        note="Fonte: QuaTiRare Journey API — regras de classificação assistencial."
      >
        <LineChartPanel data={protocolsOverTime} color="#1e5bb8" />
      </ChartFrame>

      <ChartFrame
        title="Jornada atual vs. média da microárea"
        subtitle="Comparativo do índice de enredamento com a média territorial."
        note="Índice de enredamento: 0–100, calculado por múltiplos fatores explicáveis."
      >
        <ComparisonBarPanel data={microareaComparison} />
      </ChartFrame>
    </div>
  )
}
