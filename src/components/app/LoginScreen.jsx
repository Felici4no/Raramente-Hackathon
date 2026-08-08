import React, { useState } from "react";
import { getMockUsers, login } from "../../services/authService.js";

const ROLE_CONFIG = {
  COLLABORATOR: {
    label: "Colaborador do Territorio",
    desc: "Reconstroi sua jornada e a da sua familia.",
    color: "#0B6B2B",
    bg: "rgba(11,107,43,0.08)",
    border: "rgba(11,107,43,0.25)",
    icon: "ðŸ‘¤",
  },
  ACS: {
    label: "Agente Comunitaria de Saude",
    desc: "Reconstroi o territorio. Registra pistas. Desata nos.",
    color: "#D97706",
    bg: "#FEF3C7",
    border: "#F59E0B",
    icon: "ðŸ©º",
  },
  CARE_TEAM: {
    label: "Equipe de Saude",
    desc: "Revisa jornadas. Valida informacoes. Reconecta cuidado.",
    color: "#0891B2",
    bg: "#E0F2FE",
    border: "#7DD3FC",
    icon: "ðŸ¥",
  },
  MANAGER: {
    label: "Gestora",
    desc: "Enxerga o sistema. Indicadores. Territorio agregado.",
    color: "#7C3AED",
    bg: "#F5F3FF",
    border: "#C4B5FD",
    icon: "ðŸ“Š",
  },
};

export default function LoginScreen({ onLogin }) {
  const [loading, setLoading] = useState(null);
  const users = getMockUsers();

  function handleLogin(userId) {
    setLoading(userId);
    setTimeout(() => {
      const user = login(userId);
      onLogin(user);
    }, 400);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F4F1E8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>

      {/* Logo */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" }}>
        <img src="/mascote.png" alt="Nasua" style={{ width: "64px", height: "64px", objectFit: "contain", marginBottom: "12px" }} />
        <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 900, color: "#4A2F1B" }}>Agente na Sua</div>
        <div style={{ fontSize: "0.8rem", color: "#8B5A2B", fontWeight: 600, marginTop: "4px" }}>Selecione o perfil de demonstracao</div>
      </div>

      {/* Profile cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "360px" }}>
        {users.map((u) => {
          const cfg = ROLE_CONFIG[u.role];
          const isLoading = loading === u.userId;
          return (
            <button
              key={u.userId}
              onClick={() => handleLogin(u.userId)}
              disabled={!!loading}
              style={{
                background: "#fff",
                border: "2px solid " + (isLoading ? cfg.color : "#E2DDD3"),
                borderRadius: "18px",
                padding: "16px",
                cursor: loading ? "default" : "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                transition: "border-color 0.15s, box-shadow 0.15s",
                boxShadow: isLoading ? "0 0 0 4px " + cfg.bg : "0 2px 8px rgba(0,0,0,0.04)",
                opacity: loading && !isLoading ? 0.5 : 1,
              }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: cfg.bg, border: "2px solid " + cfg.border, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", flexShrink: 0 }}>
                {cfg.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "#4A2F1B", lineHeight: 1.2 }}>{u.name}</div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: cfg.color, marginTop: "1px" }}>{cfg.label}</div>
                <div style={{ fontSize: "0.68rem", color: "#8B5A2B", fontWeight: 500, marginTop: "2px", lineHeight: 1.35 }}>{cfg.desc}</div>
              </div>
              {isLoading ? (
                <div style={{ width: "20px", height: "20px", border: "2px solid " + cfg.color, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
              ) : (
                <div style={{ fontSize: "1.1rem", opacity: 0.35, flexShrink: 0 }}>â€º</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Demo disclaimer */}
      <div style={{ marginTop: "28px", fontSize: "0.68rem", color: "#B0A898", fontWeight: 600, textAlign: "center", maxWidth: "280px", lineHeight: 1.5 }}>
        ProtÃ³tipo de demonstracao. Nenhum dado real Ã© processado.
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
