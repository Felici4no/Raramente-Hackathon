import React, { useState, useEffect } from 'react';
import { Compass, MessageSquare, Activity, Award, LayoutDashboard, ArrowUpRight } from 'lucide-react';

export default function BottomNav() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['tese', 'whatsapp', 'jornada', 'impacto', 'dashboard'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bottom-nav-container">
      <nav className="bottom-nav-bar">
        
        <a 
          href="#tese" 
          className={`bottom-nav-item ${activeSection === 'tese' ? 'active' : ''}`}
        >
          <Compass size={20} />
          <span>A Tese</span>
        </a>

        <a 
          href="#whatsapp" 
          className={`bottom-nav-item ${activeSection === 'whatsapp' ? 'active' : ''}`}
        >
          <MessageSquare size={20} />
          <span>Território</span>
        </a>

        <a 
          href="#jornada" 
          className={`bottom-nav-item ${activeSection === 'jornada' ? 'active' : ''}`}
        >
          <Activity size={20} />
          <span>Jornada</span>
        </a>

        <a 
          href="#impacto" 
          className={`bottom-nav-item ${activeSection === 'impacto' ? 'active' : ''}`}
        >
          <Award size={20} />
          <span>Impacto</span>
        </a>

        <a 
          href="#dashboard" 
          className={`bottom-nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </a>

        <div className="bottom-nav-divider" />

        <a href="#dashboard" className="btn-bottom-cta">
          <span>App</span>
          <ArrowUpRight size={16} />
        </a>

      </nav>
    </div>
  );
}
