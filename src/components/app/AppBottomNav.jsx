import React from 'react';
import { Radar, Route, Target, Award } from 'lucide-react';

export default function AppBottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="app-bottom-nav" aria-label="Navegação do Aplicativo">
      
      {/* Tab 1: Radar */}
      <button
        onClick={() => setActiveTab('radar')}
        className={`app-nav-tab ${activeTab === 'radar' ? 'active' : ''}`}
        aria-label="Radar"
      >
        <Radar size={18} />
        <span>Radar</span>
      </button>

      {/* Tab 2: Jornadas */}
      <button
        onClick={() => setActiveTab('jornadas')}
        className={`app-nav-tab ${activeTab === 'jornadas' ? 'active' : ''}`}
        aria-label="Jornadas"
      >
        <Route size={18} />
        <span>Jornadas</span>
      </button>

      {/* Tab 3 Central Elevated: Nasua */}
      <button
        onClick={() => setActiveTab('nasua')}
        className={`app-nav-tab-nasua ${activeTab === 'nasua' ? 'active' : ''}`}
        aria-label="Nasua — Guia do Território e Microjogos"
        title="Falar com o Nasua / Treinar em 20s"
      >
        <img src="/nasua.png" alt="Nasua" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
      </button>

      {/* Tab 4: Missões */}
      <button
        onClick={() => setActiveTab('missoes')}
        className={`app-nav-tab ${activeTab === 'missoes' ? 'active' : ''}`}
        aria-label="Missões"
      >
        <Target size={18} />
        <span>Missões</span>
      </button>

      {/* Tab 5: Impacto */}
      <button
        onClick={() => setActiveTab('impacto')}
        className={`app-nav-tab ${activeTab === 'impacto' ? 'active' : ''}`}
        aria-label="Impacto"
      >
        <Award size={18} />
        <span>Impacto</span>
      </button>

    </nav>
  );
}
