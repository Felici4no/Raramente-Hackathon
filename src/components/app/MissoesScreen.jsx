import React, { useState } from 'react';
import { Target, CheckCircle2, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

const MISSIONS = [
  {
    id: 'm1',
    title: 'Nó Encontrado: Encaminhamento Perbido',
    desc: 'Uma consulta para Neurologia foi indicada há 8 meses, mas aparentemente nunca aconteceu na rede.',
    target: 'Família do Pedro (Microárea 04)',
    actionText: 'Confirmar se a consulta foi agendada ou perdida',
    resolvedMsg: 'Você ajudou a reconectar essa história! O encaminhamento foi reagendado.',
  },
  {
    id: 'm2',
    title: 'Nó Encontrado: Retorno sem Resposta',
    desc: 'Retorno para UBS agendado após exame de imagem que não foi anexado ao prontuário.',
    target: 'Família da Bete (Microárea 01)',
    actionText: 'Verificar com o morador se o exame foi realizado',
    resolvedMsg: 'Você ajudou a desatar um nó! O resultado do exame foi localizado.',
  },
];

export default function MissoesScreen() {
  const [resolvedIds, setResolvedIds] = useState([]);
  const [animatingId, setAnimatingId] = useState(null);

  const handleResolve = (id) => {
    setAnimatingId(id);
    setTimeout(() => {
      setResolvedIds((prev) => [...prev, id]);
      setAnimatingId(null);
    }, 800);
  };

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Desatar Nós do Território
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4A2F1B', margin: '2px 0 0' }}>
          Missões de Cuidado
        </h2>
      </div>

      {/* Intro Box */}
      <div style={{ background: 'linear-gradient(135deg, rgba(11,107,43,0.08) 0%, rgba(11,107,43,0.03) 100%)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(11,107,43,0.2)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/nasua.png" alt="Nasua" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        <div style={{ fontSize: '0.84rem', color: 'var(--color-primary)', fontWeight: 600, lineHeight: 1.45 }}>
          "Quando um encaminhamento é resgatado, a linha do cuidado volta a fluir!"
        </div>
      </div>

      {/* Missions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {MISSIONS.map((m) => {
          const isResolved = resolvedIds.includes(m.id);
          const isAnimating = animatingId === m.id;

          return (
            <div
              key={m.id}
              className={`card ${isAnimating ? 'animate-unknot' : ''}`}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '20px',
                border: isResolved ? '2px solid var(--color-success)' : '1px solid var(--color-amber-border)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className={`badge ${isResolved ? 'badge-primary' : 'badge-amber'}`} style={{ fontSize: '0.72rem' }}>
                  {isResolved ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                  {isResolved ? 'Nó Desatado' : 'Nó Pendente'}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#8B5A2B', fontWeight: 700 }}>{m.target}</span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '8px' }}>
                {m.title}
              </h3>

              <p style={{ fontSize: '0.86rem', color: '#524B45', lineHeight: 1.5, marginBottom: '14px' }}>
                {m.desc}
              </p>

              {!isResolved ? (
                <button
                  onClick={() => handleResolve(m.id)}
                  disabled={isAnimating}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.88rem', borderRadius: '12px' }}
                >
                  {isAnimating ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Desatando nó...</span>
                    </>
                  ) : (
                    <>
                      <Target size={16} />
                      <span>{m.actionText}</span>
                    </>
                  )}
                </button>
              ) : (
                <div style={{ background: 'rgba(11,107,43,0.08)', padding: '12px', borderRadius: '12px', fontSize: '0.84rem', color: 'var(--color-primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} />
                  <span>{m.resolvedMsg}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
