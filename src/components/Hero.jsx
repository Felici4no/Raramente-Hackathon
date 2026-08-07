import React from 'react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="section" style={{ paddingTop: '56px', paddingBottom: '72px' }}>
      <div className="container">
        <div className="grid-2col">
          
          {/* Coluna Esquerda - Texto */}
          <div className="animate-fade-in">
            <div className="badge badge-primary" style={{ marginBottom: '20px' }}>
              <Sparkles size={14} />
              <span>Transformamos impacto em informação</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, marginBottom: '20px', color: '#4A2F1B' }}>
              O paciente raro deixa pistas. O <span style={{ color: '#0B6B2B' }}>Agente na Sua</span> conecta essas pistas.
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#524B45', marginBottom: '28px', lineHeight: 1.6 }}>
              Unimos informações do território, jornada no SUS e inteligência artificial para identificar trajetórias que fogem do comum e apoiar a descoberta precoce de pacientes que precisam de investigação.
            </p>

            <div style={{ padding: '16px 20px', background: '#FFFFFF', borderRadius: '16px', borderLeft: '4px solid #8B5A2B', marginBottom: '32px', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
              <p style={{ fontStyle: 'italic', fontWeight: 600, color: '#4A2F1B', fontSize: '0.95rem' }}>
                "O paciente raro deixa uma jornada. Nós ajudamos a encontrá-la."
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#tese" className="btn btn-primary" style={{ flex: '1 1 auto', minWidth: '200px' }}>
                <span>Explorar a plataforma</span>
                <ArrowRight size={18} />
              </a>

              <a href="#whatsapp" className="btn btn-secondary" style={{ flex: '1 1 auto', minWidth: '180px' }}>
                <span>Como funciona</span>
                <Compass size={18} />
              </a>
            </div>
          </div>

          {/* Coluna Direita - Mockup do Mascote & Card Interativo */}
          <div className="animate-fade-in" style={{ position: 'relative' }}>
            <div className="card" style={{ background: 'linear-gradient(145deg, #FFFFFF 0%, #F9F7F1 100%)', borderRadius: '28px', border: '1px solid #E2DDD3', padding: '28px', position: 'relative', overflow: 'hidden' }}>
              
              {/* Badge Flutuante no topo do Card */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src="/nasua.png" alt="Nasua" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#4A2F1B' }}>Nasua IA</div>
                    <div style={{ fontSize: '0.75rem', color: '#8B5A2B' }}>Agente Investigador Territorial</div>
                  </div>
                </div>

                <div className="badge badge-amber pulse-amber" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                  <AlertCircle size={12} />
                  <span>Sinal de Atipicidade</span>
                </div>
              </div>

              {/* Simulação rápida de card no Hero */}
              <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '20px', border: '1px solid #EBE7DE', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.8rem', color: '#8B5A2B', fontWeight: 700, marginBottom: '6px' }}>
                  MICROÁREA 04 • ACS ANA
                </div>
                <div style={{ fontWeight: 700, color: '#231C18', fontSize: '1.05rem', marginBottom: '8px' }}>
                  Paciente J.S.M. (7 anos)
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ background: '#FEF3C7', color: '#B45309', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600 }}>
                    • Atraso motor persistente
                  </span>
                  <span style={{ background: '#FEF3C7', color: '#B45309', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600 }}>
                    • Recorrência familiar
                  </span>
                  <span style={{ background: '#E8F5E9', color: '#0B6B2B', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600 }}>
                    • 11 atendimentos sem diagnóstico
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6B655F', borderTop: '1px solid #EBE7DE', paddingTop: '16px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="#0B6B2B" />
                  Impacto Verificado SUS
                </span>
                <span style={{ fontWeight: 700, color: '#0B6B2B' }}>+1.420 pts validados</span>
              </div>
            </div>

            {/* Elemento Decorativo de Fundo */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(11,107,43,0.15) 0%, rgba(244,241,232,0) 70%)', borderRadius: '50%', zIndex: -1 }} />
          </div>

        </div>
      </div>
    </section>
  );
}
