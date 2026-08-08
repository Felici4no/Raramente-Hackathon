import React from 'react';
import { Award, ShieldCheck, CheckCircle2, HeartHandshake, UserCheck, Sparkles, MapPin } from 'lucide-react';

export default function ImpactoAppScreen() {
  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Reconhecimento Cooperativo
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4A2F1B', margin: '2px 0 0' }}>
          Impacto Verificado
        </h2>
      </div>

      {/* Profile Card */}
      <div className="card" style={{ background: '#FFFFFF', borderRadius: '24px', padding: '20px', border: '2px solid var(--color-success)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px', paddingBottom: '14px', borderBottom: '1px solid var(--color-border-subtle)' }}>
          <img src="/nasua.png" alt="Nasua" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#4A2F1B', fontWeight: 800 }}>Ana — ACS</h3>
            <p style={{ fontSize: '0.78rem', color: '#8B5A2B', fontWeight: 600 }}>Microárea 04 · UBS Parque das Nações</p>
          </div>
        </div>

        {/* Cooperativa Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
          <div style={{ background: 'var(--color-bg-warm)', padding: '12px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#4A2F1B' }}>12</div>
            <div style={{ fontSize: '0.72rem', color: '#8B5A2B', fontWeight: 700 }}>Pistas registradas</div>
          </div>

          <div style={{ background: 'rgba(11,107,43,0.08)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(11,107,43,0.2)' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-primary)' }}>8</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-primary)', fontWeight: 700 }}>Conexões confirmadas</div>
          </div>

          <div style={{ background: 'var(--color-amber-bg)', padding: '12px', borderRadius: '12px', border: '1px solid var(--color-amber-border)' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#B45309' }}>3</div>
            <div style={{ fontSize: '0.72rem', color: '#B45309', fontWeight: 700 }}>Nós desatados</div>
          </div>

          <div style={{ background: 'rgba(46,139,60,0.08)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(46,139,60,0.2)' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#2E8B3C' }}>5</div>
            <div style={{ fontSize: '0.72rem', color: '#2E8B3C', fontWeight: 700 }}>Jornadas revisadas</div>
          </div>
        </div>

        {/* Cooperative Impact Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(11,107,43,0.1) 0%, rgba(11,107,43,0.04) 100%)', borderRadius: '14px', padding: '14px', border: '1px solid rgba(11,107,43,0.2)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.84rem', color: 'var(--color-primary)', fontWeight: 700 }}>
          <ShieldCheck size={20} />
          <span>"Seu trabalho ajudou a reconectar histórias no território da UBS Parque das Nações."</span>
        </div>
      </div>

    </div>
  );
}
