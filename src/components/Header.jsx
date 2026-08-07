import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Header() {
  return (
    <header className="header-nav">
      <div className="container header-content">
        <a href="#" className="logo-group">
          <img 
            src="/logo.png" 
            alt="Agente na Sua Logo" 
            style={{ height: '46px', width: 'auto', objectFit: 'contain', display: 'block' }} 
          />
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

        <a href="#dashboard" className="btn btn-primary header-btn" style={{ padding: '10px 20px', fontSize: '0.88rem', flexShrink: 0 }}>
          <span>Acessar o app</span>
          <ArrowRight size={15} />
        </a>
      </div>
    </header>
  );
}
