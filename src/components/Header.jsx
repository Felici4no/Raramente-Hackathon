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
        <a href="#" className="logo-group">
          <img 
            src="/logo.png" 
            alt="Agente na Sua Logo" 
            className="header-logo"
          />
          <span className="badge badge-primary header-badge">
            <ShieldCheck size={13} />
            Plataforma SUS
          </span>
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

        <a href="#dashboard" className="btn btn-primary header-btn">
          <span>Acessar o app</span>
          <ArrowRight size={15} />
        </a>
      </div>
    </header>
  );
}

