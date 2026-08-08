import React, { useState } from 'react';
import { ArrowLeft, Check, X, HelpCircle, MapPin, Sparkles, RefreshCw, ChevronRight } from 'lucide-react';

const CARDS_DATA = [
  {
    id: 'peregrinacao',
    dimension: 'Peregrinação',
    title: 'Passou por muitos lugares',
    desc: 'Essa pessoa já passou por vários serviços ou profissionais tentando resolver a mesma questão?',
    icon: '🚪',
    color: '#8B5A2B',
  },
  {
    id: 'repeticao',
    dimension: 'Repetição',
    title: 'Está sempre voltando',
    desc: 'Ela retorna repetidamente à UBS, especialista ou outro serviço sem uma resolução clara?',
    icon: '🔄',
    color: '#D97706',
  },
  {
    id: 'tempo',
    dimension: 'Tempo',
    title: 'Procura resposta há muito tempo',
    desc: 'Essa busca por uma explicação para os sintomas já dura meses ou anos?',
    icon: '⏳',
    color: '#B45309',
  },
  {
    id: 'fragmentacao',
    dimension: 'Fragmentação',
    title: 'Cada lugar sabe uma parte',
    desc: 'O cuidado parece dividido entre diferentes serviços sem uma comunicação entre eles?',
    icon: '🧩',
    color: '#2E8B3C',
  },
  {
    id: 'naoResolucao',
    dimension: 'Não resolução',
    title: 'Ainda não chegou a uma resposta',
    desc: 'Mesmo depois de diferentes atendimentos, a situação continua sem uma explicação clara?',
    icon: '❓',
    color: '#0B6B2B',
  },
  {
    id: 'ruptura',
    dimension: 'Ruptura',
    title: 'O caminho foi interrompido',
    desc: 'Alguma consulta, exame ou encaminhamento recomendado acabou ficando pelo caminho?',
    icon: '✂️',
    color: '#DC2626',
  },
];

const ORIGINS = [
  { id: 'TERRITÓRIO', label: 'Território (Visita/Rua)', icon: '🗺️' },
  { id: 'UBS',        label: 'UBS / Atendimento',      icon: '🏥' },
  { id: 'CASA',       label: 'Casa da Família',        icon: '🏠' },
  { id: 'REMOTO',     label: 'Contato Remoto / WhatsApp', icon: '📱' },
  { id: 'REVISÃO',    label: 'Revisão de Trajetória',   icon: '📋' },
];

export default function PistasSwipeScreen({ onCancel, onComplete }) {
  const [origin, setOrigin] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [conditionalStep, setConditionalStep] = useState(null); // conditional sub-question state
  const [conditionalAnswers, setConditionalAnswers] = useState({});
  const [dragOffset, setDragOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(null); // 'right' | 'left' | null

  const currentCard = CARDS_DATA[currentIndex];

  // Answer handler
  const handleAnswer = (answerValue) => {
    // answerValue: 'SIM' | 'NAO' | 'NAO_SEI'
    const newAnswers = { ...answers, [currentCard.id]: answerValue };
    setAnswers(newAnswers);

    // Check if conditional question should trigger for Peregrinação or Ruptura
    if (currentCard.id === 'peregrinacao' && answerValue === 'SIM' && !conditionalAnswers.placesCount) {
      setConditionalStep('peregrinacao_places');
      return;
    }

    if (currentCard.id === 'ruptura' && answerValue === 'SIM' && !conditionalAnswers.cutType) {
      setConditionalStep('ruptura_type');
      return;
    }

    advanceCard(newAnswers);
  };

  const advanceCard = (latestAnswers = answers) => {
    setConditionalStep(null);
    if (currentIndex < CARDS_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed all 6 cards! Pass to next screen
      onComplete({
        origin: origin || 'TERRITÓRIO',
        answers: latestAnswers,
        conditionalAnswers,
      });
    }
  };

  // Touch Drag Handlers
  const handleTouchStart = (e) => {
    setDragOffset(0);
  };
  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const deltaX = e.touches[0].clientX - (window.innerWidth / 2);
      setDragOffset(deltaX);
      if (deltaX > 40) setIsSwiping('right');
      else if (deltaX < -40) setIsSwiping('left');
      else setIsSwiping(null);
    }
  };
  const handleTouchEnd = () => {
    if (dragOffset > 80) handleAnswer('SIM');
    else if (dragOffset < -80) handleAnswer('NAO');
    setDragOffset(0);
    setIsSwiping(null);
  };

  // Step 0: Origin Selection (Porta de Escuta)
  if (!origin) {
    return (
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onCancel} style={{ background: '#FFFFFF', border: '1px solid var(--color-border)', borderRadius: '10px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase' }}>Porta de Escuta</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4A2F1B', margin: 0 }}>Onde você ouviu essa história?</h3>
          </div>
        </div>

        <p style={{ fontSize: '0.86rem', color: '#6B655F', margin: 0 }}>
          Selecione a origem real da pista. A memória territorial começa identificando de onde partiu a escuta do ACS.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {ORIGINS.map((o) => (
            <button
              key={o.id}
              onClick={() => setOrigin(o.id)}
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                background: '#FFFFFF',
                color: '#4A2F1B',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{o.icon}</span>
                <span>{o.label}</span>
              </div>
              <ChevronRight size={18} color="var(--color-primary)" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Conditional Sub-Questions
  if (conditionalStep === 'peregrinacao_places') {
    return (
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
        <div className="card" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '2px solid var(--color-primary)' }}>
          <div className="badge badge-primary" style={{ marginBottom: '12px', fontSize: '0.72rem' }}>
            <Sparkles size={12} /> Pergunta Complementar (15s)
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '16px' }}>
            Mais ou menos por quantos serviços ou profissionais essa história já passou?
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            {['2', '3–4', '5 ou mais', 'Não sei'].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setConditionalAnswers((prev) => ({ ...prev, placesCount: opt }));
                  setConditionalStep('peregrinacao_same_issue');
                }}
                className="btn btn-secondary"
                style={{ padding: '14px', fontSize: '0.9rem', textAlign: 'center' }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (conditionalStep === 'peregrinacao_same_issue') {
    return (
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
        <div className="card" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '2px solid var(--color-primary)' }}>
          <div className="badge badge-primary" style={{ marginBottom: '12px', fontSize: '0.72rem' }}>
            <Sparkles size={12} /> Pergunta Complementar
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '16px' }}>
            Esses atendimentos estavam relacionados à mesma questão?
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Sim — Mesma busca/sintomas', val: 'Sim' },
              { label: 'Não sei',                     val: 'Não sei' },
              { label: 'Não — Questões diferentes',  val: 'Não' },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => {
                  setConditionalAnswers((prev) => ({ ...prev, sameIssue: opt.val }));
                  advanceCard();
                }}
                className="btn btn-secondary"
                style={{ padding: '14px', fontSize: '0.9rem', justifyContent: 'flex-start' }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (conditionalStep === 'ruptura_type') {
    return (
      <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
        <div className="card" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '24px', border: '2px solid var(--color-amber)' }}>
          <div className="badge badge-amber" style={{ marginBottom: '12px', fontSize: '0.72rem' }}>
            ✂️ Ruptura de Acompanhamento
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '16px' }}>
            Qual atendimento ficou pendente ou interrompido?
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {['Consulta', 'Exame', 'Encaminhamento', 'Não sei'].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setConditionalAnswers((prev) => ({ ...prev, cutType: opt }));
                  advanceCard();
                }}
                className="btn btn-secondary"
                style={{ padding: '14px', fontSize: '0.9rem', textAlign: 'center' }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Cards Deck (Tinder Style)
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 150px)', justifyContent: 'space-between' }}>
      
      {/* Top Bar Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', color: '#6B655F', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 700 }}>
          <ArrowLeft size={16} /> Sair
        </button>

        {/* Card Counter Progress */}
        <div style={{ display: 'flex', gap: '4px' }}>
          {CARDS_DATA.map((_, i) => (
            <div
              key={i}
              style={{
                width: '32px',
                height: '5px',
                borderRadius: '4px',
                background: i === currentIndex ? 'var(--color-primary)' : i < currentIndex ? 'var(--color-success)' : 'var(--color-border)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-quati-brown)' }}>
          {currentIndex + 1} de {CARDS_DATA.length}
        </span>
      </div>

      {/* Swipe Card Area */}
      <div className="swipe-deck-container">
        <div
          className={`swipe-card ${isSwiping === 'right' ? 'swiping-right' : isSwiping === 'left' ? 'swiping-left' : ''}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="badge badge-brown" style={{ fontSize: '0.72rem' }}>
                <MapPin size={11} /> Escuta: {origin}
              </span>
              <span style={{ fontSize: '28px' }}>{currentCard.icon}</span>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4A2F1B', lineHeight: 1.25, marginBottom: '12px' }}>
              "{currentCard.title}"
            </h2>

            <p style={{ fontSize: '0.98rem', color: '#524B45', lineHeight: 1.6 }}>
              {currentCard.desc}
            </p>
          </div>

          {/* Hint / Nasua Reinforcement */}
          <div style={{
            background: 'var(--color-bg-warm)',
            padding: '12px 14px',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.78rem',
            color: '#8B5A2B',
            fontStyle: 'italic',
          }}>
            <img src="/nasua.png" alt="Nasua" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            <span>"Arraste para a direita se SIM, esquerda se NÃO, ou toque em NÃO SEI abaixo."</span>
          </div>
        </div>
      </div>

      {/* Action Controls layout: NÃO SEI on top, SIM / NÃO side-by-side below */}
      <div className="action-controls-container">
        
        {/* FIRST-CLASS ACTION: NÃO SEI */}
        <button
          onClick={() => handleAnswer('NAO_SEI')}
          className="btn-action-unsure"
          aria-label="Não sei responder essa pergunta"
        >
          NÃO SEI
        </button>

        {/* Side-by-side SIM and NÃO */}
        <div className="action-row-side">
          <button
            onClick={() => handleAnswer('NAO')}
            className="btn-action-no"
            aria-label="Não"
          >
            <X size={18} />
            <span>NÃO</span>
          </button>

          <button
            onClick={() => handleAnswer('SIM')}
            className="btn-action-yes"
            aria-label="Sim"
          >
            <Check size={18} />
            <span>SIM</span>
          </button>
        </div>

      </div>

    </div>
  );
}
