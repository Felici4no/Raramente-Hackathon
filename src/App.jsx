import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import AppHeader from './components/app/AppHeader.jsx';
import AppBottomNav from './components/app/AppBottomNav.jsx';
import RadarScreen from './components/app/RadarScreen.jsx';
import PistasSwipeScreen from './components/app/PistasSwipeScreen.jsx';
import AssinaturaJornadaScreen from './components/app/AssinaturaJornadaScreen.jsx';
import TerritorioScreen from './components/app/TerritorioScreen.jsx';
import MissoesScreen from './components/app/MissoesScreen.jsx';
import NasuaMicrogamesScreen from './components/app/NasuaMicrogamesScreen.jsx';
import ImpactoAppScreen from './components/app/ImpactoAppScreen.jsx';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // App Navigation States
  const [activeTab, setActiveTab] = useState('radar'); // 'radar' | 'jornadas' | 'nasua' | 'missoes' | 'impacto'
  const [flowState, setFlowState] = useState('idle');  // 'idle' | 'swiping' | 'result'
  const [currentPistaData, setCurrentPistaData] = useState(null);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFadingOut(true), 1200);
    const removeTimer = setTimeout(() => setIsLoading(false), 1800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  // Handlers for Golden Path
  const handleStartPista = () => {
    setFlowState('swiping');
  };

  const handlePistasComplete = (data) => {
    setCurrentPistaData(data);
    setFlowState('result');
  };

  const handleResetFlow = () => {
    setFlowState('idle');
    setCurrentPistaData(null);
    setActiveTab('radar');
  };

  const handleViewTerritorio = () => {
    setFlowState('idle');
    setCurrentPistaData(null);
    setActiveTab('jornadas');
  };

  return (
    <div className="app-viewport-wrapper">
      {isLoading && <LoadingScreen isFadingOut={isFadingOut} />}

      <div className="app-mobile-shell">
        
        {/* Header Bar */}
        <AppHeader connectionsToday={3} />

        {/* Main Content Area */}
        <main className="app-main-content">
          
          {/* Flow Override 1: Swipe Cards Deck */}
          {flowState === 'swiping' && (
            <PistasSwipeScreen
              onCancel={handleResetFlow}
              onComplete={handlePistasComplete}
            />
          )}

          {/* Flow Override 2: Assinatura da Jornada & Grafo */}
          {flowState === 'result' && (
            <AssinaturaJornadaScreen
              pData={currentPistaData}
              onReset={handleResetFlow}
              onViewTerritorio={handleViewTerritorio}
            />
          )}

          {/* Regular Tab Navigation */}
          {flowState === 'idle' && (
            <>
              {activeTab === 'radar' && (
                <RadarScreen
                  onStartPista={handleStartPista}
                  onOpenNasua={() => setActiveTab('nasua')}
                />
              )}

              {activeTab === 'jornadas' && (
                <TerritorioScreen />
              )}

              {activeTab === 'nasua' && (
                <NasuaMicrogamesScreen />
              )}

              {activeTab === 'missoes' && (
                <MissoesScreen />
              )}

              {activeTab === 'impacto' && (
                <ImpactoAppScreen />
              )}
            </>
          )}

        </main>

        {/* Bottom Navigation Bar */}
        <AppBottomNav activeTab={activeTab} setActiveTab={(tab) => {
          setFlowState('idle');
          setActiveTab(tab);
        }} />

      </div>
    </div>
  );
}
