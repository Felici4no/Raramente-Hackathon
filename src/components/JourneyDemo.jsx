import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, ArrowRight, Info, Eye } from 'lucide-react';

export default function JourneyDemo() {
  const [selectedPatient, setSelectedPatient] = useState('atipico'); // 'comum' | 'atipico'

  return (
    <section id="jornada" className="section" style={{ background: '#FFFFFF', borderTop: '1px solid #EBE7DE', borderBottom: '1px solid #EBE7DE' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <div className="badge badge-amber" style={{ marginBottom: '16px' }}>
            <AlertTriangle size={14} />
            <span>Explicabilidade Algorítmica</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#4A2F1B', marginBottom: '16px' }}>
            Inteligência de Jornada: O Poder da Explicabilidade
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B655F' }}>
            Não atribuímos diagnósticos nem porcentagens arbitrárias. Mostramos aos profissionais de saúde <strong>exatamente quais sinais de exceção</strong> tornam uma jornada atípica.
          </p>
        </div>

        {/* Botoes de Selecao de Paciente */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
          <button 
            onClick={() => setSelectedPatient('comum')}
            style={{
              padding: '14px 24px',
              borderRadius: '9999px',
              border: selectedPatient === 'comum' ? '2px solid #57B33E' : '1px solid #E2DDD3',
              background: selectedPatient === 'comum' ? '#E8F5E9' : '#FFFFFF',
              color: selectedPatient === 'comum' ? '#0B6B2B' : '#4A2F1B',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s'
            }}
          >
            <CheckCircle size={18} color={selectedPatient === 'comum' ? '#0B6B2B' : '#8B5A2B'} />
            <span>Paciente 01: Jornada Comum</span>
          </button>

          <button 
            onClick={() => setSelectedPatient('atipico')}
            style={{
              padding: '14px 24px',
              borderRadius: '9999px',
              border: selectedPatient === 'atipico' ? '2px solid #F59E0B' : '1px solid #E2DDD3',
              background: selectedPatient === 'atipico' ? '#FEF3C7' : '#FFFFFF',
              color: selectedPatient === 'atipico' ? '#B45309' : '#4A2F1B',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s'
            }}
          >
            <AlertTriangle size={18} color={selectedPatient === 'atipico' ? '#D97706' : '#8B5A2B'} />
            <span>Paciente 02: Jornada Atípica</span>
          </button>
        </div>

        {/* Card Comparativo de Jornada */}
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {selectedPatient === 'comum' ? (
            <div className="card" style={{ borderLeft: '6px solid #57B33E', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#6B655F', fontWeight: 600 }}>CASO #8401 • UBS CENTRO</div>
                  <h3 style={{ fontSize: '1.4rem', color: '#4A2F1B', fontWeight: 800 }}>Paciente M.A.S. (34 anos)</h3>
                </div>
                <div style={{ background: '#E8F5E9', color: '#0B6B2B', padding: '8px 18px', borderRadius: '9999px', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} />
                  <span>JORNADA COMUM</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                <div style={{ background: '#F4F1E8', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#8B5A2B', fontWeight: 600 }}>ATENDIMENTOS</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4A2F1B' }}>2 consultas</div>
                </div>

                <div style={{ background: '#F4F1E8', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#8B5A2B', fontWeight: 600 }}>ESPECIALIDADES</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4A2F1B' }}>1 (Clínico Geral)</div>
                </div>

                <div style={{ background: '#F4F1E8', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#8B5A2B', fontWeight: 600 }}>DURAÇÃO</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4A2F1B' }}>15 dias</div>
                </div>

                <div style={{ background: '#F4F1E8', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#8B5A2B', fontWeight: 600 }}>DESFECHO</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B6B2B' }}>Resolução pós-tratamento</div>
                </div>
              </div>

              <div style={{ background: '#F8F9FA', borderRadius: '12px', padding: '16px 20px', border: '1px solid #EBE7DE' }}>
                <div style={{ fontWeight: 700, color: '#4A2F1B', fontSize: '0.95rem', marginBottom: '6px' }}>Análise de Padrão Territorial:</div>
                <p style={{ fontSize: '0.9rem', color: '#6B655F' }}>
                  Trajetória clínica compatível com infecção aguda tratável. Sem reincidência de sintomas ou inconsistências de histórico familiar.
                </p>
              </div>
            </div>
          ) : (
            <div className="card animate-fade-in" style={{ borderLeft: '6px solid #D97706', background: '#FFFFFF', boxShadow: '0 12px 32px rgba(217, 119, 6, 0.12)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#6B655F', fontWeight: 600 }}>CASO #9104 • MICROÁREA 04 (ACS ANA)</div>
                  <h3 style={{ fontSize: '1.4rem', color: '#4A2F1B', fontWeight: 800 }}>Paciente J.S.M. (7 anos)</h3>
                </div>
                <div style={{ background: '#FEF3C7', color: '#B45309', padding: '8px 18px', borderRadius: '9999px', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #FDE68A' }}>
                  <AlertTriangle size={18} />
                  <span>JORNADA ATÍPICA DETECTADA</span>
                </div>
              </div>

              {/* Grid de Metricas da Atipicidade */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                <div style={{ background: '#FEF3C7', padding: '16px', borderRadius: '12px', border: '1px solid #FDE68A' }}>
                  <div style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: 700 }}>ATENDIMENTOS</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#92400E' }}>11 registros</div>
                </div>

                <div style={{ background: '#FEF3C7', padding: '16px', borderRadius: '12px', border: '1px solid #FDE68A' }}>
                  <div style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: 700 }}>ESPECIALIDADES</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#92400E' }}>4 consultas distintas</div>
                </div>

                <div style={{ background: '#FEF3C7', padding: '16px', borderRadius: '12px', border: '1px solid #FDE68A' }}>
                  <div style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: 700 }}>TEMPO SEM RESOLUÇÃO</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#92400E' }}>3 anos em investigação</div>
                </div>

                <div style={{ background: '#FEF3C7', padding: '16px', borderRadius: '12px', border: '1px solid #FDE68A' }}>
                  <div style={{ fontSize: '0.8rem', color: '#B45309', fontWeight: 700 }}>HISTÓRICO FAMILIAR</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#92400E' }}>Positivo (Pai com fraqueza)</div>
                </div>
              </div>

              {/* Destaque de Explicabilidade - 4 Sinais Encontrados */}
              <div style={{ background: '#FFFBEB', borderRadius: '16px', padding: '24px', border: '1px solid #FCD34D' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#B45309', fontWeight: 800, fontSize: '1.05rem' }}>
                  <ShieldAlert size={20} />
                  <span>4 SINAIS ENCONTRADOS QUE JUSTIFICAM A ATIPICIDADE</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '10px', borderLeft: '4px solid #D97706', fontSize: '0.9rem', fontWeight: 700, color: '#4A2F1B' }}>
                    • Longa jornada no SUS sem resolução clínica (3 anos)
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '10px', borderLeft: '4px solid #D97706', fontSize: '0.9rem', fontWeight: 700, color: '#4A2F1B' }}>
                    • Peregrinação por múltiplas especialidades isoladas (4 áreas)
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '10px', borderLeft: '4px solid #D97706', fontSize: '0.9rem', fontWeight: 700, color: '#4A2F1B' }}>
                    • Manifestação motora precoce na infância (dificuldade ao andar)
                  </div>
                  <div style={{ background: '#FFFFFF', padding: '12px 16px', borderRadius: '10px', borderLeft: '4px solid #D97706', fontSize: '0.9rem', fontWeight: 700, color: '#4A2F1B' }}>
                    • Recorrência familiar confirmada em visita domiciliar do ACS
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}
