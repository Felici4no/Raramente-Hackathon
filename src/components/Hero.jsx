import React from 'react';
import { ArrowRight, ArrowDown, Sparkles, ShieldCheck, MessageSquare } from 'lucide-react';

/* ── Ecosystem diagram: right column ── */
function EcosystemDiagram() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
      padding: '28px 20px',
      background: 'linear-gradient(145deg, #FFFFFF 0%, #F9F7F2 100%)',
      borderRadius: '20px',
      border: '1px solid var(--color-border-subtle)',
      boxShadow: '0 12px 40px rgba(11, 107, 43, 0.08), 0 4px 16px rgba(0,0,0,0.04)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* BG glow */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '200px', height: '200px',
        background: 'radial-gradient(circle, rgba(11,107,43,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* ACS */}
      <EcoNode
        icon="👤"
        label="ACS"
        sublabel="Agente Comunitário"
        color="#4A2F1B"
        bg="rgba(139,90,43,0.1)"
        border="rgba(139,90,43,0.2)"
      />
      <EcoArrow />

      {/* WhatsApp / App */}
      <EcoNode
        icon={<MessageSquare size={16} color="#25D366" />}
        label="WhatsApp / App"
        sublabel="Canal de captura"
        color="#1a6e3a"
        bg="rgba(37,211,102,0.08)"
        border="rgba(37,211,102,0.2)"
      />
      <EcoArrow />

      {/* Nasua */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img
          src="/nasua.png"
          alt="Nasua"
          style={{ width: 44, height: 44, objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(11,107,43,0.2))' }}
        />
        <div style={{ textAlign: 'left' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1rem',
            color: 'var(--color-text-brown)',
          }}>Nasua</div>
          <div style={{ fontSize: '0.75rem', color: '#8B5A2B', fontWeight: 600 }}>
            Interface conversacional
          </div>
        </div>
        <div className="badge badge-primary" style={{ fontSize: '0.65rem', padding: '2px 8px', marginLeft: 4 }}>
          IA
        </div>
      </div>
      <EcoArrow />

      {/* QuaTiRare */}
      <EcoNode
        icon={<span style={{ fontSize: '16px' }}>⚙️</span>}
        label="QuaTiRare"
        sublabel="Motor de inteligência"
        color="#0B6B2B"
        bg="rgba(11,107,43,0.1)"
        border="rgba(11,107,43,0.25)"
        strong
      />

      {/* Fork */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginTop: 4 }}>
        {/* Left branch */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          <div style={{ width: 2, height: 24, background: 'linear-gradient(to bottom, var(--color-border), var(--color-primary))' }} />
          <EcoLeaf label="Jornada" emoji="🗺️" color="#0B6B2B" />
        </div>

        {/* Right branch */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          <div style={{ width: 2, height: 24, background: 'linear-gradient(to bottom, var(--color-border), var(--color-secondary))' }} />
          <EcoLeaf label="Dashboard" emoji="📊" color="#2E8B3C" />
        </div>
      </div>
    </div>
  );
}

function EcoNode({ icon, label, sublabel, color, bg, border, strong }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px',
      borderRadius: '10px',
      background: bg,
      border: `1px solid ${border}`,
      minWidth: 200,
      justifyContent: 'center',
    }}>
      <span style={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}>{icon}</span>
      <div>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: strong ? 800 : 700,
          fontSize: strong ? '1rem' : '0.9rem',
          color,
        }}>{label}</div>
        <div style={{ fontSize: '0.72rem', color: '#8B5A2B', fontWeight: 600 }}>{sublabel}</div>
      </div>
    </div>
  );
}

function EcoArrow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, padding: '2px 0' }}>
      <div style={{ width: 2, height: 20, background: 'linear-gradient(to bottom, var(--color-border), var(--color-border))' }} />
      <ArrowDown size={12} color="var(--color-quati-brown)" />
    </div>
  );
}

function EcoLeaf({ label, emoji, color }) {
  return (
    <div style={{
      padding: '8px 14px',
      borderRadius: '8px',
      background: '#FFFFFF',
      border: '1px solid var(--color-border)',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      <span style={{ fontSize: '14px' }}>{emoji}</span>
      <span style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        fontSize: '0.85rem',
        color,
      }}>{label}</span>
    </div>
  );
}

/* ── Main Hero component ── */
export default function Hero() {
  return (
    <section id="hero" className="section" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="grid-55-45">

          {/* ── Left column: text ── */}
          <div className="animate-fade-in">

            {/* Eyebrow */}
            <div className="badge badge-primary" style={{ marginBottom: '20px' }}>
              <Sparkles size={13} aria-hidden="true" />
              <span>Inteligência para a Atenção Primária</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
              fontWeight: 800,
              marginBottom: '22px',
              color: '#4A2F1B',
              lineHeight: 1.15,
            }}>
              O paciente raro deixa uma jornada.{' '}
              <span style={{ color: 'var(--color-primary)' }}>Nós ajudamos a encontrá-la.</span>
            </h1>

            {/* Body text */}
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
              color: '#524B45',
              marginBottom: '24px',
              lineHeight: 1.65,
            }}>
              O Agente na Sua conecta informações do território, a jornada do paciente no SUS e inteligência artificial para identificar trajetórias que fogem do comum e precisam ser investigadas.
            </p>

            {/* Signature quote */}
            <div style={{
              padding: '14px 18px',
              background: '#FFFFFF',
              borderRadius: '10px',
              borderLeft: '4px solid var(--color-quati-brown)',
              marginBottom: '32px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontWeight: 700,
                color: '#4A2F1B',
                fontSize: '0.95rem',
                margin: 0,
              }}>
                Do território ao dado. Do dado à ação.
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <a
                href="#dashboard"
                className="btn btn-primary"
                style={{ flex: '1 1 auto', minWidth: '190px' }}
              >
                <span>Acessar plataforma</span>
                <ArrowRight size={17} aria-hidden="true" />
              </a>

              <a
                href="#quatirare"
                className="btn btn-secondary"
                style={{ flex: '1 1 auto', minWidth: '190px' }}
              >
                <span>Conhecer o QuaTiRare</span>
              </a>
            </div>

            {/* Micro disclaimer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              color: '#8B5A2B',
              fontWeight: 600,
            }}>
              <ShieldCheck size={15} color="#0B6B2B" aria-hidden="true" />
              <span>Tecnologia criada para apoiar — não substituir — profissionais de saúde.</span>
            </div>
          </div>

          {/* ── Right column: ecosystem diagram ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EcosystemDiagram />
          </div>

        </div>
      </div>
    </section>
  );
}
