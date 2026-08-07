import React, { useState } from 'react';
import { Mic, Play, Pause, CheckCheck, Sparkles, Database, ArrowRight, MessageSquare, AudioWaveform } from 'lucide-react';

export default function WhatsAppDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(3); // 0: Áudio, 1: Transcrição, 2: Estruturação, 3: Jornada

  return (
    <section id="whatsapp" className="section" style={{ background: '#F4F1E8' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>
            <MessageSquare size={14} />
            <span>Captura sem Atrito no Território</span>
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#4A2F1B', marginBottom: '16px' }}>
            "O território vê o que o prontuário não vê."
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#6B655F' }}>
            O Agente Comunitário de Saúde não precisa preencher formulários extensos. Um simples áudio no WhatsApp é transformado em dado estruturado pela inteligência do Nasua.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          
          {/* Lado Esquerdo: Interface de WhatsApp Simulado */}
          <div style={{ background: '#0B141A', borderRadius: '28px', padding: '20px', boxShadow: '0 16px 40px rgba(0,0,0,0.15)', border: '4px solid #2A3942' }}>
            
            {/* Header do WhatsApp */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '14px', borderBottom: '1px solid #222D34', marginBottom: '16px' }}>
              <div style={{ position: 'relative' }}>
                <img src="/nasua.png" alt="Nasua IA" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F4F1E8', padding: '2px' }} />
                <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', background: '#25D366', borderRadius: '50%', border: '2px solid #0B141A' }}></span>
              </div>
              <div>
                <div style={{ color: '#E9EDEF', fontWeight: 700, fontSize: '0.95rem' }}>Nasua — Agente na Sua</div>
                <div style={{ color: '#8696A0', fontSize: '0.75rem' }}>Online • Inteligência Territorial SUS</div>
              </div>
            </div>

            {/* Chat Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '340px' }}>
              
              {/* Mensagem 1: Áudio da ACS Ana */}
              <div style={{ alignSelf: 'flex-end', maxWidth: '88%', background: '#005C4B', color: '#E9EDEF', borderRadius: '16px 16px 2px 16px', padding: '12px 16px' }}>
                <div style={{ fontSize: '0.78rem', color: '#8696A0', marginBottom: '6px', fontWeight: 600 }}>ACS Ana • Visita Domiciliar</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#25D366', border: 'none', color: '#0B141A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '20px' }}>
                      {[40, 75, 30, 90, 60, 45, 80, 100, 50, 65, 35, 70, 95, 40, 20].map((h, i) => (
                        <div key={i} style={{ flex: 1, height: `${isPlaying ? (i % 2 === 0 ? h : h * 0.6) : 30}%`, background: isPlaying ? '#25D366' : '#8696A0', borderRadius: '2px', transition: 'height 0.2s ease' }} />
                      ))}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#8696A0', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                      <span>0:18</span>
                      <CheckCheck size={14} color="#53BDEB" />
                    </div>
                  </div>
                </div>
                
                <p style={{ fontSize: '0.88rem', marginTop: '8px', color: '#E9EDEF', fontStyle: 'italic', background: 'rgba(0,0,0,0.15)', padding: '8px 10px', borderRadius: '8px' }}>
                  "Visitei uma criança de sete anos que ainda não anda. A mãe contou que o pai também tinha bastante fraqueza muscular."
                </p>
              </div>

              {/* Mensagem 2: Resposta Inteligente da Nasua IA */}
              <div style={{ alignSelf: 'flex-start', maxWidth: '92%', background: '#202C33', color: '#E9EDEF', borderRadius: '16px 16px 16px 2px', padding: '14px 16px', borderLeft: '3px solid #57B33E' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#57B33E', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px' }}>
                  <Sparkles size={14} />
                  <span>Nasua IA • Triagem territorial</span>
                </div>
                
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                  Identifiquei informações que podem ser importantes para a investigação clínica:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                  <div style={{ background: 'rgba(87, 179, 62, 0.15)', padding: '6px 10px', borderRadius: '6px', color: '#57B33E', fontSize: '0.85rem', fontWeight: 600 }}>
                    ✓ Atraso motor em idade escolar
                  </div>
                  <div style={{ background: 'rgba(87, 179, 62, 0.15)', padding: '6px 10px', borderRadius: '6px', color: '#57B33E', fontSize: '0.85rem', fontWeight: 600 }}>
                    ✓ Possível recorrência familiar (lado paterno)
                  </div>
                  <div style={{ background: 'rgba(87, 179, 62, 0.15)', padding: '6px 10px', borderRadius: '6px', color: '#57B33E', fontSize: '0.85rem', fontWeight: 600 }}>
                    ✓ Manifestação precoce infantil
                  </div>
                </div>

                <div style={{ fontStyle: 'italic', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', borderLeft: '2px solid #8B5A2B', fontSize: '0.88rem' }}>
                  "Essa criança nunca chegou a andar ou perdeu essa capacidade?"
                </div>
              </div>

            </div>

          </div>

          {/* Lado Direito: A Transformação Visual */}
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '16px' }}>
              Como o áudio se transforma em inteligência de cuidado:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: activeStep === 0 ? '#FFFFFF' : 'rgba(255,255,255,0.6)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(11, 107, 43, 0.1)', color: '#0B6B2B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>1</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#4A2F1B' }}>ÁUDIO DE CAMPO</div>
                  <div style={{ fontSize: '0.85rem', color: '#6B655F' }}>O agente relata a observação em linguagem natural pelo WhatsApp.</div>
                </div>
              </div>

              <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(46, 139, 60, 0.1)', color: '#2E8B3C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>2</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#4A2F1B' }}>TRANSCRIÇÃO E PROCESSAMENTO</div>
                  <div style={{ fontSize: '0.85rem', color: '#6B655F' }}>Whisper + LLM transcrevem e normalizam o áudio instantaneamente.</div>
                </div>
              </div>

              <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(139, 90, 43, 0.1)', color: '#8B5A2B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>3</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#4A2F1B' }}>DADOS ESTRUTURADOS</div>
                  <div style={{ fontSize: '0.85rem', color: '#6B655F' }}>Conversão automática em termos clínicos padronizados (CID / HPO).</div>
                </div>
              </div>

              <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '2px solid #57B33E', background: '#FFFFFF' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#57B33E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>4</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0B6B2B' }}>COMPOSIÇÃO DA JORNADA</div>
                  <div style={{ fontSize: '0.85rem', color: '#6B655F' }}>O dado entra no histórico do território e aciona o motor de atipicidade.</div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
