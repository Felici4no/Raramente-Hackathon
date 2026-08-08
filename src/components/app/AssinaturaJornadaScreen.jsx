import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, Send, Share2, Compass, AlertCircle } from 'lucide-react';

export default function AssinaturaJornadaScreen({ pData, onReset, onViewTerritorio }) {
  const [submittedRevision, setSubmittedRevision] = useState(false);

  // Extract answers & origin
  const origin = pData?.origin || 'TERRITÓRIO';
  const answers = pData?.answers || {};
  const cond = pData?.conditionalAnswers || {};

  // Calculate 6 Dimensions (0, 1, or 2 each)
  const peregrinacao = answers.peregrinacao === 'SIM' ? (cond.placesCount === '5 ou mais' ? 2 : 1) : 0;
  const repeticao = answers.repeticao === 'SIM' ? 2 : 0;
  const tempo = answers.tempo === 'SIM' ? 2 : 0;
  const fragmentacao = answers.fragmentacao === 'SIM' ? 2 : (answers.fragmentacao === 'NAO_SEI' ? 1 : 0);
  const naoResolucao = answers.naoResolucao === 'SIM' ? 2 : 0;
  const ruptura = answers.ruptura === 'SIM' ? 2 : 0;

  const totalIndexScore = peregrinacao + repeticao + tempo + fragmentacao + naoResolucao + ruptura;

  // Enredamento Tier
  let tierLabel = 'JORNADA HABITUAL';
  let tierColor = '#0B6B2B';
  let tierBg = 'rgba(11,107,43,0.1)';
  let tierBorder = 'rgba(11,107,43,0.25)';

  if (totalIndexScore >= 10) {
    tierLabel = 'PRIORIZAR REVISÃO';
    tierColor = '#DC2626';
    tierBg = '#FEF2F2';
    tierBorder = '#FCA5A5';
  } else if (totalIndexScore >= 7) {
    tierLabel = 'JORNADA COMPLEXA';
    tierColor = '#B45309';
    tierBg = '#FEF3C7';
    tierBorder = '#FDE68A';
  } else if (totalIndexScore >= 4) {
    tierLabel = 'ALGUNS NÓS';
    tierColor = '#D97706';
    tierBg = 'rgba(217,119,6,0.1)';
    tierBorder = 'rgba(217,119,6,0.3)';
  }

  // Calculate Reconstructed Completeness % based on known facts
  let knownItems = [];
  let pendingItems = [];

  if (origin) knownItems.push('Origem da escuta conhecida (' + origin + ')');
  else pendingItems.push('Origem da escuta');

  if (answers.peregrinacao !== 'NAO_SEI') knownItems.push('Serviços percorridos identificados');
  else pendingItems.push('Total de serviços percorridos');

  if (answers.repeticao !== 'NAO_SEI') knownItems.push('Padrão de retornos conhecido');
  else pendingItems.push('Número de retornos à UBS');

  if (answers.tempo !== 'NAO_SEI') knownItems.push('Tempo aproximado da busca');
  else pendingItems.push('Duração exata da busca por respostas');

  if (answers.ruptura === 'SIM' && cond.cutType) knownItems.push('Ponto de ruptura identificado (' + cond.cutType + ')');
  else if (answers.ruptura === 'SIM') pendingItems.push('Motivo e local exato da ruptura');
  else knownItems.push('Sem registros de encaminhamento pendente');

  const completenessPercent = Math.round((knownItems.length / (knownItems.length + pendingItems.length)) * 100);

  // Key clues summary
  const keyClues = [];
  if (answers.repeticao === 'SIM') keyClues.push('🔄 Muitos retornos aos serviços');
  if (answers.tempo === 'SIM') keyClues.push('⏳ Longa busca por respostas');
  if (answers.ruptura === 'SIM') keyClues.push('✂️ Ruptura ou encaminhamento pendente');
  if (answers.fragmentacao === 'SIM') keyClues.push('🧩 Cuidado dividido entre múltiplos pontos');

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      
      {/* Header Back Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onReset} style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#6B655F' }}>
          <ArrowLeft size={16} /> Voltar ao Radar
        </button>
        <span className="badge badge-brown" style={{ fontSize: '0.72rem' }}>
          Assinatura Assistencial
        </span>
      </div>

      {/* Title */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Reconstrução da Trajetória
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4A2F1B', margin: '2px 0 0' }}>
          Como está essa jornada?
        </h2>
      </div>

      {/* Visual Network Graph (Origem Real) */}
      <div className="trajectory-graph-container">
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#8B5A2B', textTransform: 'uppercase', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Compass size={14} color="var(--color-primary)" />
          <span>Grafo de Trajetória pela Rede de Cuidado</span>
        </div>

        {/* Dynamic Nodes Flow */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', margin: '10px 0 16px' }}>
          <span className="graph-node-chip graph-node-origin">
            🏠 {origin}
          </span>
          <span style={{ color: '#8B5A2B', fontWeight: 800 }}>➔</span>

          <span className="graph-node-chip graph-node-service">
            🏥 UBS
          </span>

          {answers.peregrinacao === 'SIM' && (
            <>
              <span style={{ color: '#8B5A2B', fontWeight: 800 }}>➔</span>
              <span className="graph-node-chip graph-node-service">
                🩺 Especialista
              </span>
            </>
          )}

          {answers.repeticao === 'SIM' && (
            <>
              <span style={{ color: '#D97706', fontWeight: 800 }}>↔</span>
              <span className="graph-node-chip graph-node-loop">
                🔄 UPA / UBS
              </span>
            </>
          )}

          {answers.ruptura === 'SIM' && (
            <>
              <span style={{ color: '#DC2626', fontWeight: 800 }}>✂️</span>
              <span className="graph-node-chip graph-node-cut">
                {cond.cutType || 'Encaminhamento Interrompido'}
              </span>
            </>
          )}
        </div>

        {/* Coati Tail Thread Indicator */}
        <div style={{ background: 'var(--color-bg-warm)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.78rem', color: '#8B5A2B', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/nasua.png" alt="Nasua" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
          <span>"Essa história passou por muitos caminhos e ainda possui pontos sem resolução."</span>
        </div>
      </div>

      {/* Enredamento Index & Assessment */}
      <div className="card" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', borderLeft: `6px solid ${tierColor}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#6B655F', textTransform: 'uppercase' }}>
              Índice de Enredamento
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: tierColor }}>
              {totalIndexScore} <span style={{ fontSize: '0.9rem', color: '#8B5A2B', fontWeight: 700 }}>/ 12</span>
            </div>
          </div>

          <span style={{
            padding: '6px 14px',
            borderRadius: '8px',
            background: tierBg,
            border: `1px solid ${tierBorder}`,
            color: tierColor,
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: '0.85rem',
          }}>
            {tierLabel}
          </span>
        </div>

        {/* 6 Dimensions Mini Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
          {[
            { label: 'Peregrinação', score: peregrinacao },
            { label: 'Tempo', score: tempo },
            { label: 'Fragmentação', score: fragmentacao },
            { label: 'Repetição', score: repeticao },
            { label: 'Não resolução', score: naoResolucao },
            { label: 'Ruptura', score: ruptura },
          ].map((dim, i) => (
            <div key={i} style={{ background: 'var(--color-bg-warm)', padding: '8px', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.65rem', color: '#8B5A2B', fontWeight: 700 }}>{dim.label}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: dim.score > 0 ? tierColor : '#6B655F' }}>{dim.score}</div>
            </div>
          ))}
        </div>

        {/* Key Clues Summary */}
        {keyClues.length > 0 && (
          <div style={{ background: '#FFFBEB', borderRadius: '10px', padding: '14px', border: '1px solid #FCD34D', marginBottom: '12px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#B45309', marginBottom: '8px' }}>
              Pistas Principais Encontradas:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {keyClues.map((clue, idx) => (
                <div key={idx} style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4A2F1B' }}>
                  {clue}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ fontSize: '0.72rem', color: '#8B5A2B', fontStyle: 'italic', textAlign: 'center' }}>
          Heurística demonstrativa — não representa avaliação clínica nem diagnóstico médico.
        </div>
      </div>

      {/* Jornada Reconstruída % (Completeness) */}
      <div className="card" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase' }}>
            Jornada Reconstruída
          </span>
          <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-primary)' }}>
            {completenessPercent}%
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', background: 'var(--color-border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
          <div style={{ width: `${completenessPercent}%`, height: '100%', background: 'var(--color-primary)', transition: 'width 0.6s ease' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {knownItems.map((item, idx) => (
            <div key={idx} style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} />
              <span>{item}</span>
            </div>
          ))}
          {pendingItems.map((item, idx) => (
            <div key={idx} style={{ fontSize: '0.8rem', color: '#8B5A2B', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={14} color="#D97706" />
              <span>Pendente: {item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {!submittedRevision ? (
          <button
            onClick={() => setSubmittedRevision(true)}
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px', fontSize: '0.95rem', borderRadius: '16px' }}
          >
            <Send size={18} />
            <span>Sugerir revisão da jornada</span>
          </button>
        ) : (
          <div style={{ background: 'rgba(11,107,43,0.1)', padding: '14px', borderRadius: '14px', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.88rem', textAlign: 'center' }}>
            ✓ Sugestão enviada à equipe de saúde para revisão!
          </div>
        )}

        <button
          onClick={onViewTerritorio}
          className="btn btn-secondary"
          style={{ width: '100%', padding: '14px', fontSize: '0.9rem', borderRadius: '16px' }}
        >
          <Share2 size={16} />
          <span>Ver no Radar do Território</span>
        </button>
      </div>

    </div>
  );
}
