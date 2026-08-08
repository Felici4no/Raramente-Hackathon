import type {
  CaseGraphEdge,
  CaseGraphNode,
  CaseSummary,
  EvidenceCardData,
  ExplainabilityData,
  FamilyMember,
  FamilySimilarity,
  JourneyEvent,
  PhenotypeNormalization,
  Provenance,
  RelatedDisease,
  SourceDescriptor,
  TerritoryContextData,
} from '@/types/domain'

const p = (partial: Provenance): Provenance => partial

export const caseSummary: CaseSummary = {
  id: '9104',
  patientName: 'Lia',
  patientAge: 7,
  microarea: 'Microárea 04',
  listeningOrigin: 'Território — visita domiciliar (ACS)',
  currentProtocol: 'Protocolo P04 — Investigação de atraso motor',
  journeyStatus: 'atipica',
  entanglementIndex: 78,
  reconstructedPercent: 86,
  servicesInvolved: 4,
  returns: 3,
  ruptures: 1,
  monthsUnresolved: 36,
  phenotypesNormalized: 4,
  familyConnections: 2,
}

// ---------------------------------------------------------------------------
// Journey Timeline
// ---------------------------------------------------------------------------

export const journeyEvents: JourneyEvent[] = [
  {
    id: 'evt-01',
    date: '2023-02-14',
    type: 'escuta_inicial',
    category: 'assistencial',
    title: 'Escuta inicial — território',
    description: 'ACS Ana registra primeira observação: criança de 7 anos nunca conseguiu andar sem apoio.',
    provenance: p({ source: 'Nasua / Relato de Escuta', date: '2023-02-14', status: 'relato', explanation: 'Registro de campo transcrito de áudio via Nasua.' }),
  },
  {
    id: 'evt-02',
    date: '2023-03-02',
    type: 'retorno_ubs',
    category: 'assistencial',
    title: 'Consulta inicial na UBS',
    description: 'Encaminhamento clínico aberto para avaliação de atraso motor.',
    provenance: p({ source: 'QuaTiRare Journey API', sourceId: 'jr-2201', date: '2023-03-02', status: 'verificado', explanation: 'Evento sincronizado do sistema assistencial da UBS.' }),
  },
  {
    id: 'evt-03',
    date: '2023-05-20',
    type: 'exame',
    category: 'assistencial',
    title: 'Exames laboratoriais',
    description: 'Painel laboratorial inicial sem resultado conclusivo.',
    provenance: p({ source: 'QuaTiRare Journey API', sourceId: 'jr-2244', date: '2023-05-20', status: 'verificado', explanation: 'Resultado de exame registrado no prontuário assistencial.' }),
  },
  {
    id: 'evt-04',
    date: '2023-09-11',
    type: 'retorno_ubs',
    category: 'assistencial',
    title: 'Retorno à UBS — dor recorrente',
    description: 'Segundo retorno assistencial, com queixa de dor muscular recorrente.',
    provenance: p({ source: 'QuaTiRare Journey API', sourceId: 'jr-2390', date: '2023-09-11', status: 'verificado', explanation: 'Evento sincronizado do sistema assistencial da UBS.' }),
  },
  {
    id: 'evt-05',
    date: '2024-01-18',
    type: 'especialista',
    category: 'assistencial',
    title: 'Neurologia pediátrica',
    description: 'Avaliação especializada. Mãe relata que o pai também apresentava fraqueza semelhante nas pernas.',
    provenance: p({ source: 'QuaTiRare Journey API', sourceId: 'jr-2455', date: '2024-01-18', status: 'verificado', explanation: 'Consulta registrada com nota clínica estruturada.' }),
  },
  {
    id: 'evt-06',
    date: '2024-01-18',
    type: 'escuta_inicial',
    category: 'familiar',
    title: 'Relato familiar semelhante',
    description: '"O pai também tinha bastante fraqueza nas pernas" — relato colhido durante consulta de neurologia.',
    provenance: p({ source: 'Nasua / Relato de Escuta', date: '2024-01-18', status: 'relato', explanation: 'Relato não verificado independentemente; aguarda confirmação familiar.' }),
  },
  {
    id: 'evt-07',
    date: '2024-04-30',
    type: 'exame',
    category: 'assistencial',
    title: 'Novo exame de imagem',
    description: 'Investigação de imagem solicitada por três especialidades diferentes.',
    provenance: p({ source: 'QuaTiRare Journey API', sourceId: 'jr-2588', date: '2024-04-30', status: 'verificado', explanation: 'Solicitação registrada em três encaminhamentos distintos.' }),
  },
  {
    id: 'evt-08',
    date: '2024-08-06',
    type: 'encaminhamento',
    category: 'assistencial',
    title: 'Encaminhamento à ortopedia',
    description: 'Encaminhamento assistencial para avaliação ortopédica complementar.',
    provenance: p({ source: 'QuaTiRare Journey API', sourceId: 'jr-2650', date: '2024-08-06', status: 'verificado', explanation: 'Encaminhamento formal entre serviços da rede.' }),
  },
  {
    id: 'evt-09',
    date: '2025-02-12',
    type: 'ruptura',
    category: 'assistencial',
    title: 'Ruptura assistencial',
    description: 'Encaminhamento à fisioterapia interrompido — família não retornou por 5 meses.',
    provenance: p({ source: 'QuaTiRare Journey API', sourceId: 'jr-2711', date: '2025-02-12', status: 'verificado', explanation: 'Ausência de eventos subsequentes por período acima do limiar de ruptura (90 dias).' }),
  },
  {
    id: 'evt-10',
    date: '2025-07-03',
    type: 'especialista',
    category: 'assistencial',
    title: 'Atendimento por ortopedia',
    description: 'Retorno ao cuidado após ruptura, sem resolução diagnóstica.',
    provenance: p({ source: 'QuaTiRare Journey API', sourceId: 'jr-2790', date: '2025-07-03', status: 'verificado', explanation: 'Evento sincronizado do sistema assistencial.' }),
  },
  {
    id: 'evt-11',
    date: '2026-06-22',
    type: 'escuta_inicial',
    category: 'fenotipico',
    title: 'Normalização fenotípica — atraso motor',
    description: '"Nunca conseguiu andar" normalizado para HP:0001260 (Atraso motor).',
    provenance: p({ source: 'HPO Normalization Service', date: '2026-06-22', status: 'verificado', explanation: 'Normalização automática a partir do relato original, com score de correspondência 0.91.' }),
  },
  {
    id: 'evt-12',
    date: '2026-07-30',
    type: 'escuta_inicial',
    category: 'familiar',
    title: 'ACS registra histórico familiar de fraqueza nas pernas',
    description: 'Visita domiciliar de seguimento confirma relato anterior sobre o pai.',
    provenance: p({ source: 'Nasua / Relato de Escuta', date: '2026-07-30', status: 'pendente', explanation: 'Aguardando confirmação por consentimento formal do familiar.' }),
  },
  {
    id: 'evt-13',
    date: '2026-08-04',
    type: 'protocolo',
    category: 'protocolo',
    title: 'Protocolo P04 gerado',
    description: 'Motor de triagem sugere abertura de protocolo de investigação para atraso motor com histórico familiar.',
    provenance: p({ source: 'QuaTiRare Journey API', sourceId: 'proto-P04-9104', date: '2026-08-04', status: 'verificado', explanation: 'Protocolo gerado a partir de regras de classificação assistencial.' }),
  },
  {
    id: 'evt-14',
    date: '2026-08-08',
    type: 'revisao',
    category: 'revisao',
    title: 'Sugestão de revisão clínica',
    description: 'Jornada sinalizada para revisão por equipe médica devido a padrão atípico e possível conexão familiar.',
    provenance: p({ source: 'QuaTiRare Journey API', date: '2026-08-08', status: 'pendente', explanation: 'Sinalização gerada por índice de enredamento acima do limiar (78/100).' }),
  },
]

// ---------------------------------------------------------------------------
// Evidence Wall
// ---------------------------------------------------------------------------

export const evidenceCards: EvidenceCardData[] = [
  {
    id: 'ev-01',
    category: 'FENOTIPO',
    title: 'Fenótipo HPO — Fraqueza muscular',
    currentValue: 'Normalizado a partir de relato familiar',
    interpretation: 'Pode contribuir para semelhança entre jornadas dentro da mesma família.',
    threshold: 'Score de correspondência ≥ 0.80',
    impact: 'Reforça hipótese de padrão hereditário a investigar.',
    falsifier: 'Ausência de confirmação clínica direta enfraquece a evidência.',
    status: 'pendente',
    provenance: p({ source: 'Nasua / Relato de Escuta', date: '2026-08-08', status: 'pendente', explanation: 'Relato colhido em visita domiciliar, ainda não confirmado clinicamente.' }),
  },
  {
    id: 'ev-02',
    category: 'SERVICO',
    title: 'Múltiplos retornos à UBS',
    currentValue: '3 retornos',
    interpretation: 'Repetição assistencial sem resolução aponta para dificuldade de diagnóstico na atenção primária.',
    threshold: '2+ retornos = repetição assistencial',
    impact: 'Eleva a complexidade percebida da jornada.',
    status: 'verificado',
    provenance: p({ source: 'QuaTiRare Journey API', date: '2026-08-04', status: 'verificado', explanation: 'Contagem derivada de eventos sincronizados do sistema assistencial.' }),
  },
  {
    id: 'ev-03',
    category: 'FAMILIA',
    title: 'Conexão encontrada em duas jornadas da rede',
    currentValue: 'Jornada da mãe e da filha compartilham sinais assistenciais',
    interpretation: 'Sugere revisar a história em conjunto, sem afirmar causa comum.',
    falsifier: 'Confirmação de eventos independentes e não relacionados enfraquece esta pista.',
    status: 'pendente',
    provenance: p({ source: 'Family Network', date: '2026-07-30', status: 'pendente', explanation: 'Conexão sugerida por similaridade de sinais, ainda sem consentimento formal.' }),
  },
  {
    id: 'ev-04',
    category: 'EVENTO',
    title: 'Ruptura assistencial documentada',
    currentValue: '5 meses sem retorno após encaminhamento',
    interpretation: 'Interrupção prolongada pode mascarar agravamento não observado.',
    threshold: 'Ausência > 90 dias = ruptura',
    impact: 'Fator relevante para priorização de revisão.',
    status: 'verificado',
    provenance: p({ source: 'QuaTiRare Journey API', date: '2025-07-03', status: 'verificado', explanation: 'Intervalo calculado entre encaminhamento e retorno subsequente.' }),
  },
  {
    id: 'ev-05',
    category: 'PROTOCOLO',
    title: 'Protocolo P04 — Investigação de atraso motor',
    currentValue: 'Ativo desde 2026-08-04',
    interpretation: 'Protocolo orienta próximos passos assistenciais, sem definir diagnóstico.',
    status: 'verificado',
    provenance: p({ source: 'QuaTiRare Journey API', date: '2026-08-04', status: 'verificado', explanation: 'Gerado por regra de classificação assistencial do motor QuaTiRare.' }),
  },
  {
    id: 'ev-06',
    category: 'TERRITORIO',
    title: 'Microárea com padrão assistencial recorrente',
    currentValue: 'Microárea 04 — 7 prioridades para revisão',
    interpretation: 'Concentração territorial pode indicar fator ambiental, de acesso ou sub-registro.',
    status: 'verificado',
    provenance: p({ source: 'Territory Registry', date: '2026-08-01', status: 'verificado', explanation: 'Agregado territorial calculado a partir de jornadas da microárea.' }),
  },
  {
    id: 'ev-07',
    category: 'ALERTA',
    title: 'Tempo sem resolução acima da média',
    currentValue: '36 meses sem resolução diagnóstica',
    interpretation: 'Tempo prolongado eleva prioridade de revisão clínica.',
    threshold: 'Média da microárea: 14 meses',
    impact: 'Um dos principais fatores do índice de enredamento.',
    status: 'verificado',
    provenance: p({ source: 'QuaTiRare Journey API', date: '2026-08-08', status: 'verificado', explanation: 'Calculado a partir da data do primeiro evento assistencial registrado.' }),
  },
  {
    id: 'ev-08',
    category: 'CONEXAO',
    title: 'Três especialidades consultadas',
    currentValue: 'Neurologia, Ortopedia, Fisioterapia',
    interpretation: 'Peregrinação por múltiplas especialidades sem convergência diagnóstica.',
    threshold: '3+ especialidades = peregrinação',
    impact: 'Reforça necessidade de revisão coordenada.',
    status: 'verificado',
    provenance: p({ source: 'QuaTiRare Journey API', date: '2026-08-04', status: 'verificado', explanation: 'Especialidades derivadas dos eventos de encaminhamento e consulta.' }),
  },
  {
    id: 'ev-09',
    category: 'FONTE',
    title: 'Origem predominante: relato de escuta',
    currentValue: '4 de 14 eventos vêm de relato não verificado',
    interpretation: 'Parte relevante da jornada ainda depende de confirmação formal.',
    status: 'pendente',
    provenance: p({ source: 'Nasua / Relato de Escuta', date: '2026-08-08', status: 'pendente', explanation: 'Proporção calculada sobre o total de eventos da linha do tempo.' }),
  },
]

// ---------------------------------------------------------------------------
// Phenotype normalization + related diseases
// ---------------------------------------------------------------------------

export const phenotypes: PhenotypeNormalization[] = [
  {
    id: 'phe-01',
    originalReport: '"nunca conseguiu andar"',
    normalizedTerm: 'Atraso motor / marcha independente ausente',
    hpoId: 'HP:0001260',
    matchScore: 0.91,
    synonyms: ['Motor delay', 'Failure to achieve independent gait'],
    relatedDiseasesCount: 12,
    provenance: p({ source: 'HPO Normalization Service', date: '2026-06-22', status: 'verificado', explanation: 'Normalização automática a partir de relato de escuta transcrito.' }),
  },
  {
    id: 'phe-02',
    originalReport: '"dor nas pernas que volta sempre"',
    normalizedTerm: 'Mialgia recorrente',
    hpoId: 'HP:0003326',
    matchScore: 0.84,
    synonyms: ['Recurrent muscle pain', 'Myalgia'],
    relatedDiseasesCount: 9,
    provenance: p({ source: 'HPO Normalization Service', date: '2023-09-11', status: 'verificado', explanation: 'Normalização a partir de nota clínica da UBS.' }),
  },
  {
    id: 'phe-03',
    originalReport: '"pai também tinha bastante fraqueza nas pernas"',
    normalizedTerm: 'Fraqueza muscular de membros inferiores (relato familiar)',
    hpoId: 'HP:0007340',
    matchScore: 0.77,
    synonyms: ['Lower limb muscle weakness'],
    relatedDiseasesCount: 15,
    provenance: p({ source: 'HPO Normalization Service', date: '2026-07-30', status: 'pendente', explanation: 'Relato familiar de segunda mão, normalização com confiança reduzida.' }),
  },
  {
    id: 'phe-04',
    originalReport: '"desde bebê ela é mais molinha que os outros"',
    normalizedTerm: 'Hipotonia de início precoce',
    hpoId: 'HP:0008947',
    matchScore: 0.72,
    synonyms: ['Early-onset hypotonia', 'Neonatal hypotonia'],
    relatedDiseasesCount: 18,
    provenance: p({ source: 'HPO Normalization Service', date: '2023-02-14', status: 'pendente', explanation: 'Termo coloquial normalizado com confiança moderada — recomenda-se validação clínica.' }),
  },
]

export const relatedDiseases: RelatedDisease[] = [
  { id: 'rd-01', name: 'Distrofia muscular de cinturas', orphaCode: 'ORPHA:34515', sharedPhenotypes: 3, note: 'Associado a padrões de fraqueza muscular e atraso motor reportados.' },
  { id: 'rd-02', name: 'Doença de Charcot-Marie-Tooth', orphaCode: 'ORPHA:64748', sharedPhenotypes: 2, note: 'Compatível com investigação por histórico familiar de fraqueza distal.' },
  { id: 'rd-03', name: 'Miopatia congênita', orphaCode: 'ORPHA:589', sharedPhenotypes: 3, note: 'Relacionado por hipotonia precoce e atraso motor combinados.' },
  { id: 'rd-04', name: 'Ataxia hereditária', orphaCode: 'ORPHA:98755', sharedPhenotypes: 1, note: 'Associação fraca — apenas um fenótipo compartilhado, requer mais dados.' },
]

// ---------------------------------------------------------------------------
// Family network
// ---------------------------------------------------------------------------

export const familyMembers: FamilyMember[] = [
  {
    id: 'fam-mae',
    name: 'Marta (mãe)',
    relation: 'Mãe',
    consent: 'autorizado',
    journeyPercent: 40,
    protocolsCount: 0,
    newConnections: 1,
    pendingInfo: 0,
    sharedSignals: ['Relato de sintomas semelhantes no cônjuge', 'Acompanhamento contínuo das consultas'],
    provenance: p({ source: 'Family Network', date: '2026-07-30', status: 'verificado', explanation: 'Consentimento formal registrado na visita domiciliar.' }),
  },
  {
    id: 'fam-pai',
    name: 'João (pai)',
    relation: 'Pai',
    consent: 'pendente',
    journeyPercent: 12,
    protocolsCount: 0,
    newConnections: 1,
    pendingInfo: 2,
    sharedSignals: ['Fraqueza nas pernas (relato de terceiros)', 'Sem consulta assistencial própria registrada'],
    provenance: p({ source: 'Family Network', date: '2026-07-30', status: 'pendente', explanation: 'Consentimento ainda não obtido diretamente do familiar.' }),
  },
  {
    id: 'fam-irma',
    name: 'Sofia (irmã, 4a)',
    relation: 'Irmã(o)',
    consent: 'nao_informado',
    journeyPercent: 0,
    protocolsCount: 0,
    newConnections: 0,
    pendingInfo: 1,
    sharedSignals: ['Sem sinais reportados até o momento'],
    provenance: p({ source: 'Family Network', date: '2026-07-30', status: 'relato', explanation: 'Mencionada na visita, sem jornada própria ainda registrada.' }),
  },
]

export const familySimilarities: FamilySimilarity[] = [
  {
    id: 'sim-01',
    members: ['Lia (#9104)', 'Marta — histórico gestacional (#7732)'],
    message: 'Encontramos informações semelhantes em duas jornadas da rede.',
    sharedSignals: ['Manifestação precoce', 'Acompanhamento na mesma UBS'],
  },
]

// ---------------------------------------------------------------------------
// Territory
// ---------------------------------------------------------------------------

export const territoryContext: TerritoryContextData = {
  microarea: 'Microárea 04',
  ubs: 'UBS Parque das Nações',
  listeningOrigin: 'Visita domiciliar (ACS Ana)',
  journeysInRegion: 1420,
  recurrentPatterns: ['Peregrinação por especialidades', 'Rupturas após encaminhamento', 'Relatos familiares não verificados'],
  openMissions: 3,
  recentActions: [
    { label: 'Visita domiciliar registrada e geolocalizada', date: '2026-07-30' },
    { label: 'Histórico familiar confirmado pelo ACS', date: '2026-07-30' },
    { label: 'Acompanhamento com continuidade de cuidado', date: '2026-06-10' },
  ],
  regionAverageEntanglement: 41,
  caseEntanglement: 78,
}

// ---------------------------------------------------------------------------
// Explainability
// ---------------------------------------------------------------------------

export const explainability: ExplainabilityData = {
  headline:
    'Esta jornada se destaca por múltiplos retornos à rede, longo tempo sem resolução, ruptura assistencial documentada e uma conexão semelhante em outra jornada familiar.',
  contributingFactors: [
    { id: 'f1', text: 'Múltiplos retornos à UBS sem resolução (3 registros)', weight: 'alto' },
    { id: 'f2', text: 'Tempo sem resolução diagnóstica muito acima da média da microárea (36 vs. 14 meses)', weight: 'alto' },
    { id: 'f3', text: 'Ruptura assistencial documentada de 5 meses', weight: 'alto' },
    { id: 'f4', text: 'Peregrinação por três especialidades diferentes', weight: 'medio' },
    { id: 'f5', text: 'Relato familiar de sintomas semelhantes no pai', weight: 'medio' },
    { id: 'f6', text: 'Conexão de sinais com outra jornada da rede (mãe)', weight: 'baixo' },
  ],
  reportedOnly: [
    'Fraqueza nas pernas do pai (relato indireto, sem consulta própria)',
    'Início da hipotonia "desde bebê" (relato materno, termo coloquial)',
  ],
  verified: [
    'Três retornos assistenciais à UBS',
    'Encaminhamentos para neurologia e ortopedia',
    'Intervalo de 5 meses sem retorno após encaminhamento',
    'Normalização HPO de "nunca conseguiu andar" (score 0.91)',
  ],
  reinforcingConnections: [
    'Similaridade de sinais com jornada da mãe registrada na mesma UBS',
    'Concentração de casos com padrão semelhante na Microárea 04',
  ],
  missingData: [
    'Consentimento formal do pai para vincular sua jornada',
    'Confirmação clínica direta da fraqueza muscular relatada',
    'Resultado do exame de imagem mais recente',
  ],
}

// ---------------------------------------------------------------------------
// Source registry (provenance reference)
// ---------------------------------------------------------------------------

export const sourceRegistry: SourceDescriptor[] = [
  {
    name: 'QuaTiRare Journey API',
    kind: 'API',
    description: 'Eventos da jornada assistencial, protocolos e classificação de risco. Fonte primária de eventos verificados.',
    reliability: 'alta',
  },
  {
    name: 'Raras Knowledge Graph',
    kind: 'API',
    description: 'Base pública de fenótipos, doenças e relações doença–fenótipo (referência ORPHANET/HPO).',
    reliability: 'alta',
  },
  {
    name: 'HPO Normalization Service',
    kind: 'API',
    description: 'Serviço de normalização de descrições textuais livres para termos HPO padronizados.',
    reliability: 'media',
  },
  {
    name: 'Territory Registry',
    kind: 'Registro',
    description: 'Dados agregados de microárea, UBS e padrões territoriais assistenciais.',
    reliability: 'alta',
  },
  {
    name: 'Family Network',
    kind: 'Registro',
    description: 'Relações familiares, consentimento e conexões entre jornadas da rede.',
    reliability: 'media',
  },
  {
    name: 'Nasua / Relato de Escuta',
    kind: 'Relato',
    description: 'Transcrição de áudio de campo (ACS) processada por IA. Não verificado clinicamente até confirmação.',
    reliability: 'variavel',
  },
  {
    name: 'Wikipedia',
    kind: 'API',
    description: 'Fonte contextual/enciclopédica sobre a condição (PT-BR, com fallback EN). Nunca tratada como evidência clínica — RARAS e HPO permanecem a camada investigativa principal.',
    reliability: 'variavel',
  },
]

// ---------------------------------------------------------------------------
// Graph
// ---------------------------------------------------------------------------

export const graphNodes: CaseGraphNode[] = [
  { id: 'n-pessoa', type: 'pessoa', label: 'Lia, 7a', sublabel: 'Caso #9104', description: 'Criança acompanhada pelo território, centro da jornada investigada.', relevance: 'Pessoa central do caso em revisão.', provenance: p({ source: 'QuaTiRare Journey API', date: '2026-08-08', status: 'verificado', explanation: 'Identidade da jornada consolidada no sistema.' }) },
  { id: 'n-mae', type: 'familiar', label: 'Marta', sublabel: 'Mãe', description: 'Acompanha as consultas e reportou o histórico do cônjuge.', relevance: 'Origem do relato familiar central para a hipótese investigativa.', provenance: p({ source: 'Family Network', date: '2026-07-30', status: 'verificado', explanation: 'Consentimento formal registrado.' }) },
  { id: 'n-pai', type: 'familiar', label: 'João', sublabel: 'Pai', description: 'Relatado com fraqueza semelhante nas pernas; sem consulta própria.', relevance: 'Possível padrão hereditário a confirmar.', provenance: p({ source: 'Family Network', date: '2026-07-30', status: 'pendente', explanation: 'Aguardando consentimento direto.' }) },
  { id: 'n-irma', type: 'familiar', label: 'Sofia, 4a', sublabel: 'Irmã', description: 'Sem sinais reportados até o momento.', relevance: 'Monitoramento preventivo sugerido.', provenance: p({ source: 'Family Network', date: '2026-07-30', status: 'relato', explanation: 'Mencionada, sem jornada própria.' }) },

  { id: 'n-ubs', type: 'servico', label: 'UBS Parque das Nações', description: 'Unidade Básica de Saúde de referência da microárea.', relevance: 'Porta de entrada assistencial, 3 retornos registrados.', provenance: p({ source: 'QuaTiRare Journey API', date: '2026-08-04', status: 'verificado', explanation: 'Serviço vinculado a múltiplos eventos da jornada.' }) },
  { id: 'n-neuro', type: 'servico', label: 'Neurologia pediátrica', description: 'Especialidade responsável pela primeira avaliação neurológica.', relevance: 'Origem do relato familiar sobre o pai.', provenance: p({ source: 'QuaTiRare Journey API', date: '2024-01-18', status: 'verificado', explanation: 'Consulta registrada no sistema assistencial.' }) },
  { id: 'n-orto', type: 'servico', label: 'Ortopedia', description: 'Avaliação complementar após ruptura assistencial.', relevance: 'Reengajamento da jornada após 5 meses de ausência.', provenance: p({ source: 'QuaTiRare Journey API', date: '2025-07-03', status: 'verificado', explanation: 'Evento sincronizado do sistema assistencial.' }) },
  { id: 'n-fisio', type: 'servico', label: 'Fisioterapia', description: 'Encaminhamento interrompido — ruptura assistencial.', relevance: 'Ponto de ruptura mais relevante da jornada.', provenance: p({ source: 'QuaTiRare Journey API', date: '2025-02-12', status: 'verificado', explanation: 'Ausência de eventos subsequentes por 5 meses.' }) },

  { id: 'n-evt-escuta', type: 'evento', label: 'Escuta inicial', sublabel: '2023-02-14', description: 'Primeira observação territorial sobre atraso motor.', relevance: 'Ponto de partida da jornada reconstruída.', provenance: p({ source: 'Nasua / Relato de Escuta', date: '2023-02-14', status: 'relato', explanation: 'Registro de campo via Nasua.' }) },
  { id: 'n-evt-ruptura', type: 'evento', label: 'Ruptura assistencial', sublabel: '2025-02-12', description: '5 meses sem retorno após encaminhamento à fisioterapia.', relevance: 'Fator de alto peso no índice de enredamento.', provenance: p({ source: 'QuaTiRare Journey API', date: '2025-02-12', status: 'verificado', explanation: 'Intervalo acima do limiar de ruptura (90 dias).' }) },
  { id: 'n-evt-familiar', type: 'evento', label: 'Relato familiar semelhante', sublabel: '2024-01-18', description: '"O pai também tinha bastante fraqueza nas pernas."', relevance: 'Base da hipótese de padrão hereditário.', provenance: p({ source: 'Nasua / Relato de Escuta', date: '2024-01-18', status: 'relato', explanation: 'Relato colhido durante consulta, não verificado de forma independente.' }) },

  { id: 'n-fen-motor', type: 'fenotipo', label: 'Atraso motor', sublabel: 'HP:0001260', description: 'Marcha independente ausente aos 7 anos.', relevance: 'Fenótipo central, normalizado com alta confiança (0.91).', provenance: p({ source: 'HPO Normalization Service', date: '2026-06-22', status: 'verificado', explanation: 'Normalização automática validada.' }) },
  { id: 'n-fen-fraqueza', type: 'fenotipo', label: 'Fraqueza muscular', sublabel: 'HP:0007340', description: 'Relatada no pai, membros inferiores.', relevance: 'Reforça hipótese de padrão familiar a investigar.', provenance: p({ source: 'HPO Normalization Service', date: '2026-07-30', status: 'pendente', explanation: 'Normalização com confiança reduzida (relato de segunda mão).' }) },
  { id: 'n-fen-mialgia', type: 'fenotipo', label: 'Mialgia recorrente', sublabel: 'HP:0003326', description: 'Dor muscular recorrente reportada em retorno assistencial.', relevance: 'Sintoma persistente ao longo da jornada.', provenance: p({ source: 'HPO Normalization Service', date: '2023-09-11', status: 'verificado', explanation: 'Normalização a partir de nota clínica.' }) },

  { id: 'n-protocolo', type: 'protocolo', label: 'Protocolo P04', sublabel: 'Investigação de atraso motor', description: 'Protocolo assistencial ativo sugerindo próximos passos de investigação.', relevance: 'Ação assistencial vigente para o caso.', provenance: p({ source: 'QuaTiRare Journey API', date: '2026-08-04', status: 'verificado', explanation: 'Gerado por regra de classificação do motor QuaTiRare.' }) },

  { id: 'n-fonte-nasua', type: 'fonte', label: 'Nasua', sublabel: 'Interface conversacional', description: 'Canal de captura de relatos territoriais via áudio/WhatsApp.', relevance: 'Origem de 4 dos 14 eventos da jornada.', provenance: p({ source: 'Nasua / Relato de Escuta', date: '2026-08-08', status: 'relato', explanation: 'Fonte de relato, não verificada clinicamente por padrão.' }) },
  { id: 'n-fonte-esus', type: 'fonte', label: 'e-SUS / Journey API', description: 'Registros assistenciais sincronizados do sistema de saúde.', relevance: 'Origem da maior parte dos eventos verificados.', provenance: p({ source: 'QuaTiRare Journey API', date: '2026-08-08', status: 'verificado', explanation: 'Fonte primária de eventos assistenciais.' }) },

  { id: 'n-sinal-enredamento', type: 'sinal', label: 'Índice de enredamento 78/100', description: 'Sinal agregado calculado a partir de múltiplos fatores da jornada.', relevance: 'Justifica a priorização desta jornada para revisão.', provenance: p({ source: 'QuaTiRare Journey API', date: '2026-08-08', status: 'verificado', explanation: 'Cálculo interno do motor de triagem, explicável por fator.' }) },
]

export const graphEdges: CaseGraphEdge[] = [
  { id: 'e1', source: 'n-pessoa', target: 'n-mae', type: 'relacionado_a', label: 'filha de' },
  { id: 'e2', source: 'n-pessoa', target: 'n-pai', type: 'relacionado_a', label: 'filha de' },
  { id: 'e3', source: 'n-pessoa', target: 'n-irma', type: 'relacionado_a', label: 'irmã de' },

  { id: 'e4', source: 'n-pessoa', target: 'n-evt-escuta', type: 'relatado_por', label: 'relatado por' },
  { id: 'e5', source: 'n-pessoa', target: 'n-ubs', type: 'percorrido_em', label: 'percorrido em' },
  { id: 'e6', source: 'n-pessoa', target: 'n-neuro', type: 'percorrido_em', label: 'percorrido em' },
  { id: 'e7', source: 'n-pessoa', target: 'n-orto', type: 'percorrido_em', label: 'percorrido em' },
  { id: 'e8', source: 'n-pessoa', target: 'n-fisio', type: 'percorrido_em', label: 'percorrido em' },

  { id: 'e9', source: 'n-fisio', target: 'n-evt-ruptura', type: 'gerou_protocolo', label: 'originou' },
  { id: 'e10', source: 'n-neuro', target: 'n-evt-familiar', type: 'originado_em', label: 'originado em' },
  { id: 'e11', source: 'n-pai', target: 'n-evt-familiar', type: 'relatado_por', label: 'relatado por' },

  { id: 'e12', source: 'n-evt-escuta', target: 'n-fen-motor', type: 'associado_a', label: 'associado a' },
  { id: 'e13', source: 'n-evt-familiar', target: 'n-fen-fraqueza', type: 'associado_a', label: 'associado a' },
  { id: 'e14', source: 'n-ubs', target: 'n-fen-mialgia', type: 'associado_a', label: 'associado a' },
  { id: 'e15', source: 'n-fen-motor', target: 'n-fen-fraqueza', type: 'similar_a', label: 'similar a' },

  { id: 'e16', source: 'n-pessoa', target: 'n-protocolo', type: 'gerou_protocolo', label: 'gerou protocolo' },
  { id: 'e17', source: 'n-evt-ruptura', target: 'n-protocolo', type: 'gerou_protocolo', label: 'gerou protocolo' },
  { id: 'e18', source: 'n-fen-fraqueza', target: 'n-protocolo', type: 'gerou_protocolo', label: 'gerou protocolo' },

  { id: 'e19', source: 'n-evt-escuta', target: 'n-fonte-nasua', type: 'originado_em', label: 'originado em' },
  { id: 'e20', source: 'n-evt-familiar', target: 'n-fonte-nasua', type: 'originado_em', label: 'originado em' },
  { id: 'e21', source: 'n-evt-ruptura', target: 'n-fonte-esus', type: 'originado_em', label: 'originado em' },
  { id: 'e22', source: 'n-fen-motor', target: 'n-fonte-esus', type: 'confirmado_por', label: 'confirmado por' },

  { id: 'e23', source: 'n-protocolo', target: 'n-sinal-enredamento', type: 'associado_a', label: 'associado a' },
  { id: 'e24', source: 'n-evt-ruptura', target: 'n-sinal-enredamento', type: 'associado_a', label: 'associado a' },
  { id: 'e25', source: 'n-fen-fraqueza', target: 'n-sinal-enredamento', type: 'associado_a', label: 'associado a' },
]
