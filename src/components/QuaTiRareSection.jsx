import React from 'react';
import { ArrowDown, ArrowUpRight, Database } from 'lucide-react';

const CORE_URL = 'https://quatirare.vercel.app';

const SOURCES = [
  { label: 'ACS / WhatsApp',          icon: '📱', note: 'Canal primário de captura' },
  { label: 'e-SUS / Dados assistenciais', icon: '🏥', note: 'Registros do sistema de saúde' },
  { label: 'HPO',                      icon: '🧬', note: 'Ontologia de fenótipos humanos' },
  { label: 'Bases de doenças raras',   icon: '📚', note: 'Protótipo utiliza referências abertas' },
  { label: 'Dados territoriais',       icon: '🗺️', note: 'Contexto geográfico e social' },
];

const PIPELINE = [
  { step: 'DADOS BRUTOS',         desc: 'Eventos heterogêneos de múltiplas fontes',       color: 'rgba(139,90,43,0.10)', text: '#8B5A2B' },
  { step: 'NORMALIZAÇÃO',         desc: 'Padronização de formatos, datas e identificadores', color: 'rgba(11,107,43,0.08)', text: '#2E8B3C' },
  { step: 'EVENTOS',              desc: 'Cada registro vira um evento na jornada',          color: 'rgba(11,107,43,0.10)', text: '#2E8B3C' },
  { step: 'LINHA DO TEMPO',       desc: 'Eventos ordenados cronologicamente por paciente',  color: 'rgba(11,107,43,0.13)', text: '#0B6B2B' },
  { step: 'PADRÕES',              desc: 'Comparação com trajetórias de referência',         color: 'rgba(11,107,43,0.16)', text: '#0B6B2B' },
  { step: 'ANOMALIAS',            desc: 'Sinais que fogem do padrão esperado são sinalizados', color: 'rgba(217,119,6,0.10)', text: '#D97706' },
  { step: 'EXPLICAÇÃO',           desc: 'Justificativas legíveis para revisão pela equipe de saúde', color: 'rgba(11,107,43,0.2)', text: '#085221' },
];

const OUTPUT_LABELS = [
  { label: 'JORNADA COMUM',   color: '#0B6B2B', bg: 'rgba(11,107,43,0.1)', icon: '✓' },
  { label: 'EM ATENÇÃO',      color: '#D97706', bg: 'var(--color-amber-bg)', icon: '◎' },
  { label: 'JORNADA ATÍPICA', color: '#B45309', bg: '#FEF3C7',             icon: '⚑' },
];

export default function QuaTiRareSection() {
  return (
    <section id="quatirare" className="section" style={{
      background: '#FFFFFF',
      borderTop: '1px solid var(--color-border-subtle)',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}>
      <div className="container">

        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 56px' }}>
          <div className="badge badge-brown" style={{ marginBottom: '16px' }}>
            <Database size={13} aria-hidden="true" />
            <span>QuaTiRare</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
            fontWeight: 800,
            color: '#4A2F1B',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            A infraestrutura por trás da inteligência.
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#6B655F', lineHeight: 1.65 }}>
            Dados de diferentes fontes chegam em formatos diferentes. O QuaTiRare transforma esses eventos em uma jornada longitudinal estruturada e analisável — o diferencial não são as integrações, mas a capacidade de conectar fontes heterogêneas em uma trajetória única.
          </p>
        </div>

        <div className="grid-2col" style={{ alignItems: 'start', gap: '48px' }}>

          {/* ── Left: sources + pipeline ── */}
          <div>
            {/* Sources */}
            <div style={{
              padding: '20px',
              background: 'var(--color-bg-warm)',
              borderRadius: '14px',
              border: '1px solid var(--color-border)',
              marginBottom: '24px',
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.78rem',
                color: 'var(--color-quati-brown)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '14px',
              }}>
                Fontes de dados
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {SOURCES.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      background: '#FFFFFF',
                      borderRadius: '8px',
                      border: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <span style={{ fontSize: '18px', flexShrink: 0 }} aria-hidden="true">{src.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#231C18' }}>{src.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#8B5A2B', fontStyle: 'italic' }}>{src.note}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Converge arrow */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '12px 0 4px',
              }} aria-hidden="true">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: 2, height: 20, background: 'var(--color-border)' }} />
                  <ArrowDown size={14} color="var(--color-primary)" />
                </div>
              </div>

              {/* QuaTiRare engine node */}
              <div style={{
                padding: '16px 20px',
                background: 'linear-gradient(135deg, rgba(11,107,43,0.12) 0%, rgba(11,107,43,0.06) 100%)',
                borderRadius: '10px',
                border: '2px solid rgba(11,107,43,0.3)',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(11,107,43,0.1)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  color: 'var(--color-primary)',
                  letterSpacing: '0.02em',
                }}>
                  QuaTiRare
                </div>
                <div style={{ fontSize: '0.8rem', color: '#2E8B3C', fontWeight: 600, marginTop: '2px' }}>
                  Motor de inteligência longitudinal
                </div>
              </div>
            </div>

            {/* Output labels */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px',
            }}>
              {OUTPUT_LABELS.map((out, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 8px',
                    background: out.bg,
                    borderRadius: '8px',
                    border: `1px solid ${out.color}40`,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '16px', marginBottom: '4px' }} aria-hidden="true">{out.icon}</div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '0.7rem',
                    color: out.color,
                    letterSpacing: '0.04em',
                  }}>
                    {out.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: transformation pipeline ── */}
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.78rem',
              color: 'var(--color-quati-brown)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>
              Transformação central
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {PIPELINE.map((item, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    background: item.color,
                    border: `1px solid ${item.color.replace(/[\d.]+\)$/, '0.3)')}`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '0.76rem',
                      color: item.text,
                      letterSpacing: '0.06em',
                      minWidth: '130px',
                      paddingTop: '1px',
                    }}>
                      {item.step}
                    </div>
                    <div style={{
                      fontSize: '0.82rem',
                      color: '#6B655F',
                      lineHeight: 1.45,
                    }}>
                      {item.desc}
                    </div>
                  </div>

                  {i < PIPELINE.length - 1 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      paddingLeft: '22px',
                      padding: '3px 0 3px 22px',
                    }} aria-hidden="true">
                      <ArrowDown size={14} color="var(--color-quati-brown)" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Disclaimer note */}
            <div style={{
              marginTop: '20px',
              padding: '14px 16px',
              background: 'var(--color-bg-warm)',
              borderRadius: '10px',
              border: '1px solid var(--color-border)',
              fontSize: '0.82rem',
              color: '#8B5A2B',
              lineHeight: 1.55,
              fontStyle: 'italic',
            }}>
              <strong style={{ fontStyle: 'normal', color: '#4A2F1B' }}>Nota:</strong> A arquitetura é compatível com integração ao e-SUS e bases abertas de ontologia (HPO, ORPHANET). O protótipo atual utiliza dados simulados para demonstração.
            </div>

            {/* Link to the research-facing sibling site */}
            <a
              href={CORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(11,107,43,0.25)',
                background: 'linear-gradient(135deg, rgba(11,107,43,0.06) 0%, rgba(11,107,43,0.02) 100%)',
                textDecoration: 'none',
                transition: 'transform 0.2s ease',
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-primary)' }}>
                  Equipe de pesquisa ou investigação clínica?
                </div>
                <div style={{ fontSize: '0.82rem', color: '#6B655F', marginTop: '2px' }}>
                  Explore o QuaTiRare Research Core — a plataforma de investigação aprofundada de casos.
                </div>
              </div>
              <ArrowUpRight size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
