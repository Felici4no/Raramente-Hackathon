import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        {/* Logo + Nome - sempre visível */}
        <a href="#" className="logo-group">
          <img 
            src="/nasua.png" 
            alt="Nasua - Agente na Sua Mascote" 
            className="header-logo"
            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
          />
          <span className="header-brand-name">Agente na Sua</span>
          <span className="badge badge-primary header-badge header-badge-desktop">
            <ShieldCheck size={12} />
            Plataforma SUS
          </span>
        </a>

        {/* Nav central - só desktop */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="#tese">A Tese</a></li>
            <li><a href="#whatsapp">Território & IA</a></li>
            <li><a href="#jornada">Jornada Atípica</a></li>
            <li><a href="#impacto">Impacto Verificado</a></li>
            <li><a href="#dashboard">Dashboard</a></li>
          </ul>
        </nav>

        {/* CTA - só desktop */}
        <a href="#dashboard" className="btn btn-primary header-btn header-cta-desktop">
          <span>Acessar o app</span>
          <ArrowRight size={15} />
        </a>
      </div>
    </header>
  );
}

