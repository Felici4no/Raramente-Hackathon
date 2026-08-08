import React from 'react';

export default function LoadingScreen({ isFadingOut }) {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#F4F1E8',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFadingOut ? 'none' : 'all',
        padding: '24px'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img 
          src="/logo.png" 
          alt="Agente na Sua Logo" 
          style={{ 
            width: '140px', 
            height: '140px', 
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 12px 36px rgba(11, 107, 43, 0.15)',
            marginBottom: '24px'
          }} 
        />
        
        <div style={{
          width: '200px',
          height: '4px',
          backgroundColor: 'rgba(11, 107, 43, 0.15)',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#0B6B2B',
            borderRadius: '4px',
            animation: 'loadingBar 1.4s cubic-bezier(0.65, 0, 0.35, 1) infinite'
          }} />
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4A2F1B', marginBottom: '4px' }}>
          Agente na Sua
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#8B5A2B', fontWeight: 600 }}>
          Transformamos impacto em informação
        </p>
      </div>

      <style>{`
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
