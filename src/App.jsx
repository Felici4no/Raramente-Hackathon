import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TeseCentral from './components/TeseCentral.jsx';
import WhatsAppDemo from './components/WhatsAppDemo.jsx';
import JourneyDemo from './components/JourneyDemo.jsx';
import ImpactDemo from './components/ImpactDemo.jsx';
import DashboardDemo from './components/DashboardDemo.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Inicia o fade out após 1.4 segundos
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1400);

    // Remove completamente a tela de carregamento do DOM após o fade out (2.0s)
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-warm)' }}>
      {isLoading && <LoadingScreen isFadingOut={isFadingOut} />}
      <Header />
      <main style={{ flex: 1 }}>
        <Hero />
        <TeseCentral />
        <WhatsAppDemo />
        <JourneyDemo />
        <ImpactDemo />
        <DashboardDemo />
      </main>
      <Footer />
    </div>
  );
}
