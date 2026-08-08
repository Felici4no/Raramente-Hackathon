import React, { useState, useTransition } from 'react';
import {
  Sparkles,
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  Plus,
  Minus,
  RotateCcw,
  Clock,
  UserCheck,
  Send,
  Loader2,
  Check
} from 'lucide-react';

const SIGNAL_DEFINITIONS = [
  { id: 'historicoFamiliar',        label: 'Histórico familiar semelhante',  weight: 2 },
  { id: 'atrasoDesenvolvimento',    label: 'Atraso no desenvolvimento',      weight: 2 },
  { id: 'comprometimentoMotor',     label: 'Comprometimento motor',          weight: 1 },
  { id: 'manifestacaoInfancia',     label: 'Manifestação desde a infância',  weight: 1 },
  { id: 'sintomasPersistentes',     label: 'Sintomas persistentes',          weight: 1 },
  { id: 'multiplosSistemas',        label: 'Múltiplos sistemas afetados',    weight: 1 },
  { id: 'tratamentosSemResolucao',  label: 'Tratamentos sem resolução',      weight: 1 },
  { id: 'multiplosEncaminhamentos', label: 'Múltiplos encaminhamentos',      weight: 1 },
];

const PRESETS = {
  pacienteA: {
    id: 'pacienteA',
    name: 'Marcos',
    age: 34,
    trackingTime: '2 meses',
    atendimentos: 2,
    especialidades: 1,
    tempoSemResolucao: 2,
    signals: {
      historicoFamiliar: false,
      atrasoDesenvolvimento: false,
      comprometimentoMotor: false,
      manifestacaoInfancia: false,
      sintomasPersistentes: false,
      multiplosSistemas: false,
      tratamentosSemResolucao: false,
      multiplosEncaminhamentos: false,
    },
    timeline: [
      { date: '2 meses atrás', text: 'Primeiro atendimento na UBS Centro' },
      { date: '1 mês atrás',   text: 'Retorno clínico com boa resposta ao tratamento' },
    ],
  },
  pacienteB: {
    id: 'pacienteB',
    name: 'Lia',
    age: 7,
    trackingTime: '3 anos',
    atendimentos: 11,
    especialidades: 4,
    tempoSemResolucao: 36,
    signals: {
      historicoFamiliar: true,
      atrasoDesenvolvimento: true,
      comprometimentoMotor: true,
      manifestacaoInfancia: true,
      sintomasPersistentes: true,
      multiplosSistemas: true,
      tratamentosSemResolucao: true,
      multiplosEncaminhamentos: true,
    },
    timeline: [
      { date: '2023', text: 'Primeiro atendimento na UBS (dificuldade motora)' },
      { date: '2024', text: 'Consulta Neurologia pediátrica' },
      { date: '2024', text: 'Encaminhamento Fisioterapia' },
      { date: '2025', text: 'Atendimento por Ortopedia' },
      { date: '2026', text: 'ACS registra histórico familiar de fraqueza nas pernas' },
    ],
  },
};

function runQuaTiRareEngine(atendimentos, especialidades, tempoSemResolucao, signals) {
  let score = 0;

  // Signal weights
  SIGNAL_DEFINITIONS.forEach((def) => {
    if (signals[def.id]) {
      score += def.weight;
    }
  });

  // Numeric thresholds
  if (atendimentos >= 10) score += 2;
  else if (atendimentos >= 5) score += 1;

  if (especialidades >= 4) score += 2;
  else if (especialidades >= 3) score += 1;

  if (tempoSemResolucao >= 36) score += 2;
  else if (tempoSemResolucao >= 12) score += 1;

  // Classification
  let classification = 'COMUM';
  let badgeColor = '#0B6B2B';
  let badgeBg = 'rgba(11,107,43,0.1)';
  let badgeBorder = 'rgba(11,107,43,0.25)';

  if (score >= 6) {
    classification = 'ATÍPICA';
    badgeColor = '#B45309';
    badgeBg = '#FEF3C7';
    badgeBorder = '#FDE68A';
  } else if (score >= 3) {
    classification = 'EM ATENÇÃO';
    badgeColor = '#D97706';
    badgeBg = 'rgba(217,119,6,0.1)';
    badgeBorder = 'rgba(217,119,6,0.3)';
  }

  // Reasons list for explainability
  const reasons = [];
  if (signals.historicoFamiliar) reasons.push('Histórico familiar semelhante confirmado');
  if (signals.atrasoDesenvolvimento) reasons.push('Atraso no desenvolvimento motor/global');
  if (signals.comprometimentoMotor) reasons.push('Comprometimento motor identificado');
  if (signals.manifestacaoInfancia) reasons.push('Manifestação precoce desde a infância');
  if (signals.sintomasPersistentes) reasons.push('Sintomas de curso persistente ou recorrente');
  if (signals.multiplosSistemas) reasons.push('Envolvimento de múltiplos sistemas corporais');
  if (signals.tratamentosSemResolucao) reasons.push('Falha ou ausência de resposta a tratamentos');
  if (signals.multiplosEncaminhamentos) reasons.push('Peregrinação por múltiplos encaminhamentos');

  if (atendimentos >= 5) reasons.push(`Alta frequência de atendimentos (${atendimentos} registros)`);
  if (especialidades >= 3) reasons.push(`Múltiplas especialidades consultadas (${especialidades} áreas)`);
  if (tempoSemResolucao >= 12) reasons.push(`Trajetória prolongada sem resolução diagnóstica (${tempoSemResolucao} meses)`);

  return { score, classification, badgeColor, badgeBg, badgeBorder, reasons };
}

export default function JourneyDemo() {
  const [selectedPatientId, setSelectedPatientId] = useState('pacienteB');

  // Interactive Form States
  const preset = PRESETS[selectedPatientId];
  const [atendimentos, setAtendimentos] = useState(preset.atendimentos);
  const [especialidades, setEspecialidades] = useState(preset.especialidades);
  const [tempoSemResolucao, setTempoSemResolucao] = useState(preset.tempoSemResolucao);
  const [signals, setSignals] = useState(preset.signals);
  const [timeline, setTimeline] = useState(preset.timeline);

  const [observationInput, setObservationInput] = useState('');
  const [isStale, setIsStale] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Active Analysis Result
  const [analysisResult, setAnalysisResult] = useState(() =>
    runQuaTiRareEngine(preset.atendimentos, preset.especialidades, preset.tempoSemResolucao, preset.signals)
  );

  // Switch patient preset
  const handleSelectPatient = (patientId) => {
    setSelectedPatientId(patientId);
    const newPreset = PRESETS[patientId];
    setAtendimentos(newPreset.atendimentos);
    setEspecialidades(newPreset.especialidades);
    setTempoSemResolucao(newPreset.tempoSemResolucao);
    setSignals(newPreset.signals);
    setTimeline(newPreset.timeline);
    setObservationInput('');
    setIsStale(false);
    setAnalysisResult(runQuaTiRareEngine(newPreset.atendimentos, newPreset.especialidades, newPreset.tempoSemResolucao, newPreset.signals));
  };

  // Toggle signal
  const toggleSignal = (id) => {
    setSignals((prev) => ({ ...prev, [id]: !prev[id] }));
    setIsStale(true);
  };

  // Modify numbers
  const changeAtendimentos = (delta) => {
    setAtendimentos((prev) => Math.max(1, prev + delta));
    setIsStale(true);
  };
  const changeEspecialidades = (delta) => {
    setEspecialidades((prev) => Math.max(1, prev + delta));
    setIsStale(true);
  };
  const changeTempoSemResolucao = (delta) => {
    setTempoSemResolucao((prev) => Math.max(1, prev + delta));
    setIsStale(true);
  };

  // Add observation via NLP simulation
  const handleAddObservation = (e) => {
    e.preventDefault();
    if (!observationInput.trim()) return;

    const txt = observationInput.toLowerCase();
    let updatedSignals = { ...signals };
    let addedCount = 0;

    if (txt.includes('não anda') || txt.includes('nunca andou') || txt.includes('dificuldade para andar') || txt.includes('fraqueza nas pernas') || txt.includes('andar')) {
      if (!updatedSignals.comprometimentoMotor) { updatedSignals.comprometimentoMotor = true; addedCount++; }
      if (!updatedSignals.atrasoDesenvolvimento) { updatedSignals.atrasoDesenvolvimento = true; addedCount++; }
    }
    if (txt.includes('pai') || txt.includes('mãe') || txt.includes('mae') || txt.includes('irmão') || txt.includes('irmao') || txt.includes('tio') || txt.includes('família') || txt.includes('familia') || txt.includes('familiar')) {
      if (!updatedSignals.historicoFamiliar) { updatedSignals.historicoFamiliar = true; addedCount++; }
    }
    if (txt.includes('desde criança') || txt.includes('infância') || txt.includes('infancia') || txt.includes('desde bebê') || txt.includes('precoce')) {
      if (!updatedSignals.manifestacaoInfancia) { updatedSignals.manifestacaoInfancia = true; addedCount++; }
    }

    setSignals(updatedSignals);
    setTimeline((prev) => [
      ...prev,
      { date: 'Agora', text: `Nova informação territorial: "${observationInput.trim()}"` },
    ]);
    setObservationInput('');
    setIsStale(true);

    const msg = addedCount > 0 ? `${addedCount} novos sinais identificados na observação!` : 'Observação adicionada à jornada!';
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Run analysis
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult(runQuaTiRareEngine(atendimentos, especialidades, tempoSemResolucao, signals));
      setIsAnalyzing(false);
      setIsStale(false);
    }, 700);
  };

  return (
    <section id="jornada" className="section" style={{ background: '#FFFFFF', borderTop: '1px solid var(--color-border-subtle)', borderBottom: '1px solid var(--color-border-subtle)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="badge badge-amber">
              <Sparkles size={13} aria-hidden="true" />
              Simulador de Jornada — QuaTiRare
            </span>
            <span className="badge badge-brown" style={{ fontSize: '0.72rem', textTransform: 'none' }}>
              Simulação demonstrativa
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)', fontWeight: 800, color: '#4A2F1B', marginBottom: '14px', lineHeight: 1.2 }}>
            Experimente o QuaTiRare
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#6B655F', lineHeight: 1.6 }}>
            Altere os sinais da jornada e veja como diferentes informações mudam a prioridade para investigação na atenção primária.
          </p>
        </div>

        {/* Patient Preset Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleSelectPatient('pacienteA')}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: selectedPatientId === 'pacienteA' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              background: selectedPatientId === 'pacienteA' ? 'rgba(11,107,43,0.08)' : '#FFFFFF',
              color: selectedPatientId === 'pacienteA' ? 'var(--color-primary)' : '#4A2F1B',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
              minHeight: '48px',
            }}
          >
            <CheckCircle size={18} color={selectedPatientId === 'pacienteA' ? '#0B6B2B' : '#8B5A2B'} />
            <div>
              <div style={{ textAlign: 'left' }}>Paciente A (Marcos, 34a)</div>
              <div style={{ fontSize: '0.72rem', color: '#6B655F', fontWeight: 600, textAlign: 'left' }}>Baseline: Jornada Comum</div>
            </div>
          </button>

          <button
            onClick={() => handleSelectPatient('pacienteB')}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: selectedPatientId === 'pacienteB' ? '2px solid var(--color-amber)' : '1px solid var(--color-border)',
              background: selectedPatientId === 'pacienteB' ? 'var(--color-amber-bg)' : '#FFFFFF',
              color: selectedPatientId === 'pacienteB' ? '#B45309' : '#4A2F1B',
              fontWeight: 800,
              fontSize: '0.92rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
              minHeight: '48px',
            }}
          >
            <AlertTriangle size={18} color={selectedPatientId === 'pacienteB' ? '#D97706' : '#8B5A2B'} />
            <div>
              <div style={{ textAlign: 'left' }}>Paciente B (Lia, 7a)</div>
              <div style={{ fontSize: '0.72rem', color: '#8B5A2B', fontWeight: 600, textAlign: 'left' }}>Baseline: Jornada Atípica</div>
            </div>
          </button>
        </div>

        {/* Main Simulator Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '28px',
          alignItems: 'start',
        }}>

          {/* LEFT COLUMN: Simulated Medical Record & Interactive Controls */}
          <div className="card" style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Prontuário Simulado
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4A2F1B', margin: '2px 0 0' }}>
                  {preset.name}, {preset.age} anos
                </h3>
              </div>
              <span className="badge badge-brown" style={{ fontSize: '0.75rem' }}>
                <Clock size={12} /> {preset.trackingTime} de registro
              </span>
            </div>

            {/* Steppers for Quantitative Data */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: 'var(--color-bg-warm)', padding: '12px', borderRadius: '10px', border: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8B5A2B', marginBottom: '6px' }}>ATENDIMENTOS</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <button onClick={() => changeAtendimentos(-1)} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4A2F1B', minWidth: '24px' }}>{atendimentos}</span>
                  <button onClick={() => changeAtendimentos(1)} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div style={{ background: 'var(--color-bg-warm)', padding: '12px', borderRadius: '10px', border: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8B5A2B', marginBottom: '6px' }}>ESPECIALIDADES</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <button onClick={() => changeEspecialidades(-1)} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4A2F1B', minWidth: '24px' }}>{especialidades}</span>
                  <button onClick={() => changeEspecialidades(1)} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div style={{ background: 'var(--color-bg-warm)', padding: '12px', borderRadius: '10px', border: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#8B5A2B', marginBottom: '6px' }}>SEM RESOLUÇÃO (MESES)</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <button onClick={() => changeTempoSemResolucao(-2)} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4A2F1B', minWidth: '24px' }}>{tempoSemResolucao}m</span>
                  <button onClick={() => changeTempoSemResolucao(2)} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Signal Switches / Chips */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Sinais Observados no Território / UBS (Altere para testar):
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                {SIGNAL_DEFINITIONS.map((def) => {
                  const isActive = !!signals[def.id];
                  return (
                    <button
                      key={def.id}
                      onClick={() => toggleSignal(def.id)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: isActive ? 'rgba(11,107,43,0.08)' : '#FFFFFF',
                        color: isActive ? 'var(--color-primary)' : '#4A2F1B',
                        fontSize: '0.82rem',
                        fontWeight: isActive ? 700 : 500,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textAlign: 'left',
                        transition: 'all 0.15s ease',
                        minHeight: '44px',
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '4px',
                        border: isActive ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                        background: isActive ? 'var(--color-primary)' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        flexShrink: 0,
                      }}>
                        {isActive && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span>{def.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated NLP Observation Input */}
            <form onSubmit={handleAddObservation} style={{ background: 'var(--color-bg-warm)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '8px' }}>
                Adicione uma observação territorial (Simulador de fala/áudio do ACS):
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={observationInput}
                  onChange={(e) => setObservationInput(e.target.value)}
                  placeholder="Ex.: criança de 7 anos que nunca conseguiu andar e possui familiar com sintomas semelhantes"
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-body)',
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-secondary"
                  style={{ padding: '10px 16px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                >
                  <Send size={14} />
                  <span>Adicionar à jornada</span>
                </button>
              </div>

              {toastMessage && (
                <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={12} />
                  <span>{toastMessage}</span>
                </div>
              )}
            </form>

            {/* Trigger Button */}
            <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              {isStale && (
                <div style={{ fontSize: '0.8rem', color: '#D97706', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <RotateCcw size={14} />
                  <span>Jornada alterada</span>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '14px 28px',
                  fontSize: '0.95rem',
                  background: isStale ? '#D97706' : 'var(--color-primary)',
                  boxShadow: isStale ? '0 4px 16px rgba(217,119,6,0.3)' : '0 4px 16px rgba(11,107,43,0.3)',
                }}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>QuaTiRare analisando trajetória...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>{isStale ? 'Analisar novamente' : 'Analisar jornada'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: QuaTiRare Output, Explainability & Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Classification & Result Card */}
            <div className="card" style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              borderLeft: `6px solid ${analysisResult.badgeColor}`,
              boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Resultado do Motor QuaTiRare
                </span>
                <span style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  background: analysisResult.badgeBg,
                  border: `1px solid ${analysisResult.badgeBorder}`,
                  color: analysisResult.badgeColor,
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  letterSpacing: '0.04em',
                }}>
                  JORNADA {analysisResult.classification}
                </span>
              </div>

              {/* Explainability reasons */}
              <div style={{ background: '#FFFBEB', borderRadius: '12px', padding: '18px', border: '1px solid #FCD34D', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309', fontWeight: 800, fontSize: '0.92rem', marginBottom: '12px' }}>
                  <ShieldAlert size={18} />
                  <span>Por que essa jornada chamou atenção? ({analysisResult.reasons.length} sinais relevantes)</span>
                </div>

                {analysisResult.reasons.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {analysisResult.reasons.map((r, i) => (
                      <div key={i} style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', borderLeft: '3px solid #D97706', fontSize: '0.84rem', fontWeight: 700, color: '#4A2F1B' }}>
                        ✓ {r}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.84rem', color: '#6B655F' }}>
                    Nenhum sinal crítico de exceção identificado até o momento. Acompanhamento regular na UBS.
                  </div>
                )}

                <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#0B6B2B', fontWeight: 700, background: 'rgba(11,107,43,0.06)', padding: '8px 12px', borderRadius: '6px' }}>
                  {analysisResult.classification === 'COMUM'
                    ? '✓ Trajetória mantida em acompanhamento de rotina.'
                    : '✓ Esta trajetória apresenta elementos que justificariam revisão pela equipe de saúde.'}
                </div>
              </div>

              <div style={{ fontSize: '0.72rem', color: '#8B5A2B', fontStyle: 'italic', textAlign: 'center' }}>
                Classificação demonstrativa — não representa avaliação clínica nem diagnóstico médico.
              </div>
            </div>

            {/* Compact Longitudinal Timeline */}
            <div className="card" style={{ background: '#FAF8F5', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
                Linha do Tempo Longitudinal do Paciente ({timeline.length} eventos)
              </div>

              <div className="journey-timeline">
                {timeline.map((item, i) => (
                  <div key={i} className="journey-step" style={{ padding: '8px 0' }}>
                    <div className="journey-dot" style={{ width: '28px', height: '28px', fontSize: '0.75rem', background: item.date === 'Agora' ? '#D97706' : 'var(--color-primary)', color: '#FFFFFF' }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.8rem', color: item.date === 'Agora' ? '#B45309' : '#4A2F1B' }}>
                        {item.date}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#524B45' }}>
                        {item.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
