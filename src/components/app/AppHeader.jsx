import React from 'react';
import { Sparkles, MapPin } from 'lucide-react';

export default function AppHeader({ connectionsToday = 3 }) {
  return (
    <header className="app-header-bar">
      <div className="app-header-brand">
        <img src="/nasua.png" alt="Nasua Mascote" className="app-header-avatar" />
        <div>
          <div className="app-header-title">Agente na Sua</div>
          <div style={{ fontSize: '0.72rem', color: '#8B5A2B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={10} color="var(--color-primary)" />
            <span>Território Ativo</span>
          </div>
        </div>
      </div>

      <div className="app-header-stat" title="Conexões assistenciais realizadas hoje no território">
        <Sparkles size={13} color="var(--color-primary)" />
        <span>Hoje: {connectionsToday} conexões</span>
      </div>
    </header>
  );
}
