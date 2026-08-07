import React from 'react';
import { Users, FileText, Cpu, GitCompare, Search, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function TeseCentral() {
  return (
    <section id="tese" className="section" style={{ background: '#FFFFFF', borderTop: '1px solid #EBE7DE', borderBottom: '1px solid #EBE7DE' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 56px' }}>
          <div className="badge badge-brown" style={{ marginBottom: '16px' }}>
            A Tese Algorítmica
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#4A2F1B', marginBottom: '20px' }}>
            Não tentamos diagnosticar milhares de doenças raras. <br />
            <span style={{ color: '#0B6B2B' }}>Identificamos jornadas que não parecem comuns.</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B655F', lineHeight: 1.6 }}>
            A inteligência da plataforma não substitui a consulta médica. Ela analisa padrões comportamentais e histórico territorial para destacar anormalidades na rota de cuidado.
          </p>
        </div>

        {/* Fluxo / Diagrama de Filtragem */}
        <div style={{ background: '#F4F1E8', borderRadius: '24px', padding: '40px 32px', border: '1px solid #E2DDD3' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', alignItems: 'center' }}>
            
            {/* Passo 1 */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px 20px', textAlign: 'center', border: '1px solid #EBE7DE', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(11, 107, 43, 0.1)', color: '#0B6B2B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Users size={24} />
              </div>
              <div style={{ fontWeight: 800, color: '#4A2F1B', fontSize: '1rem' }}>MILHARES DE PACIENTES</div>
              <div style={{ fontSize: '0.82rem', color: '#8B5A2B', marginTop: '4px' }}>Base territorial SUS</div>
            </div>

            <div style={{ textAlign: 'center', color: '#8B5A2B', fontWeight: 700, fontSize: '1.2rem' }}>➔</div>

            {/* Passo 2 */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px 20px', textAlign: 'center', border: '1px solid #EBE7DE', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(46, 139, 60, 0.1)', color: '#2E8B3C', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <FileText size={24} />
              </div>
              <div style={{ fontWeight: 800, color: '#4A2F1B', fontSize: '1rem' }}>JORNADAS DO SUS</div>
              <div style={{ fontSize: '0.82rem', color: '#8B5A2B', marginTop: '4px' }}>Visitas, UBS, Exames</div>
            </div>

            <div style={{ textAlign: 'center', color: '#8B5A2B', fontWeight: 700, fontSize: '1.2rem' }}>➔</div>

            {/* Passo 3 */}
            <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '24px 20px', textAlign: 'center', border: '1px solid #EBE7DE', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(139, 90, 43, 0.1)', color: '#8B5A2B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Cpu size={24} />
              </div>
              <div style={{ fontWeight: 800, color: '#4A2F1B', fontSize: '1rem' }}>ANÁLISE DE PADRÕES</div>
              <div style={{ fontSize: '0.82rem', color: '#8B5A2B', marginTop: '4px' }}>Motor Nasua IA</div>
            </div>

            <div style={{ textAlign: 'center', color: '#8B5A2B', fontWeight: 700, fontSize: '1.2rem' }}>➔</div>

            {/* Passo 4 - Ramificação de Resultados */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: '#E8F5E9', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #C8E6C9' }}>
                <CheckCircle2 size={18} color="#0B6B2B" />
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0B6B2B' }}>COMUM (Acompanhamento)</span>
              </div>
              
              <div style={{ background: '#FEF3C7', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #FDE68A' }}>
                <AlertTriangle size={18} color="#D97706" />
                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#B45309' }}>ATÍPICA (Investigação)</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
