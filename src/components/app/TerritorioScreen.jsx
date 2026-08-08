import React, { useState } from 'react';
import { MapPin, Users, Activity, ChevronRight, ArrowLeft } from 'lucide-react';

const FICTITIOUS_STORIES = [
  { id: '1', name: 'História #9104 (Lia, 7a)',    nodes: 'UBS ➔ Neuro ➔ Orto ✂️',  index: '8/12', tier: 'COMPLEXA',  clues: 'Muitos retornos, Ruptura' },
  { id: '2', name: 'História #8401 (Marcos, 34a)', nodes: 'UBS ➔ Atendimento ➔ OK', index: '1/12', tier: 'HABITUAL',  clues: 'Resolução rápida' },
  { id: '3', name: 'História #7203 (Bete, 52a)',   nodes: 'UBS ↔ UPA ↔ Cardio',    index: '7/12', tier: 'COMPLEXA',  clues: 'Looping de retornos' },
  { id: '4', name: 'História #6112 (Pedro, 12a)',  nodes: 'UBS ➔ Fisio ✂️',         index: '5/12', tier: 'ALGUNS NÓS', clues: 'Consulta pendente' },
];

export default function TerritorioScreen({ onSelectStory }) {
  const [selectedStory, setSelectedStory] = useState(null);

  if (selectedStory) {
    return (
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
        <button onClick={() => setSelectedStory(null)} style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: '#6B655F', width: 'fit-content' }}>
          <ArrowLeft size={16} /> Voltar ao Radar
        </button>

        <div className="card" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', border: '1px solid var(--color-border)' }}>
          <div className="badge badge-brown" style={{ marginBottom: '12px', fontSize: '0.72rem' }}>
            <MapPin size={11} /> Microárea 04
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '14px' }}>
            {selectedStory.name}
          </h3>

          {/* Grafo First */}
          <div style={{ background: 'var(--color-bg-warm)', padding: '16px', borderRadius: '14px', marginBottom: '16px', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#8B5A2B', textTransform: 'uppercase', marginBottom: '8px' }}>
              Grafo de Trajetória Assistencial
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-primary)' }}>
              {selectedStory.nodes}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.85rem', color: '#6B655F', fontWeight: 600 }}>Índice de Enredamento:</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', color: '#B45309' }}>
              {selectedStory.index}
            </span>
          </div>

          <div style={{ background: '#FFFBEB', padding: '12px 14px', borderRadius: '10px', fontSize: '0.84rem', color: '#4A2F1B', fontWeight: 700 }}>
            Por que esta história apareceu no radar?
            <div style={{ fontSize: '0.8rem', color: '#8B5A2B', fontWeight: 600, marginTop: '4px' }}>
              • {selectedStory.clues}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Gestão Territorial do ACS
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4A2F1B', margin: '2px 0 0' }}>
          Radar de Jornadas
        </h2>
      </div>

      {/* Aggregate Stats */}
      <div className="card" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', border: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={16} color="var(--color-primary)" />
          <span>542 pessoas acompanhadas no território</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ background: 'rgba(11,107,43,0.08)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(11,107,43,0.2)' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--color-primary)' }}>487</div>
            <div style={{ fontSize: '0.72rem', color: '#6B655F', fontWeight: 600 }}>Aparentemente resolutivas</div>
          </div>

          <div style={{ background: 'var(--color-amber-bg)', padding: '12px', borderRadius: '12px', border: '1px solid var(--color-amber-border)' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#B45309' }}>37</div>
            <div style={{ fontSize: '0.72rem', color: '#B45309', fontWeight: 700 }}>Com algum nó</div>
          </div>

          <div style={{ background: '#FEF2F2', padding: '12px', borderRadius: '12px', border: '1px solid #FCA5A5' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#DC2626' }}>14</div>
            <div style={{ fontSize: '0.72rem', color: '#DC2626', fontWeight: 700 }}>Jornadas complexas</div>
          </div>

          <div style={{ background: 'var(--color-bg-warm)', padding: '12px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#4A2F1B' }}>4</div>
            <div style={{ fontSize: '0.72rem', color: '#8B5A2B', fontWeight: 700 }}>Sugeridas para revisão</div>
          </div>
        </div>
      </div>

      {/* Story List */}
      <div>
        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase', marginBottom: '12px' }}>
          Histórias Acompanhadas no Território
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {FICTITIOUS_STORIES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStory(s)}
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                background: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#4A2F1B' }}>{s.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 700, marginTop: '2px' }}>
                  {s.nodes}
                </div>
              </div>
              <ChevronRight size={18} color="var(--color-quati-brown)" />
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
