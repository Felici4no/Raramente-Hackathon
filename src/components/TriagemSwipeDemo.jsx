import React, { useState, useRef, useCallback } from 'react';
import {
  Sparkles,
  X,
  Check,
  RotateCcw,
  Users,
  Baby,
  Stethoscope,
  Activity,
  HeartPulse,
  Pill,
  Clock,
  TrendingUp,
  ShieldAlert,
  MapPin,
  Compass,
  ArrowRight,
} from 'lucide-react';

const QUESTIONS = [
  { id: 'historicoFamiliar', icon: Users, text: 'Algum parente próximo (pai, mãe ou irmão) já teve fraqueza muscular ou atraso de desenvolvimento parecido?' },
  { id: 'manifestacaoInfancia', icon: Baby, text: 'Os sintomas começaram antes dos 5 anos de idade?' },
  { id: 'multiplosEncaminhamentos', icon: Stethoscope, text: 'Essa pessoa já foi encaminhada para 3 ou mais especialistas diferentes por esse mesmo motivo, sem diagnóstico?' },
  { id: 'atrasoDesenvolvimento', icon: Activity, text: 'Há atraso para andar, falar ou aprender em comparação com outras crianças da mesma idade?' },
  { id: 'multiplosSistemas', icon: HeartPulse, text: 'Os sintomas afetam mais de uma parte do corpo ao mesmo tempo (ex.: músculos e coração, ou pele e articulações)?' },
  { id: 'tratamentosSemResolucao', icon: Pill, text: 'Os tratamentos já tentados não trouxeram melhora do quadro?' },
  { id: 'jornadaLonga', icon: Clock, text: 'Esse acompanhamento já dura mais de 1 ano sem uma causa definida?' },
  { id: 'pioraProgressiva', icon: TrendingUp, text: 'Os sintomas têm piorado nos últimos meses, em vez de melhorar?' },
];

const SWIPE_THRESHOLD = 100;
const FLY_DISTANCE = 600;

function getDestino(simCount, nome) {
  const pessoa = nome?.trim() || 'esta pessoa';
  if (simCount >= 4) {
    return {
      label: 'ENCAMINHAMENTO PRIORITÁRIO',
      color: '#B45309',
      bg: '#FEF3C7',
      border: '#FDE68A',
      destino: 'Avaliação especializada — investigação de condição rara',
      orientacao: `Vários sinais de alerta foram identificados para ${pessoa}. Registrar a triagem e encaminhar com prioridade para avaliação médica especializada, sinalizando possível caso raro.`,
    };
  }
  if (simCount >= 2) {
    return {
      label: 'ACOMPANHAMENTO EM 30 DIAS',
      color: '#D97706',
      bg: 'rgba(217,119,6,0.1)',
      border: 'rgba(217,119,6,0.3)',
      destino: 'Reavaliação com a equipe de saúde da família',
      orientacao: `Alguns sinais merecem atenção. Direcionar ${pessoa} para reavaliação com a equipe de saúde da família em até 30 dias, para acompanhar a evolução do quadro.`,
    };
  }
  return {
    label: 'CONSULTA DE ROTINA',
    color: '#0B6B2B',
    bg: 'rgba(11,107,43,0.1)',
    border: 'rgba(11,107,43,0.25)',
    destino: 'Consulta de rotina na UBS',
    orientacao: `Nenhum ou poucos sinais de alerta identificados. Direcionar ${pessoa} para consulta de rotina na Unidade Básica de Saúde — sem necessidade de encaminhamento adicional no momento.`,
  };
}

export default function TriagemSwipeDemo() {
  const [phase, setPhase] = useState('intake'); // 'intake' | 'questions' | 'result'
  const [form, setForm] = useState({ nome: '', idade: '', microarea: '' });

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [flying, setFlying] = useState(null); // 'sim' | 'nao' | null

  const pointerId = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });

  const total = QUESTIONS.length;
  const questionsDone = index >= total;
  const current = !questionsDone ? QUESTIONS[index] : null;
  const upcoming = !questionsDone ? QUESTIONS[index + 1] : null;

  const formValid = form.nome.trim().length > 1 && Number(form.idade) > 0 && form.microarea.trim().length > 1;

  const commitAnswer = useCallback((value) => {
    setFlying(value === 'sim' ? 'sim' : 'nao');
    setTimeout(() => {
      setAnswers((prev) => [...prev, { id: current.id, value }]);
      setIndex((i) => {
        const next = i + 1;
        if (next >= total) setPhase('result');
        return next;
      });
      setDrag({ x: 0, y: 0, active: false });
      setFlying(null);
    }, 260);
  }, [current, total]);

  const handlePointerDown = (e) => {
    if (flying) return;
    pointerId.current = e.pointerId;
    startPos.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, active: true });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!drag.active || e.pointerId !== pointerId.current) return;
    setDrag({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
      active: true,
    });
  };

  const handlePointerUp = (e) => {
    if (!drag.active || e.pointerId !== pointerId.current) return;
    pointerId.current = null;
    if (drag.x > SWIPE_THRESHOLD) {
      commitAnswer('sim');
    } else if (drag.x < -SWIPE_THRESHOLD) {
      commitAnswer('nao');
    } else {
      setDrag({ x: 0, y: 0, active: false });
    }
  };

  const handleRestart = () => {
    setPhase('intake');
    setForm({ nome: '', idade: '', microarea: '' });
    setIndex(0);
    setAnswers([]);
    setDrag({ x: 0, y: 0, active: false });
    setFlying(null);
  };

  const simCount = answers.filter((a) => a.value === 'sim').length;
  const resultado = getDestino(simCount, form.nome);

  // Live transform for the top card: drag offset while dragging, fly-off once committed.
  const topCardStyle = (() => {
    if (flying === 'sim') {
      return { transform: `translate(${FLY_DISTANCE}px, -60px) rotate(24deg)`, opacity: 0, transition: 'transform 0.26s ease-in, opacity 0.26s ease-in' };
    }
    if (flying === 'nao') {
      return { transform: `translate(-${FLY_DISTANCE}px, -60px) rotate(-24deg)`, opacity: 0, transition: 'transform 0.26s ease-in, opacity 0.26s ease-in' };
    }
    if (drag.active) {
      const rotate = drag.x / 18;
      return { transform: `translate(${drag.x}px, ${drag.y}px) rotate(${rotate}deg)`, transition: 'none' };
    }
    return { transform: 'translate(0, 0) rotate(0deg)', transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)' };
  })();

  const simOpacity = Math.min(1, Math.max(0, drag.x / SWIPE_THRESHOLD));
  const naoOpacity = Math.min(1, Math.max(0, -drag.x / SWIPE_THRESHOLD));

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    background: '#FFFFFF',
  };
  const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '6px' };

  return (
    <section id="triagem" className="section" style={{ background: 'var(--color-bg-warm)' }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span className="badge badge-primary">
              <Sparkles size={13} aria-hidden="true" />
              Triagem por Swipe — QuaTiRare
            </span>
            <span className="badge badge-brown" style={{ fontSize: '0.72rem', textTransform: 'none' }}>
              Simulação demonstrativa
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)', fontWeight: 800, color: '#4A2F1B', marginBottom: '14px', lineHeight: 1.2 }}>
            Responda como um ACS no território
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#6B655F', lineHeight: 1.6 }}>
            {phase === 'intake'
              ? 'Comece com os dados básicos da triagem.'
              : 'Arraste o cartão para a direita (Sim) ou esquerda (Não), ou use os botões abaixo.'}
          </p>
        </div>

        <div style={{ maxWidth: '420px', margin: '0 auto' }}>

          {phase === 'intake' && (
            <div className="card animate-fade-in">
              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle} htmlFor="triagem-nome">Nome</label>
                <input
                  id="triagem-nome"
                  type="text"
                  value={form.nome}
                  onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
                  placeholder="Nome da pessoa acompanhada"
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                <div>
                  <label style={labelStyle} htmlFor="triagem-idade">Idade</label>
                  <input
                    id="triagem-idade"
                    type="number"
                    min="0"
                    max="120"
                    value={form.idade}
                    onChange={(e) => setForm((f) => ({ ...f, idade: e.target.value }))}
                    placeholder="Anos"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="triagem-microarea">
                    <MapPin size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
                    Microárea / Bairro
                  </label>
                  <input
                    id="triagem-microarea"
                    type="text"
                    value={form.microarea}
                    onChange={(e) => setForm((f) => ({ ...f, microarea: e.target.value }))}
                    placeholder="Ex.: Microárea 03"
                    style={inputStyle}
                  />
                </div>
              </div>

              <p style={{ fontSize: '0.78rem', color: '#6B655F', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={13} />
                A região ajuda a direcionar o resultado para o serviço de saúde correto no território.
              </p>

              <button
                onClick={() => formValid && setPhase('questions')}
                disabled={!formValid}
                className="btn btn-primary"
                style={{ width: '100%', opacity: formValid ? 1 : 0.5, cursor: formValid ? 'pointer' : 'not-allowed' }}
              >
                <span>Iniciar perguntas de triagem</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {phase === 'questions' && (
            <>
              {/* Progress */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <div style={{ flex: 1, height: '6px', borderRadius: '999px', background: 'var(--color-border-subtle)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(index / total) * 100}%`,
                    height: '100%',
                    background: 'var(--color-primary)',
                    borderRadius: '999px',
                    transition: 'width 0.3s ease',
                  }} />
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-quati-brown)', whiteSpace: 'nowrap' }}>
                  {index + 1} / {total}
                </span>
              </div>

              {/* Card Stack */}
              <div style={{ position: 'relative', height: '360px', touchAction: 'none' }}>

                {/* Next card peeking behind, for depth */}
                {upcoming && (
                  <div className="card" style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: '16px',
                    transform: 'scale(0.94) translateY(10px)',
                    opacity: 0.6,
                  }}>
                    <upcoming.icon size={40} color="var(--color-quati-brown)" />
                  </div>
                )}

                {/* Top (active) card */}
                {current && (
                  <div
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                    className="card"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      gap: '20px',
                      cursor: drag.active ? 'grabbing' : 'grab',
                      userSelect: 'none',
                      ...topCardStyle,
                    }}
                  >
                    <div style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: 'var(--color-bg-warm)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <current.icon size={32} color="var(--color-primary)" />
                    </div>
                    <p style={{ fontSize: '1.15rem', fontWeight: 800, color: '#4A2F1B', lineHeight: 1.35, padding: '0 12px' }}>
                      {current.text}
                    </p>

                    {/* Drag stamps */}
                    <span aria-hidden="true" style={{
                      position: 'absolute', top: '24px', right: '20px',
                      padding: '6px 14px', borderRadius: '8px', border: '3px solid #0B6B2B',
                      color: '#0B6B2B', fontFamily: 'var(--font-heading)', fontWeight: 900,
                      fontSize: '1.1rem', letterSpacing: '0.04em', transform: 'rotate(-12deg)',
                      opacity: simOpacity, pointerEvents: 'none',
                    }}>
                      SIM
                    </span>
                    <span aria-hidden="true" style={{
                      position: 'absolute', top: '24px', left: '20px',
                      padding: '6px 14px', borderRadius: '8px', border: '3px solid #B91C1C',
                      color: '#B91C1C', fontFamily: 'var(--font-heading)', fontWeight: 900,
                      fontSize: '1.1rem', letterSpacing: '0.04em', transform: 'rotate(12deg)',
                      opacity: naoOpacity, pointerEvents: 'none',
                    }}>
                      NÃO
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '28px' }}>
                <button
                  onClick={() => !flying && commitAnswer('nao')}
                  aria-label="Não"
                  style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    border: '2px solid #B91C1C', background: '#FFFFFF', color: '#B91C1C',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: '0 6px 18px rgba(185,28,28,0.18)',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <X size={26} strokeWidth={3} />
                </button>
                <button
                  onClick={() => !flying && commitAnswer('sim')}
                  aria-label="Sim"
                  style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    border: '2px solid #0B6B2B', background: '#FFFFFF', color: '#0B6B2B',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', boxShadow: '0 6px 18px rgba(11,107,43,0.18)',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.92)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <Check size={26} strokeWidth={3} />
                </button>
              </div>
            </>
          )}

          {phase === 'result' && (
            /* Result card */
            <div className="card animate-fade-in" style={{
              borderLeft: `6px solid ${resultado.color}`,
              boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
              textAlign: 'center',
            }}>
              <span style={{
                display: 'inline-flex', padding: '6px 14px', borderRadius: '6px',
                background: resultado.bg, border: `1px solid ${resultado.border}`, color: resultado.color,
                fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '0.85rem',
                letterSpacing: '0.04em', marginBottom: '16px',
              }}>
                {resultado.label}
              </span>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '4px' }}>
                {form.nome || 'Pessoa acompanhada'}{form.idade ? `, ${form.idade} anos` : ''}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#8B5A2B', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <MapPin size={13} />
                {form.microarea || 'Território não informado'} · {simCount} de {total} sinais identificados
              </p>

              {/* Direcionamento */}
              <div style={{ background: '#FFFFFF', borderRadius: '12px', padding: '16px', border: `1px solid ${resultado.border}`, marginBottom: '16px', textAlign: 'left' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: resultado.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Direcionar para
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '10px' }}>
                  {resultado.destino}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#524B45', lineHeight: 1.55 }}>
                  {resultado.orientacao}
                </p>
              </div>

              {/* Explainability */}
              <div style={{ background: '#FFFBEB', borderRadius: '12px', padding: '16px', border: '1px solid #FCD34D', marginBottom: '16px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309', fontWeight: 800, fontSize: '0.88rem', marginBottom: '10px' }}>
                  <ShieldAlert size={16} />
                  <span>Sinais respondidos com "Sim"</span>
                </div>
                {simCount > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {answers.filter((a) => a.value === 'sim').map((a) => {
                      const q = QUESTIONS.find((q) => q.id === a.id);
                      return (
                        <div key={a.id} style={{ background: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', borderLeft: '3px solid #D97706', fontSize: '0.82rem', fontWeight: 700, color: '#4A2F1B' }}>
                          ✓ {q.text}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.84rem', color: '#6B655F' }}>
                    Nenhum sinal de alerta identificado nesta triagem.
                  </div>
                )}
              </div>

              <p style={{ fontSize: '0.72rem', color: '#8B5A2B', fontStyle: 'italic', marginBottom: '20px' }}>
                Resultado demonstrativo — não representa avaliação clínica nem diagnóstico médico.
              </p>

              <button onClick={handleRestart} className="btn btn-secondary" style={{ margin: '0 auto' }}>
                <RotateCcw size={16} />
                <span>Refazer triagem</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
