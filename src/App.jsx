import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TeseCentral from './components/TeseCentral.jsx';
import WhatsAppDemo from './components/WhatsAppDemo.jsx';
import QuaTiRareSection from './components/QuaTiRareSection.jsx';
import JourneyDemo from './components/JourneyDemo.jsx';
import DashboardDemo from './components/DashboardDemo.jsx';
import ImpactDemo from './components/ImpactDemo.jsx';
import BottomNav from './components/BottomNav.jsx';
import Footer from './components/Footer.jsx';
import FormularioPage from './pages/FormularioPage.jsx';

function HomePage() {
  return (
    <>
      {/*
        Section order (per briefing):
        Hero → O Problema → Território (WhatsApp/Nasua) → QuaTiRare →
        Jornada Atípica → Dashboard → Impacto Verificado → Footer
      */}
      <Hero />
      <TeseCentral />
      <WhatsAppDemo />
      <QuaTiRareSection />
      <JourneyDemo />
      <DashboardDemo />
      <ImpactDemo />
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading]     = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer   = setTimeout(() => setIsFadingOut(true), 1400);
    const removeTimer = setTimeout(() => setIsLoading(false), 2000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <BrowserRouter>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-bg-warm)',
      }}>
        {isLoading && <LoadingScreen isFadingOut={isFadingOut} />}

        <Header />

        <main
          style={{ flex: 1 }}
          className="page-offset"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/formulario" element={<FormularioPage />} />
          </Routes>
        </main>

        <Footer />

        {/* BottomNav: visible on tablet/mobile only (hidden via CSS at ≥1024px) */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
