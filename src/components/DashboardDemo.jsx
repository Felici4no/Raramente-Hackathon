import React, { useState } from 'react';
import { LayoutDashboard, MapPin, ArrowRight, Activity, AlertCircle, MessageSquare } from 'lucide-react';

const FUNNEL = [
  {
    key: 'analisadas',
    step: '1. JORNADAS ANALISADAS',
    value: '12.482',
    note: 'Pessoas acompanhadas',
    color: '#4A2F1B',
    activeColor: '#0B6B2B',
  },
  {
    key: 'atencao',
    step: '2. EM ATENÇÃO',
    value: '1.804',
    note: 'Acompanhamento regular',
    color: '#2E8B3C',
    activeColor: '#2E8B3C',
  },
  {
    key: 'atipicas',
    step: '3. JORNADAS ATÍPICAS',
    value: '214',
    note: 'Sinais de exceção',
    color: '#D97706',
    activeColor: '#D97706',
  },
  {
    key: 'revisao',
    step: '4. PRIORIDADES PARA REVISÃO',
    value: '38',
    note: 'Em investigação ativa',
    color: '#B45309',
    activeColor: '#B45309',
  },
];

const MICROAREAS = [
  { name: 'Microárea 04', acs: 'ACS Ana',     pts: '1.420', atipicos: '7 prioridades para revisão',   accent: '#D97706' },
  { name: 'Microárea 01', acs: 'ACS Carlos',  pts: '980',   atipicos: '2 jornadas acompanhadas',      accent: '#0B6B2B' },
  { name: 'Microárea 03', acs: 'ACS Beatriz', pts: '1.150', atipicos: '5 prioridades para revisão',   accent: '#D97706' },
  { name: 'Microárea 02', acs: 'ACS Eduardo', pts: '890',   atipicos: '3 em atenção',                  accent: '#2E8B3C' },
];

export default function DashboardDemo() {
  const [activeTab, setActiveTab] = useState('revisao');

  return (
    <section id="dashboard" className="section" style={{
      background: '#FFFFFF',
      borderTop: '1px solid var(--color-border-subtle)',
    }}>
      <div className="container">

        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 52px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>
            <LayoutDashboard size={13} aria-hidden="true" />
            <span>Visão de Gestão Territorial</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
            fontWeight: 800,
            color: '#4A2F1B',
            marginBottom: '16px',
          }}>
            Território acompanhado em tempo real.
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#6B655F', lineHeight: 1.65 }}>
            Do indivíduo ao indicador de gestão. Acompanhe a distribuição de jornadas de toda a população adstrita com inteligência epidemiológica.
          </p>
        </div>

        {/* ── Funnel ── */}
        <div style={{
          background: 'var(--color-bg-warm)',
          borderRadius: '14px',
          padding: '28px 20px',
          marginBottom: '36px',
          border: '1px solid var(--color-border)',
        }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.78rem',
            color: 'var(--color-quati-brown)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            textAlign: 'center',
          }}>
            Funil epidemiológico do território · Distrito Sanitário Sul
          </div>

          <div className="grid-funnel">
            {FUNNEL.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <React.Fragment key={item.key}>
                  <button
                    onClick={() => setActiveTab(item.key)}
                    aria-pressed={isActive}
                    style={{
                      background: isActive ? '#FFFFFF' : 'var(--color-bg-warm)',
                      border: isActive ? `2px solid ${item.activeColor}` : '1px solid var(--color-border)',
                      borderRadius: '10px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                      boxShadow: isActive ? `0 6px 20px ${item.activeColor}25` : 'none',
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', color: isActive ? item.activeColor : '#6B655F', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {item.step}
                    </div>
                    <div style={{ fontSize: '1.7rem', fontWeight: 900, color: isActive ? item.activeColor : '#4A2F1B', margin: '4px 0' }}>
                      {item.value}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#8B5A2B' }}>{item.note}</div>
                  </button>
                  <div className="arrow-divider" aria-hidden="true">➔</div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ── Territorial map ── */}
        <div className="card" style={{
          background: '#FAF8F5',
          border: '1px solid var(--color-border)',
          marginBottom: '56px',
          borderRadius: '14px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin size={22} color="var(--color-primary)" aria-hidden="true" />
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#4A2F1B', fontWeight: 800 }}>
                  Distribuição territorial por microárea
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#6B655F' }}>
                  Visualização agregada — sem dados sensíveis de pacientes
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">
                <Activity size={11} aria-hidden="true" />
                UBS Parque das Nações
              </span>
              <span className="badge badge-amber">
                <AlertCircle size={11} aria-hidden="true" />
                38 Prioridades
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '14px' }}>
            {MICROAREAS.map((area, i) => (
              <div
                key={i}
                style={{
                  background: '#FFFFFF',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border-subtle)',
                  borderTop: `4px solid ${area.accent}`,
                }}
              >
                <div style={{ fontWeight: 800, color: '#4A2F1B', fontSize: '0.9rem' }}>{area.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#8B5A2B', marginTop: '2px', marginBottom: '12px' }}>
                  {area.acs} · {area.pts} pts
                </div>
                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: area.accent,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <span aria-hidden="true">•</span>
                  {area.atipicos}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Final CTA ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0B6B2B 0%, #085221 100%)',
          borderRadius: '16px',
          padding: '48px 32px',
          color: '#FFFFFF',
          textAlign: 'center',
          boxShadow: '0 20px 56px rgba(11, 107, 43, 0.28)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute',
            top: '-80px', right: '-80px',
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} aria-hidden="true" />

          <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '16px',
              lineHeight: 1.2,
            }}>
              Converta impacto em informação.
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              opacity: 0.9,
              marginBottom: '32px',
              lineHeight: 1.65,
            }}>
              Tecnologia que escuta o território, reconstrói jornadas e ajuda a identificar mais cedo quem precisa ser investigado.
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
              <a
                href="#"
                className="btn"
                style={{ background: '#FFFFFF', color: 'var(--color-primary)', fontWeight: 800, padding: '14px 28px' }}
              >
                <span>Acessar Agente na Sua</span>
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a
                href="#whatsapp"
                className="btn"
                style={{
                  background: 'transparent',
                  color: '#FFFFFF',
                  border: '2px solid rgba(255,255,255,0.4)',
                  fontWeight: 700,
                  padding: '14px 24px',
                }}
              >
                <MessageSquare size={16} aria-hidden="true" />
                <span>Conversar com Nasua</span>
              </a>
            </div>

            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}>
              <img src="/nasua.png" alt="Nasua" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
              <span style={{ fontSize: '0.9rem', opacity: 0.85, fontStyle: 'italic' }}>
                <strong style={{ fontStyle: 'normal' }}>Agente na Sua</strong> — Encontrar o raro começa entendendo a jornada.
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
