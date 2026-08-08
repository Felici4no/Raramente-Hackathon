import React, { useState } from 'react';
import { LayoutDashboard, MapPin, ArrowRight, Activity, AlertCircle } from 'lucide-react';

export default function DashboardDemo() {
  const [activeTab, setActiveTab] = useState('prioritarios'); // 'todos' | 'recorrentes' | 'atipicas' | 'prioritarios'

  return (
    <section id="dashboard" className="section" style={{ background: '#FFFFFF', borderTop: '1px solid #EBE7DE' }}>
      <div className="container">
        
        {/* Header da Seção */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>
            <LayoutDashboard size={14} />
            <span>Visão de Gestão Territorial</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#4A2F1B', marginBottom: '16px' }}>
            Território Acompanhado em Tempo Real
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B655F' }}>
            Do indivíduo ao indicador de gestão. Acompanhe a filtragem de jornadas de toda a população adstrita com inteligência epidemiológica.
          </p>
        </div>

        {/* Funil de Dados do Território */}
        <div style={{ background: '#F4F1E8', borderRadius: '12px', padding: '32px 20px', marginBottom: '40px', border: '1px solid #E2DDD3' }}>
          <div style={{ fontWeight: 800, color: '#4A2F1B', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '20px', textAlign: 'center' }}>
            Funil Epidemiológico do Território • Distrito Sanitário Sul
          </div>

          <div className="grid-funnel">
            
            {/* Bloco 1 */}
            <div 
              onClick={() => setActiveTab('todos')}
              style={{ 
                background: activeTab === 'todos' ? '#FFFFFF' : '#F4F1E8',
                border: activeTab === 'todos' ? '2px solid #0B6B2B' : '1px solid #E2DDD3',
                borderRadius: '8px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#6B655F', fontWeight: 700 }}>1. POPULAÇÃO ADSTRITA</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#4A2F1B', margin: '4px 0' }}>12.482</div>
              <div style={{ fontSize: '0.75rem', color: '#8B5A2B' }}>Pessoas cadastradas</div>
            </div>

            <div className="arrow-divider">➔</div>

            {/* Bloco 2 */}
            <div 
              onClick={() => setActiveTab('recorrentes')}
              style={{ 
                background: activeTab === 'recorrentes' ? '#FFFFFF' : '#F4F1E8',
                border: activeTab === 'recorrentes' ? '2px solid #2E8B3C' : '1px solid #E2DDD3',
                borderRadius: '8px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#6B655F', fontWeight: 700 }}>2. JORNADAS RECORRENTES</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2E8B3C', margin: '4px 0' }}>1.804</div>
              <div style={{ fontSize: '0.75rem', color: '#8B5A2B' }}>Acompanhamento regular</div>
            </div>

            <div className="arrow-divider">➔</div>

            {/* Bloco 3 */}
            <div 
              onClick={() => setActiveTab('atipicas')}
              style={{ 
                background: activeTab === 'atipicas' ? '#FFFFFF' : '#F4F1E8',
                border: activeTab === 'atipicas' ? '2px solid #F59E0B' : '1px solid #E2DDD3',
                borderRadius: '8px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#B45309', fontWeight: 700 }}>3. JORNADAS ATÍPICAS</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#D97706', margin: '4px 0' }}>214</div>
              <div style={{ fontSize: '0.75rem', color: '#B45309' }}>Sinais de exceção</div>
            </div>

            <div className="arrow-divider">➔</div>

            {/* Bloco 4 */}
            <div 
              onClick={() => setActiveTab('prioritarios')}
              style={{ 
                background: activeTab === 'prioritarios' ? '#FEF3C7' : '#F4F1E8',
                border: activeTab === 'prioritarios' ? '2px solid #D97706' : '1px solid #E2DDD3',
                borderRadius: '8px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
                boxShadow: activeTab === 'prioritarios' ? '0 8px 20px rgba(217,119,6,0.15)' : 'none'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#92400E', fontWeight: 800 }}>4. CASOS PRIORITÁRIOS</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#B45309', margin: '4px 0' }}>38</div>
              <div style={{ fontSize: '0.75rem', color: '#92400E', fontWeight: 700 }}>Em investigação ativa</div>
            </div>

          </div>
        </div>

        {/* Simulador de Mapa Agregado do Territorio */}
        <div className="card" style={{ background: '#FAF8F5', border: '1px solid #E2DDD3', marginBottom: '56px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <MapPin size={22} color="#0B6B2B" style={{ flexShrink: 0 }} />
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#4A2F1B', fontWeight: 800 }}>Distribuição Territorial por Microárea</h3>
                <div style={{ fontSize: '0.85rem', color: '#6B655F' }}>Visualização agregada sem dados sensíveis de pacientes</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-primary"><Activity size={12} /> UBS Parque das Nações</span>
              <span className="badge badge-amber"><AlertCircle size={12} /> 38 Casos em Destaque</span>
            </div>
          </div>

          {/* Grid de Microareas do Mapa */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
            
            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #EBE7DE', borderTop: '4px solid #D97706' }}>
              <div style={{ fontWeight: 800, color: '#4A2F1B', fontSize: '0.9rem' }}>Microárea 04</div>
              <div style={{ fontSize: '0.8rem', color: '#8B5A2B', marginTop: '2px' }}>ACS Ana • 1.420 pts</div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ color: '#6B655F' }}>Casos atípicos:</span>
                <span style={{ color: '#D97706' }}>7 prioritários</span>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #EBE7DE', borderTop: '4px solid #0B6B2B' }}>
              <div style={{ fontWeight: 800, color: '#4A2F1B', fontSize: '0.9rem' }}>Microárea 01</div>
              <div style={{ fontSize: '0.8rem', color: '#8B5A2B', marginTop: '2px' }}>ACS Carlos • 980 pts</div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ color: '#6B655F' }}>Casos atípicos:</span>
                <span style={{ color: '#0B6B2B' }}>2 em acompanhamento</span>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #EBE7DE', borderTop: '4px solid #D97706' }}>
              <div style={{ fontWeight: 800, color: '#4A2F1B', fontSize: '0.9rem' }}>Microárea 03</div>
              <div style={{ fontSize: '0.8rem', color: '#8B5A2B', marginTop: '2px' }}>ACS Beatriz • 1.150 pts</div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ color: '#6B655F' }}>Casos atípicos:</span>
                <span style={{ color: '#D97706' }}>5 prioritários</span>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '8px', border: '1px solid #EBE7DE', borderTop: '4px solid #2E8B3C' }}>
              <div style={{ fontWeight: 800, color: '#4A2F1B', fontSize: '0.9rem' }}>Microárea 02</div>
              <div style={{ fontSize: '0.8rem', color: '#8B5A2B', marginTop: '2px' }}>ACS Eduardo • 890 pts</div>
              <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                <span style={{ color: '#6B655F' }}>Casos atípicos:</span>
                <span style={{ color: '#2E8B3C' }}>3 acompanhados</span>
              </div>
            </div>

          </div>
        </div>

        {/* BANNER CTA FINAL */}
        <div style={{ 
          background: 'linear-gradient(135deg, #0B6B2B 0%, #085221 100%)', 
          borderRadius: '12px', 
          padding: '40px 24px', 
          color: '#FFFFFF', 
          textAlign: 'center',
          boxShadow: '0 20px 48px rgba(11, 107, 43, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
              Converta impacto em informação.
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', opacity: 0.92, marginBottom: '28px', lineHeight: 1.6 }}>
              Tecnologia que escuta o território, compreende jornadas e ajuda o SUS a encontrar quem precisa ser visto.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
              <a href="#" className="btn" style={{ background: '#FFFFFF', color: '#0B6B2B', padding: '14px 28px', fontSize: '1rem', fontWeight: 800 }}>
                <span>Acessar o Agente na Sua</span>
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Editorial Brand Note */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px', fontSize: '0.85rem', opacity: 0.85, fontStyle: 'italic' }}>
              <strong>Agente na Sua</strong> — inspirado em <em>Nasua nasua</em> — o quati, curioso, territorial e investigador.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
