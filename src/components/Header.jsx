import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Header() {
  return (
    <header className="header-nav">
      <div className="container header-content">
        <a href="#" className="logo-group">
          <img src="/nasua.png" alt="Mascote Nasua" className="logo-icon" />
          <div className="logo-text">
            <span>Agente na Sua</span>
            <span className="logo-sub">Saúde & Inteligência no SUS</span>
          </div>
        </a>

        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="#tese">A Tese</a></li>
            <li><a href="#whatsapp">Território & IA</a></li>
            <li><a href="#jornada">Jornada Atípica</a></li>
            <li><a href="#impacto">Impacto Verificado</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
          </ul>
        </nav>

        <a href="#dashboard" className="btn btn-primary header-btn" style={{ padding: '8px 16px', fontSize: '0.85rem', flexShrink: 0 }}>
          <span>Acessar o app</span>
          <ArrowRight size={14} />
        </a>
      </div>
    </header>
  );
}
