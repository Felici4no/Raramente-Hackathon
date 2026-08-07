import React from 'react';
import { ArrowRight, Shield, Activity } from 'lucide-react';

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

        <nav>
          <ul className="nav-links">
            <li><a href="#tese">A Tese</a></li>
            <li><a href="#whatsapp">Território & IA</a></li>
            <li><a href="#jornada">Jornada Atípica</a></li>
            <li><a href="#impacto">Impacto Verificado</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
          </ul>
        </nav>

        <a href="#dashboard" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
          <span>Acessar o app</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </header>
  );
}
