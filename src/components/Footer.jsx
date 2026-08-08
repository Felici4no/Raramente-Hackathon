import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#231C18', color: '#F4F1E8', padding: '60px 0 32px', borderTop: '4px solid #0B6B2B' }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          
          {/* Coluna 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src="/nasua.png" alt="Nasua Mascote" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF' }}>Agente na Sua</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#B0A8A0', lineHeight: 1.6, marginBottom: '16px' }}>
              Conectando agentes comunitários, inteligência artificial e dados do território para transformar impacto em informação na saúde pública.
            </p>
            <div style={{ fontSize: '0.82rem', color: '#57B33E', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} />
              <span>Desenvolvido para o Raramente Hackathon</span>
            </div>
          </div>

          {/* Coluna 2 */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>Navegação</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#B0A8A0' }}>
              <li><a href="#tese" style={{ color: 'inherit', textDecoration: 'none' }}>A Tese Algorítmica</a></li>
              <li><a href="#whatsapp" style={{ color: 'inherit', textDecoration: 'none' }}>Escuta Territorial & WhatsApp</a></li>
              <li><a href="#jornada" style={{ color: 'inherit', textDecoration: 'none' }}>Inteligência de Jornada</a></li>
              <li><a href="#impacto" style={{ color: 'inherit', textDecoration: 'none' }}>Impacto Verificado</a></li>
              <li><a href="#dashboard" style={{ color: 'inherit', textDecoration: 'none' }}>Dashboard de Gestão</a></li>
            </ul>
          </div>

          {/* Coluna 3 */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '16px' }}>Conceito & Mascote</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img 
                src="/nasua.png" 
                alt="Quati Mascote Agente de Saúde" 
                style={{ width: '64px', height: '64px', objectFit: 'contain', flexShrink: 0 }} 
              />
              <p style={{ fontSize: '0.88rem', color: '#B0A8A0', lineHeight: 1.5, margin: 0 }}>
                Inspirado no <em>Nasua nasua</em> (quati), espécie nativa conhecida pela sua curiosidade, forte senso territorial e investigação minuciosa com o colete do SUS.
              </p>
            </div>
          </div>

        </div>

        {/* Rodape Bottom */}
        <div style={{ borderTop: '1px solid #3A322C', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.85rem', color: '#8B827A' }}>
          <div>
            © 2026 Agente na Sua. Todos os direitos reservados.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#57B33E', fontWeight: 700, fontSize: '0.8rem' }}>
            <img src="/nasua.png" alt="QuaTiRare" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
            powered by <span style={{ fontStyle: 'italic', letterSpacing: '0.02em' }}>QuaTiRare</span>
            <Heart size={13} fill="#57B33E" />
          </div>
        </div>

      </div>
    </footer>
  );
}
