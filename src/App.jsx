import React, { useState, useEffect } from "react";
import { getSession, logout, getDefaultTab } from "./services/authService.js";
import LoadingScreen from "./components/LoadingScreen.jsx";
import AppHeader from "./components/app/AppHeader.jsx";
import AppBottomNav from "./components/app/AppBottomNav.jsx";
import LoginScreen from "./components/app/LoginScreen.jsx";
import InicioScreen from "./components/app/InicioScreen.jsx";
import MinhaRedeScreen from "./components/app/MinhaRedeScreen.jsx";
import AddFamiliarScreen from "./components/app/AddFamiliarScreen.jsx";
import RadarScreen from "./components/app/RadarScreen.jsx";
import PistasSwipeScreen from "./components/app/PistasSwipeScreen.jsx";
import AssinaturaJornadaScreen from "./components/app/AssinaturaJornadaScreen.jsx";
import JornadasScreen from "./components/app/JornadasScreen.jsx";
import ListaJornadasScreen from "./components/app/ListaJornadasScreen.jsx";
import MissoesScreen from "./components/app/MissoesScreen.jsx";
import NasuaMicrogamesScreen from "./components/app/NasuaMicrogamesScreen.jsx";
import ImpactoAppScreen from "./components/app/ImpactoAppScreen.jsx";
import CareTeamScreen from "./components/app/CareTeamScreen.jsx";
import ManagerScreen from "./components/app/ManagerScreen.jsx";

export default function App() {
  const [isLoading, setIsLoading]     = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [session, setSession]         = useState(() => getSession());

  // Navigation
  const [activeTab, setActiveTab]           = useState(() => session ? getDefaultTab(session.role) : "radar");
  const [flowState, setFlowState]           = useState("idle"); // idle | swiping | result
  const [currentPistaData, setCurrentPistaData] = useState(null);
  const [selectedJornada, setSelectedJornada]   = useState(null);

  // Minha Rede sub-navigation
  const [redeView, setRedeView] = useState("list"); // "list" | "addFamiliar"

  useEffect(() => {
    const fadeTimer   = setTimeout(() => setIsFadingOut(true), 1200);
    const removeTimer = setTimeout(() => setIsLoading(false), 1800);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, []);

  // Auth Handlers
  function handleLogin(user) {
    setSession(user);
    setActiveTab(getDefaultTab(user.role));
    setRedeView("list");
    setFlowState("idle");
  }

  function handleLogout(action) {
    if (action === "switch" || action === "logout") {
      logout(); // only removes agente_session
      setSession(null);
      setFlowState("idle");
      setActiveTab("radar");
    }
  }

  // Flow Handlers
  function handleStartPista() { setFlowState("swiping"); }
  function handlePistasComplete(data) { setCurrentPistaData(data); setFlowState("result"); }
  function handleResetFlow() {
    setFlowState("idle");
    setCurrentPistaData(null);
    if (session) setActiveTab(getDefaultTab(session.role));
  }
  function handleViewTerritorio() {
    setFlowState("idle");
    setCurrentPistaData(null);
    setSelectedJornada(null);
    setActiveTab("jornadas");
  }

  // If no session — show login gate
  if (!session) {
    return (
      <div className="app-viewport-wrapper">
        {isLoading && <LoadingScreen isFadingOut={isFadingOut} />}
        <LoginScreen onLogin={handleLogin} />
      </div>
    );
  }

  const role = session.role;

  return (
    <div className="app-viewport-wrapper">
      {isLoading && <LoadingScreen isFadingOut={isFadingOut} />}

      <div className="app-mobile-shell">
        <AppHeader session={session} connectionsToday={3} />

        <main className="app-main-content">

          {/* ── Flow Override: Swipe Cards ─────────────────────────────── */}
          {flowState === "swiping" && (
            <PistasSwipeScreen onCancel={handleResetFlow} onComplete={handlePistasComplete} />
          )}

          {/* ── Flow Override: Assinatura da Jornada ──────────────────── */}
          {flowState === "result" && (
            <AssinaturaJornadaScreen
              pData={currentPistaData}
              onReset={handleResetFlow}
              onViewTerritorio={handleViewTerritorio}
            />
          )}

          {/* ── Regular Tab Routing ──────────────────────────────────── */}
          {flowState === "idle" && (
            <>
              {/* ─ COLLABORATOR tabs ─ */}
              {role === "COLLABORATOR" && activeTab === "inicio" && (
                <InicioScreen
                  session={session}
                  onOpenJornada={(p) => { setSelectedJornada(p); setActiveTab("jornadas"); }}
                  onOpenRede={() => setActiveTab("rede")}
                  onAddFamiliar={() => { setActiveTab("rede"); setRedeView("addFamiliar"); }}
                  onStartPista={handleStartPista}
                />
              )}

              {role === "COLLABORATOR" && activeTab === "rede" && redeView === "list" && (
                <MinhaRedeScreen
                  session={session}
                  onAddFamiliar={() => setRedeView("addFamiliar")}
                  onSelectPerson={(p) => { setSelectedJornada(p); setActiveTab("jornadas"); }}
                />
              )}

              {role === "COLLABORATOR" && activeTab === "rede" && redeView === "addFamiliar" && (
                <AddFamiliarScreen
                  session={session}
                  onBack={() => setRedeView("list")}
                  onComplete={() => setRedeView("list")}
                />
              )}

              {/* ─ ACS tabs ─ */}
              {role === "ACS" && activeTab === "radar" && (
                <RadarScreen onStartPista={handleStartPista} onOpenNasua={() => setActiveTab("nasua")} />
              )}

              {role === "ACS" && activeTab === "missoes" && (
                <MissoesScreen />
              )}

              {/* ─ CARE_TEAM tabs ─ */}
              {role === "CARE_TEAM" && activeTab === "revisoes" && (
                <CareTeamScreen />
              )}

              {/* ─ MANAGER tabs ─ */}
              {role === "MANAGER" && activeTab === "visao" && (
                <ManagerScreen />
              )}

              {/* ─ Shared tabs ─ */}
              {activeTab === "jornadas" && !selectedJornada && (
                <ListaJornadasScreen onSelectJornada={setSelectedJornada} />
              )}

              {activeTab === "jornadas" && selectedJornada && (
                <JornadasScreen
                  jornada={selectedJornada}
                  onBack={() => setSelectedJornada(null)}
                  onStartPista={handleStartPista}
                />
              )}

              {activeTab === "nasua" && (
                <NasuaMicrogamesScreen />
              )}

              {activeTab === "impacto" && (
                <ImpactoAppScreen
                  session={session}
                  onLogout={handleLogout}
                  onViewRede={() => {
                    if (role === "COLLABORATOR") { setActiveTab("rede"); setRedeView("list"); }
                  }}
                />
              )}

              {/* Placeholder tabs for care_team and manager */}
              {(role === "CARE_TEAM" || role === "MANAGER") && activeTab === "conta" && (
                <ImpactoAppScreen
                  session={session}
                  onLogout={handleLogout}
                  onViewRede={() => {}}
                />
              )}
            </>
          )}
        </main>

        <AppBottomNav
          role={role}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setFlowState("idle");
            setSelectedJornada(null);
            if (tab !== "rede") setRedeView("list");
            setActiveTab(tab);
          }}
        />
      </div>
    </div>
  );
}
