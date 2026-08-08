import React, { useState } from 'react';
import { Mic, Play, Pause, CheckCheck, Sparkles, MessageSquare, ArrowDown } from 'lucide-react';

const FLOW_STEPS = [
  { step: 'VOZ',              desc: 'Áudio enviado pelo ACS via WhatsApp',            color: 'rgba(139,90,43,0.12)', text: '#8B5A2B' },
  { step: 'TRANSCRIÇÃO',      desc: 'Fala convertida em texto (Whisper)',              color: 'rgba(46,139,60,0.1)',  text: '#2E8B3C' },
  { step: 'EXTRAÇÃO',         desc: 'Entidades clínicas e contexto identificados',    color: 'rgba(11,107,43,0.1)',  text: '#0B6B2B' },
  { step: 'DADOS ESTRUTURADOS', desc: 'Termos normalizados (HPO / CID)',             color: 'rgba(11,107,43,0.12)', text: '#0B6B2B' },
  { step: 'JORNADA',          desc: 'Evento entra na linha do tempo do paciente',     color: 'rgba(11,107,43,0.18)', text: '#085221' },
];

export default function WhatsAppDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="whatsapp" className="section" style={{ background: 'var(--color-bg-warm)' }}>
      <div className="container">

        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 52px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>
            <MessageSquare size={13} aria-hidden="true" />
            <span>Nasua — Interface Conversacional</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
            fontWeight: 800,
            color: '#4A2F1B',
            marginBottom: '16px',
          }}>
            O território vê o que o prontuário não vê.
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#6B655F', lineHeight: 1.65 }}>
            O ACS não precisa preencher formulários extensos. Um áudio no WhatsApp é transformado em dado estruturado pela inteligência do Nasua — e passa a compor a jornada do paciente no QuaTiRare.
          </p>
        </div>

        <div className="grid-2col" style={{ gap: '40px', alignItems: 'start' }}>

          {/* ── Left: WhatsApp chat ── */}
          <div style={{
            background: '#0B141A',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 20px 48px rgba(0,0,0,0.18)',
            border: '3px solid #2A3942',
          }}>
            {/* Chat header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingBottom: '14px',
              borderBottom: '1px solid #222D34',
              marginBottom: '20px',
            }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="/nasua.png"
                  alt="Nasua IA"
                  style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                />
                <span style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: '10px', height: '10px',
                  background: '#25D366',
                  borderRadius: '50%',
                  border: '2px solid #0B141A',
                }} aria-hidden="true" />
              </div>
              <div>
                <div style={{ color: '#E9EDEF', fontWeight: 700, fontSize: '0.95rem' }}>
                  Nasua — Agente na Sua
                </div>
                <div style={{ color: '#8696A0', fontSize: '0.75rem' }}>
                  Online · Inteligência Territorial SUS
                </div>
              </div>
            </div>

            {/* Chat messages */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* ACS message */}
              <div style={{
                alignSelf: 'flex-end',
                maxWidth: '92%',
                background: '#005C4B',
                color: '#E9EDEF',
                borderRadius: '10px 10px 2px 10px',
                padding: '12px 14px',
              }}>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#8696A0',
                  marginBottom: '8px',
                  fontWeight: 600,
                }}>
                  ACS Ana · Visita Domiciliar
                </div>

                {/* Audio player */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pausar áudio' : 'Reproduzir áudio'}
                    style={{
                      width: '36px', height: '36px',
                      borderRadius: '50%',
                      background: '#25D366',
                      border: 'none',
                      color: '#0B141A',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      minWidth: '44px', minHeight: '44px',
                    }}
                  >
                    {isPlaying
                      ? <Pause size={16} aria-hidden="true" />
                      : <Play size={16} style={{ marginLeft: '2px' }} aria-hidden="true" />
                    }
                  </button>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '20px' }} aria-hidden="true">
                      {[40, 75, 30, 90, 60, 45, 80, 100, 50, 65, 35, 70, 95, 40, 20].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: `${isPlaying ? (i % 2 === 0 ? h : h * 0.6) : 30}%`,
                            background: isPlaying ? '#25D366' : '#8696A0',
                            borderRadius: '2px',
                            transition: 'height 0.15s ease',
                          }}
                        />
                      ))}
                    </div>
                    <div style={{
                      fontSize: '0.7rem',
                      color: '#8696A0',
                      marginTop: '4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                      <span>0:18</span>
                      <CheckCheck size={14} color="#53BDEB" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <p style={{
                  fontSize: '0.88rem',
                  color: '#E9EDEF',
                  fontStyle: 'italic',
                  background: 'rgba(0,0,0,0.18)',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  margin: 0,
                  lineHeight: 1.55,
                }}>
                  "Estou acompanhando uma criança de 7 anos que nunca conseguiu andar. A mãe contou que o pai também tinha bastante fraqueza nas pernas."
                </p>
              </div>

              {/* Nasua response */}
              <div style={{
                alignSelf: 'flex-start',
                maxWidth: '96%',
                background: '#202C33',
                color: '#E9EDEF',
                borderRadius: '10px 10px 10px 2px',
                padding: '14px 16px',
                borderLeft: '3px solid #57B33E',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#57B33E',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  marginBottom: '10px',
                }}>
                  <Sparkles size={13} aria-hidden="true" />
                  <span>Nasua · Triagem territorial</span>
                </div>

                <p style={{ fontSize: '0.88rem', marginBottom: '10px', lineHeight: 1.5 }}>
                  Identifiquei algumas informações que podem ser importantes.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                  {[
                    'atraso motor',
                    'manifestação na infância',
                    'possível histórico familiar',
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(87,179,62,0.15)',
                        padding: '6px 10px',
                        borderRadius: '5px',
                        color: '#7DD67F',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                      }}
                    >
                      ✓ {item}
                    </div>
                  ))}
                </div>

                <div style={{
                  fontStyle: 'italic',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  borderLeft: '2px solid #8B5A2B',
                  fontSize: '0.87rem',
                  lineHeight: 1.5,
                }}>
                  "Ela nunca chegou a andar ou perdeu essa capacidade depois?"
                </div>
              </div>

            </div>
          </div>

          {/* ── Right: transformation flow ── */}
          <div>
            <h3 style={{
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              fontWeight: 800,
              color: '#4A2F1B',
              marginBottom: '24px',
            }}>
              Como o áudio vira dado estruturado:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {FLOW_STEPS.map((item, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    padding: '16px 20px',
                    borderRadius: '10px',
                    background: item.color,
                    border: `1px solid ${item.color.replace('0.1', '0.25').replace('0.12', '0.3').replace('0.18', '0.35')}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(255,255,255,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      color: item.text,
                      flexShrink: 0,
                    }} aria-hidden="true">
                      {i + 1}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        letterSpacing: '0.05em',
                        color: item.text,
                        marginBottom: '2px',
                      }}>
                        {item.step}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#6B655F', lineHeight: 1.4 }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  {i < FLOW_STEPS.length - 1 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      padding: '4px 0',
                    }} aria-hidden="true">
                      <ArrowDown size={16} color="var(--color-quati-brown)" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Bottom note */}
            <div style={{
              marginTop: '20px',
              padding: '14px 16px',
              background: '#FFFFFF',
              borderRadius: '10px',
              border: '1px solid var(--color-border)',
              fontSize: '0.85rem',
              color: '#6B655F',
              lineHeight: 1.55,
            }}>
              <strong style={{ color: '#4A2F1B' }}>Cada interação</strong> alimenta o histórico longitudinal do paciente no QuaTiRare, tornando a jornada progressivamente mais analisável.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
