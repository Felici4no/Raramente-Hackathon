import React from 'react';
import { AlertTriangle } from 'lucide-react';

const JOURNEY_STEPS = [
  { label: 'Primeiros sintomas',              annotation: '"não anda aos 7 anos"',          type: 'start' },
  { label: 'UBS — consulta inicial',          annotation: 'encaminhamento clínico',          type: 'mid' },
  { label: 'Exames laboratoriais',            annotation: 'sem resultado conclusivo',         type: 'mid' },
  { label: 'Retorno à UBS',                   annotation: 'dor recorrente',                  type: 'mid' },
  { label: 'Especialista (neurologia)',        annotation: '"pai tinha sintomas semelhantes"', type: 'mid' },
  { label: 'Novo exame / imagem',             annotation: 'três especialidades',             type: 'mid' },
  { label: 'Encaminhamento tertiary',         annotation: 'tratamentos sem resolução',       type: 'mid' },
  { label: 'Anos sem resolução diagnóstica',  annotation: '',                                type: 'end' },
];

export default function TeseCentral() {
  return (
    <section id="tese" className="section" style={{
      background: '#FFFFFF',
      borderTop: '1px solid var(--color-border-subtle)',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}>
      <div className="container">

        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 56px' }}>
          <div className="badge badge-amber" style={{ marginBottom: '16px' }}>
            <AlertTriangle size={13} aria-hidden="true" />
            <span>O Problema</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
            fontWeight: 800,
            color: '#4A2F1B',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}>
            As pistas existem.<br />
            <span style={{ color: 'var(--color-primary)' }}>Mas estão espalhadas.</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#6B655F', lineHeight: 1.65 }}>
            O sistema de saúde registra eventos isolados. Mas a história clínica de um paciente raro não é um evento — é uma trajetória. Reconstruí-la é o primeiro passo para identificar quem precisa de investigação.
          </p>
        </div>

        {/* ── Journey timeline + annotations ── */}
        <div className="grid-2col" style={{ alignItems: 'start', gap: '40px' }}>

          {/* Left: vertical timeline */}
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.78rem',
              color: 'var(--color-quati-brown)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              Jornada típica de um paciente sem diagnóstico
            </div>

            <div className="journey-timeline">
              {JOURNEY_STEPS.map((step, i) => {
                const isStart = step.type === 'start';
                const isEnd   = step.type === 'end';
                const dotBg   = isEnd ? 'var(--color-amber)' : isStart ? 'var(--color-primary)' : '#FFFFFF';
                const dotColor = (isEnd || isStart) ? '#FFFFFF' : 'var(--color-quati-brown)';
                const dotBorder = (isEnd || isStart) ? 'none' : '2px solid var(--color-border)';

                return (
                  <div key={i} className="journey-step">
                    <div
                      className="journey-dot"
                      style={{
                        background: dotBg,
                        color: dotColor,
                        border: dotBorder,
                        boxShadow: isEnd ? '0 0 0 4px rgba(217,119,6,0.2)' : isStart ? '0 0 0 4px rgba(11,107,43,0.15)' : 'none',
                      }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </div>

                    <div style={{ paddingTop: '8px' }}>
                      <div style={{
                        fontWeight: isEnd ? 800 : 700,
                        color: isEnd ? 'var(--color-amber)' : '#231C18',
                        fontSize: isEnd ? '0.98rem' : '0.92rem',
                      }}>
                        {step.label}
                      </div>
                      {step.annotation && (
                        <div style={{
                          fontSize: '0.78rem',
                          color: '#8B5A2B',
                          fontStyle: 'italic',
                          marginTop: '2px',
                        }}>
                          {step.annotation}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: narrative + signal cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Main message card */}
            <div style={{
              padding: '28px',
              background: 'linear-gradient(135deg, var(--color-bg-warm) 0%, #FFFFFF 100%)',
              borderRadius: '14px',
              border: '1px solid var(--color-border)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#4A2F1B',
                marginBottom: '12px',
                lineHeight: 1.25,
              }}>
                O sistema registra eventos.<br />
                <span style={{ color: 'var(--color-primary)' }}>Nós reconstruímos a jornada.</span>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#6B655F', lineHeight: 1.6 }}>
                Cada visita, exame e encaminhamento é um fragmento. A inteligência do QuaTiRare conecta esses fragmentos em uma linha do tempo analisável, revelando trajetórias que fogem do padrão esperado.
              </p>
            </div>

            {/* Signal chips */}
            <div style={{
              padding: '20px',
              background: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid var(--color-border)',
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.8rem',
                color: 'var(--color-quati-brown)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}>
                Sinais que o prontuário não conecta
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  'não anda aos 7 anos',
                  'pai tinha sintomas semelhantes',
                  'dor recorrente',
                  'três especialidades',
                  'tratamentos sem resolução',
                  'manifestação precoce',
                  'história familiar positiva',
                ].map((signal, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      background: 'var(--color-amber-bg)',
                      color: '#92400E',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      border: '1px solid var(--color-amber-border)',
                    }}
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>

            {/* Conclusion badge */}
            <div style={{
              padding: '14px 18px',
              background: 'rgba(11,107,43,0.06)',
              borderRadius: '10px',
              border: '1px solid rgba(11,107,43,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.88rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
            }}>
              <span style={{ fontSize: '18px' }} aria-hidden="true">🔍</span>
              <span>
                O paciente raro deixa uma jornada — e essa jornada pode ser identificada antes do diagnóstico formal.
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
