import React, { useState } from 'react';
import { ArrowRight, HelpCircle, CheckCircle2, Sparkles, MessageSquare, Compass } from 'lucide-react';

export default function RadarScreen({ onStartPista, onOpenNasua }) {
  const [territoryStatus, setTerritoryStatus] = useState(null);

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Hero Mascot Card */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F9F7F2 100%)',
        borderRadius: '24px',
        padding: '24px 20px',
        border: '2px solid rgba(11,107,43,0.15)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 12px 32px rgba(11,107,43,0.08)',
      }}>
        {/* Glow accent */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '140px', height: '140px',
          background: 'radial-gradient(circle, rgba(11,107,43,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <img
          src="/nasua.png"
          alt="Nasua Mascote"
          style={{ width: '100px', height: '100px', objectFit: 'contain', margin: '0 auto 12px', filter: 'drop-shadow(0 6px 16px rgba(11,107,43,0.18))' }}
        />

        <div className="badge badge-brown" style={{ marginBottom: '12px', fontSize: '0.75rem' }}>
          <Compass size={12} /> Escuta do Território
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4A2F1B', lineHeight: 1.3, marginBottom: '8px' }}>
          Você encontrou uma história que parece estar andando em círculos?
        </h2>
        <p style={{ fontSize: '0.86rem', color: '#6B655F', margin: 0, lineHeight: 1.5 }}>
          Se uma pessoa do território está peregrinando sem respostas claras, registre os sinais para reconstruirmos a jornada.
        </p>
      </div>

      {/* Main 3 Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* Action 1: SIM */}
        <button
          onClick={onStartPista}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '16px 20px',
            fontSize: '1rem',
            borderRadius: '16px',
            justifyContent: 'space-between',
            boxShadow: '0 6px 20px rgba(11,107,43,0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} />
            <span>SIM — Registrar pista</span>
          </div>
          <ArrowRight size={18} />
        </button>

        {/* Action 2: TALVEZ */}
        <button
          onClick={onOpenNasua}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '16px',
            border: '2px solid var(--color-amber-border)',
            background: 'var(--color-amber-bg)',
            color: '#B45309',
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.92rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease',
            minHeight: '52px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HelpCircle size={18} color="#D97706" />
            <span>TALVEZ — Nasua me ajuda</span>
          </div>
          <MessageSquare size={16} />
        </button>

        {/* Action 3: NÃO */}
        <button
          onClick={() => setTerritoryStatus('continue')}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '16px',
            border: '1px solid var(--color-border)',
            background: '#FFFFFF',
            color: '#6B655F',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
            minHeight: '48px',
          }}
        >
          <CheckCircle2 size={16} color="#8B5A2B" />
          <span>NÃO — Continuar território</span>
        </button>

      </div>

      {/* Positive Feedback if No clicked */}
      {territoryStatus === 'continue' && (
        <div className="animate-fade-in" style={{
          padding: '14px 16px',
          background: 'rgba(11,107,43,0.06)',
          borderRadius: '14px',
          border: '1px solid rgba(11,107,43,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.84rem',
          color: 'var(--color-primary)',
          fontWeight: 600,
        }}>
          <img src="/nasua.png" alt="Nasua" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          <span>"Excelente trabalho de escuta! Continue acompanhando as famílias da sua microárea."</span>
        </div>
      )}

      {/* Today Territory Summary */}
      <div className="card" style={{ background: '#FFFFFF', borderRadius: '16px', padding: '18px 20px', border: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          Acompanhamento do Território Hoje
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
          <div style={{ background: 'var(--color-bg-warm)', padding: '10px 6px', borderRadius: '10px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#4A2F1B' }}>7</div>
            <div style={{ fontSize: '0.68rem', color: '#6B655F', fontWeight: 600 }}>Histórias vistas</div>
          </div>
          <div style={{ background: 'var(--color-amber-bg)', padding: '10px 6px', borderRadius: '10px', border: '1px solid var(--color-amber-border)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#B45309' }}>2</div>
            <div style={{ fontSize: '0.68rem', color: '#B45309', fontWeight: 700 }}>Com nós</div>
          </div>
          <div style={{ background: 'rgba(11,107,43,0.1)', padding: '10px 6px', borderRadius: '10px', border: '1px solid rgba(11,107,43,0.2)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-primary)' }}>1</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--color-primary)', fontWeight: 700 }}>Nó desatado</div>
          </div>
        </div>
      </div>

    </div>
  );
}
