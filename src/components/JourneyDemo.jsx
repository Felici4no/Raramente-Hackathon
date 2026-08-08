import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, ShieldAlert } from 'lucide-react';

const SCALE = [
  { key: 'comum',   label: 'COMUM',   color: '#0B6B2B', bg: 'rgba(11,107,43,0.1)',  border: 'rgba(11,107,43,0.25)', icon: <CheckCircle size={15} /> },
  { key: 'atencao', label: 'ATENÇÃO', color: '#D97706', bg: 'rgba(217,119,6,0.08)', border: 'rgba(217,119,6,0.25)', icon: <span style={{fontSize:'15px',lineHeight:1}}>◎</span> },
  { key: 'atipica', label: 'ATÍPICA', color: '#B45309', bg: '#FEF3C7',             border: '#FDE68A',              icon: <AlertTriangle size={15} /> },
];

const PATIENT_A = {
  label: 'Paciente A',
  subtitle: 'CASO #8401 · UBS Centro',
  status: 'comum',
  metrics: [
    { title: 'Atendimentos',   value: '2',         note: 'em 15 dias' },
    { title: 'Especialidades', value: '1',         note: 'Clínico Geral' },
    { title: 'Resolução',      value: '✓',         note: 'Resposta ao tratamento' },
    { title: 'Histórico fam.', value: 'Negativo',  note: 'Sem recorrência' },
  ],
  analysis: 'Trajetória clínica compatível com infecção aguda tratável. Sem reincidência de sintomas.',
};

const PATIENT_B = {
  label: 'Paciente B',
  subtitle: 'CASO #9104 · Microárea 04 (ACS Ana)',
  status: 'atipica',
  metrics: [
    { title: 'Atendimentos',        value: '11',      note: 'em 3 anos' },
    { title: 'Especialidades',      value: '4',       note: 'áreas distintas' },
    { title: 'Resolução diagnóst.', value: '✗',      note: 'Sem resolução diagnóstica' },
    { title: 'Histórico fam.',      value: 'Positivo', note: 'Fraqueza no pai' },
  ],
  signals: [
    'Longa trajetória sem resolução diagnóstica (3 anos)',
    'Peregrinação por múltiplas especialidades',
    'Manifestação motora precoce na infância',
    'Recorrência familiar confirmada em campo',
  ],
};

function StatusBadge({ status }) {
  const s = SCALE.find(x => x.key === status);
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '6px 14px',
      borderRadius: '6px',
      background: s.bg,
      border: `1px solid ${s.border}`,
      color: s.color,
      fontFamily: 'var(--font-heading)',
      fontWeight: 800,
      fontSize: '0.8rem',
      letterSpacing: '0.04em',
    }}>
      {s.icon}
      JORNADA {s.label}
    </span>
  );
}

function MetricCard({ title, value, note, status }) {
  const isAtipica = status === 'atipica';
  return (
    <div style={{
      padding: '14px',
      borderRadius: '8px',
      background: isAtipica ? '#FEF3C7' : 'var(--color-bg-warm)',
      border: `1px solid ${isAtipica ? '#FDE68A' : 'var(--color-border)'}`,
    }}>
      <div style={{ fontSize: '0.72rem', color: isAtipica ? '#B45309' : '#8B5A2B', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {title}
      </div>
      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: isAtipica ? '#92400E' : '#4A2F1B' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#6B655F', marginTop: '2px' }}>{note}</div>
    </div>
  );
}

export default function JourneyDemo() {
  const [activeTab, setActiveTab] = useState('atipica'); // for mobile

  return (
    <section id="jornada" className="section" style={{
      background: '#FFFFFF',
      borderTop: '1px solid var(--color-border-subtle)',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}>
      <div className="container">

        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <div className="badge badge-amber" style={{ marginBottom: '16px' }}>
            <AlertTriangle size={13} aria-hidden="true" />
            <span>Separar o Comum do Atípico</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
            fontWeight: 800,
            color: '#4A2F1B',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            Não procuramos uma doença.<br />
            <span style={{ color: 'var(--color-primary)' }}>Procuramos uma jornada que não parece comum.</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#6B655F', lineHeight: 1.65 }}>
            Não atribuímos diagnósticos nem porcentagens arbitrárias. Mostramos aos profissionais de saúde exatamente quais sinais tornam uma jornada atípica e merecem investigação.
          </p>
        </div>

        {/* ── Scale indicator ── */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          marginBottom: '40px',
          flexWrap: 'wrap',
        }} role="img" aria-label="Escala de jornada: comum, atenção, atípica">
          {SCALE.map((s, i) => (
            <React.Fragment key={s.key}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 20px',
                background: s.bg,
                border: `1px solid ${s.border}`,
                borderRadius: i === 0 ? '8px 0 0 8px' : i === SCALE.length - 1 ? '0 8px 8px 0' : '0',
                borderLeft: i > 0 ? 'none' : undefined,
              }}>
                <span style={{ color: s.color, display: 'flex', alignItems: 'center' }}>{s.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  color: s.color,
                  letterSpacing: '0.04em',
                }}>
                  {s.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* ── Mobile tab switcher ── */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}
          className="mobile-tabs-only"
        >
          {[
            { key: 'comum',   label: 'Paciente A — Comum' },
            { key: 'atipica', label: 'Paciente B — Atípica' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: activeTab === t.key ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: activeTab === t.key ? 'rgba(11,107,43,0.08)' : '#FFFFFF',
                color: activeTab === t.key ? 'var(--color-primary)' : '#4A2F1B',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Side-by-side cards (desktop) / toggled (mobile) ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}>

          {/* ── Patient A — Comum ── */}
          <div
            className="card"
            style={{
              borderLeft: '5px solid #57B33E',
              borderRadius: '14px',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
              gap: '12px',
              flexWrap: 'wrap',
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#6B655F', fontWeight: 600, marginBottom: '4px' }}>
                  {PATIENT_A.subtitle}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#4A2F1B', fontWeight: 800 }}>{PATIENT_A.label}</h3>
              </div>
              <StatusBadge status="comum" />
            </div>

            <div className="grid-metrics-2col" style={{ marginBottom: '20px' }}>
              {PATIENT_A.metrics.map((m, i) => (
                <MetricCard key={i} {...m} status="comum" />
              ))}
            </div>

            <div style={{
              padding: '14px 16px',
              background: 'rgba(11,107,43,0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(11,107,43,0.15)',
              fontSize: '0.88rem',
              color: '#6B655F',
              lineHeight: 1.55,
            }}>
              <strong style={{ color: '#0B6B2B', display: 'block', marginBottom: '4px' }}>Análise da trajetória:</strong>
              {PATIENT_A.analysis}
            </div>
          </div>

          {/* ── Patient B — Atípica ── */}
          <div
            className="card"
            style={{
              borderLeft: '5px solid #D97706',
              borderRadius: '14px',
              boxShadow: '0 12px 36px rgba(217,119,6,0.12)',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px',
              gap: '12px',
              flexWrap: 'wrap',
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#6B655F', fontWeight: 600, marginBottom: '4px' }}>
                  {PATIENT_B.subtitle}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#4A2F1B', fontWeight: 800 }}>{PATIENT_B.label}</h3>
              </div>
              <StatusBadge status="atipica" />
            </div>

            <div className="grid-metrics-2col" style={{ marginBottom: '20px' }}>
              {PATIENT_B.metrics.map((m, i) => (
                <MetricCard key={i} {...m} status="atipica" />
              ))}
            </div>

            {/* Explainability box */}
            <div style={{
              background: '#FFFBEB',
              borderRadius: '10px',
              padding: '18px',
              border: '1px solid #FCD34D',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
                color: '#B45309',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.9rem',
              }}>
                <ShieldAlert size={18} aria-hidden="true" />
                Por que essa jornada chamou atenção?
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {PATIENT_B.signals.map((signal, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#FFFFFF',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      borderLeft: '4px solid #D97706',
                      fontSize: '0.87rem',
                      fontWeight: 700,
                      color: '#4A2F1B',
                    }}
                  >
                    • {signal}
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '14px',
                padding: '10px 12px',
                background: 'rgba(11,107,43,0.07)',
                borderRadius: '6px',
                border: '1px solid rgba(11,107,43,0.15)',
                fontSize: '0.82rem',
                color: '#0B6B2B',
                fontWeight: 600,
              }}>
                ✓ Indicado para revisão pela equipe de saúde
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
