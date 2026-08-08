import React from 'react';
import { Award, ShieldCheck, CheckCircle2, HeartHandshake, UserCheck, Sparkles } from 'lucide-react';

export default function ImpactDemo() {
  return (
    <section id="impacto" className="section" style={{ background: '#F4F1E8' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>
            <Award size={14} />
            <span>Valorização do Agente Comunitário</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#4A2F1B', marginBottom: '16px' }}>
            Quem transforma o território também precisa ser reconhecido.
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B655F' }}>
            Cada ação pode deixar uma evidência. Quando uma visita, acompanhamento ou informação é confirmada, ela passa a compor o <strong>Impacto Verificado</strong> daquele agente e de sua comunidade.
          </p>
        </div>

        <div className="grid-2col">
          
          {/* Card de Perfil da ACS Ana com Pontuação de Impacto Verificado */}
          <div className="card animate-fade-in" style={{ border: '2px solid #57B33E', background: '#FFFFFF', borderRadius: '12px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid #EBE7DE', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '10px', background: 'rgba(11, 107, 43, 0.1)', color: '#0B6B2B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}>
                  AA
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#4A2F1B', fontWeight: 800 }}>Ana — Agente Comunitária</h3>
                  <p style={{ fontSize: '0.85rem', color: '#8B5A2B', fontWeight: 600 }}>Microárea 04 • UBS Parque das Nações</p>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', color: '#6B655F', textTransform: 'uppercase', fontWeight: 700 }}>Impacto Verificado</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0B6B2B' }}>1.420 <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>pts</span></div>
              </div>
            </div>

            {/* Metricas de Trabalho Comprovado */}
            <div className="grid-metrics-2col" style={{ marginBottom: '24px' }}>
              
              <div style={{ background: '#F4F1E8', padding: '16px', borderRadius: '8px', border: '1px solid #E2DDD3' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B6B2B', fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px' }}>
                  <CheckCircle2 size={16} />
                  <span>VISITAS VALIDADAS</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4A2F1B' }}>142</div>
                <div style={{ fontSize: '0.75rem', color: '#6B655F' }}>Comprovação em campo</div>
              </div>

              <div style={{ background: '#F4F1E8', padding: '16px', borderRadius: '8px', border: '1px solid #E2DDD3' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2E8B3C', fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px' }}>
                  <UserCheck size={16} />
                  <span>JORNADAS ACOMPANHADAS</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4A2F1B' }}>31</div>
                <div style={{ fontSize: '0.75rem', color: '#6B655F' }}>Continuidade do cuidado</div>
              </div>

              <div style={{ background: '#F4F1E8', padding: '16px', borderRadius: '8px', border: '1px solid #E2DDD3' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8B5A2B', fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px' }}>
                  <ShieldCheck size={16} />
                  <span>INFORMAÇÕES CONFIRMADAS</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4A2F1B' }}>18</div>
                <div style={{ fontSize: '0.75rem', color: '#6B655F' }}>Precisão de dados</div>
              </div>

              <div style={{ background: '#F4F1E8', padding: '16px', borderRadius: '8px', border: '1px solid #E2DDD3' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#57B33E', fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px' }}>
                  <HeartHandshake size={16} />
                  <span>ACOMPANHAMENTOS CONCLUÍDOS</span>
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#4A2F1B' }}>07</div>
                <div style={{ fontSize: '0.75rem', color: '#6B655F' }}>Ações resolvidas</div>
              </div>

            </div>

            <div style={{ background: '#E8F5E9', borderRadius: '6px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#0B6B2B', fontWeight: 600 }}>
              <ShieldCheck size={18} style={{ flexShrink: 0 }} />
              <span>Validação sem atrito: A pontuação valoriza o trabalho contínuo, a escuta atenta e a qualidade da informação territorial.</span>
            </div>

          </div>

          {/* Lado Direito: Por que o modelo e defensavel */}
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '20px' }}>
              Um modelo de gamificação defensável e ético no SUS
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #E2DDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle2 size={22} color="#0B6B2B" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#4A2F1B', marginBottom: '4px' }}>
                    Sem metas perversas
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: '#6B655F' }}>
                    Não pontuamos a quantidade de "pacientes raros" encontrados. Isso evitaria falsas notificações e pressões inadequadas sobre a rede de atenção primária.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #E2DDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={22} color="#2E8B3C" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#4A2F1B', marginBottom: '4px' }}>
                    Foco no trabalho comprovado
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: '#6B655F' }}>
                    O sistema reconhece a constância das visitas domiciliares, o preenchimento de histórico e o retorno com a família após o encaminhamento.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #E2DDD3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={22} color="#8B5A2B" />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#4A2F1B', marginBottom: '4px' }}>
                    Autonomia para o território
                  </h4>
                  <p style={{ fontSize: '0.92rem', color: '#6B655F' }}>
                    Os dados do Impacto Verificado geram indicadores confiáveis para coordenadores de UBS e gestores municipais de saúde.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
