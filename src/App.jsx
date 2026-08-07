import React from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import TeseCentral from './components/TeseCentral.jsx';
import WhatsAppDemo from './components/WhatsAppDemo.jsx';
import JourneyDemo from './components/JourneyDemo.jsx';
import ImpactDemo from './components/ImpactDemo.jsx';
import DashboardDemo from './components/DashboardDemo.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-warm)' }}>
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
