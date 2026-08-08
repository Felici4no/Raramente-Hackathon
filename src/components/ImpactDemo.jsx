import React from 'react';
import { Award, ShieldCheck, CheckCircle2, HeartHandshake, UserCheck, Sparkles } from 'lucide-react';

const EVENTS = [
  { label: 'Visita domiciliar',    detail: 'Registrada e geolocalizada',  status: 'verified',  icon: <CheckCircle2 size={14} /> },
  { label: 'Informação familiar',  detail: 'Histórico confirmado pelo ACS', status: 'confirmed', icon: <ShieldCheck size={14} /> },
  { label: 'Acompanhamento',       detail: 'Retorno com continuidade',    status: 'verified',  icon: <CheckCircle2 size={14} /> },
  { label: 'Encaminhamento',       detail: 'Aguardando conclusão',         status: 'pending',   icon: <span style={{fontSize:'13px',lineHeight:1}}>◌</span> },
];

const STATUS_LABELS = {
  verified:  { text: '✓ verificada',   cls: 'verified' },
  confirmed: { text: '✓ confirmada',   cls: 'confirmed' },
  pending:   { text: '⧖ em acompanhamento', cls: 'pending' },
};

export default function ImpactDemo() {
  return (
    <section id="impacto" className="section" style={{ background: 'var(--color-bg-warm)' }}>
      <div className="container">

        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 52px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>
            <Award size={13} aria-hidden="true" />
            <span>Impacto Verificado</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
            fontWeight: 800,
            color: '#4A2F1B',
            marginBottom: '16px',
          }}>
            O trabalho no território também deixa evidências.
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#6B655F', lineHeight: 1.65 }}>
            Impacto Verificado reconhece ações realmente realizadas, registradas e confirmadas ao longo da jornada. Não é uma pontuação por "casos encontrados" — é o registro do trabalho contínuo no território.
          </p>
        </div>

        <div className="grid-2col" style={{ gap: '48px', alignItems: 'start' }}>

          {/* ── Left: ACS profile card ── */}
          <div className="card animate-fade-in" style={{
            border: '2px solid #57B33E',
            borderRadius: '16px',
          }}>

            {/* Profile header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--color-border-subtle)',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(11,107,43,0.1)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  flexShrink: 0,
                }} aria-hidden="true">
                  AA
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#4A2F1B', fontWeight: 800 }}>Ana</h3>
                  <p style={{ fontSize: '0.82rem', color: '#8B5A2B', fontWeight: 600 }}>
                    Agente Comunitária de Saúde<br />
                    Microárea 04 · UBS Parque das Nações
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', color: '#6B655F', textTransform: 'uppercase', fontWeight: 700 }}>
                  Impacto Verificado
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 900,
                  color: 'var(--color-primary)',
                }}>
                  1.420 <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>pts</span>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid-metrics-2col" style={{ marginBottom: '24px' }}>
              {[
                { icon: <CheckCircle2 size={15} />, color: '#0B6B2B', label: 'VISITAS VERIFICADAS',          value: '142', note: 'Comprovação em campo' },
                { icon: <UserCheck size={15} />,    color: '#2E8B3C', label: 'JORNADAS ACOMPANHADAS',        value: '31',  note: 'Continuidade do cuidado' },
                { icon: <ShieldCheck size={15} />,  color: '#8B5A2B', label: 'INFORMAÇÕES CONFIRMADAS',      value: '18',  note: 'Precisão de dados' },
                { icon: <HeartHandshake size={15} />, color: '#57B33E', label: 'ACOMPANHAMENTOS CONCLUÍDOS', value: '07',  note: 'Ações resolvidas' },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--color-bg-warm)',
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: m.color,
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}>
                    {m.icon}
                    <span>{m.label}</span>
                  </div>
                  <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#4A2F1B' }}>{m.value}</div>
                  <div style={{ fontSize: '0.74rem', color: '#6B655F' }}>{m.note}</div>
                </div>
              ))}
            </div>

            {/* Validated events list */}
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.75rem',
                color: 'var(--color-quati-brown)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '12px',
              }}>
                Registro de ações recentes
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {EVENTS.map((ev, i) => {
                  const s = STATUS_LABELS[ev.status];
                  return (
                    <div key={i} className="impact-event">
                      <div style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true">
                        {ev.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#231C18' }}>{ev.label}</div>
                        <div style={{ fontSize: '0.75rem', color: '#8B5A2B', fontStyle: 'italic' }}>{ev.detail}</div>
                      </div>
                      <span className={`impact-badge-verified ${s.cls}`} aria-label={s.text}>
                        {s.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom note */}
            <div style={{
              marginTop: '20px',
              background: 'rgba(11,107,43,0.06)',
              borderRadius: '8px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.84rem',
              color: 'var(--color-primary)',
              fontWeight: 600,
            }}>
              <ShieldCheck size={16} aria-hidden="true" />
              <span>A pontuação valoriza o trabalho contínuo, a escuta atenta e a qualidade da informação territorial.</span>
            </div>
          </div>

          {/* ── Right: Why this model ── */}
          <div>
            <h3 style={{
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
              fontWeight: 800,
              color: '#4A2F1B',
              marginBottom: '24px',
              lineHeight: 1.3,
            }}>
              Um modelo de reconhecimento defensável e ético no SUS
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                {
                  icon: <CheckCircle2 size={20} color="#0B6B2B" />,
                  title: 'Sem metas perversas',
                  desc: 'Não pontuamos a quantidade de jornadas atípicas encontradas. Isso evita falsas notificações e pressões inadequadas sobre a rede de atenção primária.',
                },
                {
                  icon: <ShieldCheck size={20} color="#2E8B3C" />,
                  title: 'Foco no trabalho comprovado',
                  desc: 'O sistema reconhece a constância das visitas, o preenchimento do histórico e o acompanhamento após encaminhamentos — não o resultado.',
                },
                {
                  icon: <Sparkles size={20} color="#8B5A2B" />,
                  title: 'Autonomia para o território',
                  desc: 'Os dados do Impacto Verificado geram indicadores confiáveis para coordenadores de UBS e gestores municipais de saúde.',
                },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    background: '#FFFFFF',
                    border: '1px solid var(--color-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }} aria-hidden="true">
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#4A2F1B', marginBottom: '6px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: '#6B655F', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
