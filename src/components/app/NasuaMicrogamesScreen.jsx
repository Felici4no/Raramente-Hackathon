import React, { useState } from 'react';
import { Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw, MessageSquare } from 'lucide-react';

const GAMES = [
  {
    id: 1,
    title: 'Desafio 1 de 2: Trajetória Resolutiva',
    storyName: 'Ana (52a)',
    nodes: 'UBS ➔ Cardiologia ➔ Diagnóstico ➔ Tratamento ➔ Acompanhamento',
    question: 'Essa jornada parece estar presa ou enredada?',
    correctAnswer: 'NAO', // 'SIM' | 'NAO'
    feedbackCorrect: 'Isso mesmo! Passar por vários serviços não significa fragmentação se a jornada chegou a uma resolução clara.',
    feedbackWrong: 'Na verdade essa jornada é resolutiva! Ela percorreu etapas bem definidas até o tratamento.',
  },
  {
    id: 2,
    title: 'Desafio 2 de 2: Trajetória em Looping',
    storyName: 'Carlos (44a)',
    nodes: 'UBS ➔ Ortopedia ➔ Neurologia ➔ UBS ➔ UPA ➔ Neurologia (4 anos sem resposta)',
    question: 'Qual pista assistencial aparece primeiro nessa história?',
    options: [
      { label: 'Muitos retornos repetidos', correct: true },
      { label: 'Ruptura de consulta',     correct: false },
      { label: 'Resolução diagnóstica',    correct: false },
    ],
    feedbackCorrect: 'Exato! A repetição constante e retornos sem resolução são a pista principal desse caso.',
    feedbackWrong: 'A pista principal é a repetição de retornos sem resolução ao longo de 4 anos.',
  },
];

export default function NasuaMicrogamesScreen() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const currentGame = GAMES[currentGameIndex];

  const handleGame1Answer = (ans) => {
    setUserAnswer(ans);
  };

  const handleGame2Answer = (option) => {
    setUserAnswer(option.correct ? 'CORRECT' : 'WRONG');
  };

  const nextGame = () => {
    setUserAnswer(null);
    if (currentGameIndex < GAMES.length - 1) {
      setCurrentGameIndex(currentGameIndex + 1);
    } else {
      setCurrentGameIndex(0); // restart loop
    }
  };

  return (
    <div style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-quati-brown)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Treinar com Nasua (20s)
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4A2F1B', margin: '2px 0 0' }}>
          Microjogos de Escuta
        </h2>
      </div>

      {/* Nasua Mascot Chat Guide */}
      <div style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F9F7F2 100%)', borderRadius: '20px', padding: '18px', border: '2px solid var(--color-primary)', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 8px 24px rgba(11,107,43,0.08)' }}>
        <img src="/nasua.png" alt="Nasua" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.92rem', color: '#4A2F1B' }}>
            Nasua IA
          </div>
          <div style={{ fontSize: '0.8rem', color: '#6B655F', lineHeight: 1.4 }}>
            "Não existe erro ou acerto de sintomas aqui — treinamos apenas o reconhecimento de trajetórias!"
          </div>
        </div>
      </div>

      {/* Game Card */}
      <div className="card" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '20px', border: '1px solid var(--color-border)' }}>
        <div className="badge badge-brown" style={{ marginBottom: '12px', fontSize: '0.72rem' }}>
          <Sparkles size={12} /> {currentGame.title}
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '8px' }}>
          {currentGame.storyName}
        </h3>

        {/* Nodes */}
        <div style={{ background: 'var(--color-bg-warm)', padding: '12px', borderRadius: '12px', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '16px' }}>
          {currentGame.nodes}
        </div>

        <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '16px' }}>
          {currentGame.question}
        </h4>

        {/* Game 1 Controls */}
        {currentGame.id === 1 && !userAnswer && (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => handleGame1Answer('SIM')} className="btn btn-secondary" style={{ flex: 1, padding: '14px', fontSize: '0.9rem' }}>
              SIM
            </button>
            <button onClick={() => handleGame1Answer('NAO')} className="btn btn-primary" style={{ flex: 1, padding: '14px', fontSize: '0.9rem' }}>
              NÃO
            </button>
          </div>
        )}

        {/* Game 2 Controls */}
        {currentGame.id === 2 && !userAnswer && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentGame.options.map((opt, i) => (
              <button key={i} onClick={() => handleGame2Answer(opt)} className="btn btn-secondary" style={{ padding: '14px', fontSize: '0.88rem', justifyContent: 'flex-start' }}>
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Feedback Area */}
        {userAnswer && (
          <div className="animate-fade-in" style={{ marginTop: '16px' }}>
            {(userAnswer === 'NAO' || userAnswer === 'CORRECT') ? (
              <div style={{ background: 'rgba(11,107,43,0.08)', padding: '14px', borderRadius: '14px', border: '1px solid var(--color-primary)', color: 'var(--color-primary)', fontSize: '0.86rem', fontWeight: 700 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <CheckCircle2 size={16} />
                  <span>Mandou muito bem!</span>
                </div>
                {currentGame.feedbackCorrect}
              </div>
            ) : (
              <div style={{ background: 'var(--color-amber-bg)', padding: '14px', borderRadius: '14px', border: '1px solid var(--color-amber-border)', color: '#B45309', fontSize: '0.86rem', fontWeight: 700 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <XCircle size={16} />
                  <span>Quase lá!</span>
                </div>
                {currentGame.feedbackWrong}
              </div>
            )}

            <button onClick={nextGame} className="btn btn-primary" style={{ width: '100%', marginTop: '14px', padding: '12px', fontSize: '0.9rem' }}>
              <span>{currentGameIndex < GAMES.length - 1 ? 'Próximo desafio' : 'Reiniciar treino'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
