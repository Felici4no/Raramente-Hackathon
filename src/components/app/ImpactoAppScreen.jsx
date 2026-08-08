import React, { useState } from "react";
import { Award, ShieldCheck, CheckCircle2, Users, LogOut, RefreshCw, X } from "lucide-react";
import { getFamilyNetwork } from "../../services/familyService.js";

function LogoutModal({ session, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div onClick={onCancel} style={{ position: "absolute", inset: 0, background: "rgba(35,28,24,0.5)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", zIndex: 1, background: "#fff", borderRadius: "24px", padding: "28px 24px", boxShadow: "0 16px 48px rgba(0,0,0,0.15)", maxWidth: "320px", width: "100%", textAlign: "center" }}>
        <div style={{ width: "48px", height: "48px", background: "#FEF2F2", border: "2px solid #FCA5A5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <LogOut size={20} color="#DC2626" />
        </div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 800, color: "#4A2F1B", marginBottom: "8px" }}>Sair da conta?</h3>
        <p style={{ fontSize: "0.82rem", color: "#8B5A2B", fontWeight: 600, lineHeight: 1.5, marginBottom: "22px" }}>
          Suas jornadas e sua rede continuarao salvas neste prototipo.
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onCancel} style={{ flex: 1, background: "#F4F1E8", border: "1px solid #E2DDD3", borderRadius: "12px", padding: "12px", fontWeight: 700, fontSize: "0.88rem", color: "#4A2F1B", cursor: "pointer" }}>
            Cancelar
          </button>
          <button onClick={onConfirm} style={{ flex: 1, background: "#DC2626", border: "none", borderRadius: "12px", padding: "12px", fontWeight: 800, fontSize: "0.88rem", color: "#fff", cursor: "pointer" }}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ImpactoAppScreen({ session, onLogout, onViewRede }) {
  const [showLogout, setShowLogout] = useState(false);
  const isACS = session && session.role === "ACS";
  const network = session ? getFamilyNetwork(session.userId) : [];
  const activeJourneys = network.filter((p) => p.journeyPct < 100).length;

  return (
    <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Header */}
      <div>
        <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--color-quati-brown)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {isACS ? "Reconhecimento Cooperativo" : "Meu Impacto"}
        </div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#4A2F1B", margin: "2px 0 0" }}>Impacto Verificado</h2>
      </div>

      {/* Profile Card */}
      <div style={{ background: "#FFFFFF", borderRadius: "24px", padding: "20px", border: "2px solid var(--color-success)", boxShadow: "0 4px 16px rgba(11,107,43,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px", paddingBottom: "14px", borderBottom: "1px solid var(--color-border-subtle)" }}>
          <img src="/nasua.png" alt="Nasua" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
          <div>
            <h3 style={{ fontSize: "1.15rem", color: "#4A2F1B", fontWeight: 800, margin: 0 }}>{session ? session.name : "—"} — {session ? session.roleLabel : ""}</h3>
            <p style={{ fontSize: "0.78rem", color: "#8B5A2B", fontWeight: 600, margin: 0 }}>
              {isACS ? "Microarea 04 · UBS Jardim Esperanca" : "Colaborador do Territorio"}
            </p>
          </div>
        </div>

        {isACS && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
            {[
              { val: "12", label: "Pistas registradas", bg: "var(--color-bg-warm)", color: "#4A2F1B" },
              { val: "8",  label: "Conexoes confirmadas", bg: "rgba(11,107,43,0.08)", color: "var(--color-primary)" },
              { val: "3",  label: "Nos desatados", bg: "var(--color-amber-bg)", color: "#B45309" },
              { val: "5",  label: "Jornadas revisadas", bg: "rgba(46,139,60,0.08)", color: "#2E8B3C" },
            ].map((s, i) => (
              <div key={i} style={{ background: s.bg, padding: "12px", borderRadius: "12px", border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: "1.3rem", fontWeight: 900, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: "0.72rem", color: s.color, fontWeight: 700 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: "linear-gradient(135deg, rgba(11,107,43,0.1) 0%, rgba(11,107,43,0.04) 100%)", borderRadius: "14px", padding: "14px", border: "1px solid rgba(11,107,43,0.2)", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.84rem", color: "var(--color-primary)", fontWeight: 700 }}>
          <ShieldCheck size={20} />
          <span>{isACS ? '"Seu trabalho ajudou a reconectar historias no territorio da UBS Jardim Esperanca."' : '"Cada pista registrada ajuda a reconstruir uma jornada real."'}</span>
        </div>
      </div>

      {/* Minha Rede section (always visible) */}
      <div style={{ background: "#fff", borderRadius: "20px", padding: "16px", border: "1px solid #E2DDD3" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <Users size={16} color="#0B6B2B" />
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.95rem", color: "#4A2F1B" }}>Minha Rede</span>
        </div>
        <div style={{ display: "flex", gap: "16px", marginBottom: "14px" }}>
          <div style={{ flex: 1, background: "#F4F1E8", borderRadius: "12px", padding: "10px", textAlign: "center", border: "1px solid #E2DDD3" }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#4A2F1B" }}>{network.length}</div>
            <div style={{ fontSize: "0.68rem", color: "#8B5A2B", fontWeight: 700 }}>pessoas</div>
          </div>
          <div style={{ flex: 1, background: "rgba(11,107,43,0.08)", borderRadius: "12px", padding: "10px", textAlign: "center", border: "1px solid rgba(11,107,43,0.2)" }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#0B6B2B" }}>{activeJourneys}</div>
            <div style={{ fontSize: "0.68rem", color: "#0B6B2B", fontWeight: 700 }}>jornadas ativas</div>
          </div>
        </div>
        <button onClick={onViewRede} style={{ width: "100%", background: "#F4F1E8", border: "1px solid #E2DDD3", borderRadius: "12px", padding: "12px", fontWeight: 700, fontSize: "0.85rem", color: "#4A2F1B", cursor: "pointer" }}>
          Ver minha rede
        </button>
      </div>

      {/* Minha Conta */}
      <div style={{ background: "#fff", borderRadius: "20px", padding: "16px", border: "1px solid #E2DDD3" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.95rem", color: "#4A2F1B", marginBottom: "12px" }}>Minha Conta</div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #F0EDE8", marginBottom: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(11,107,43,0.1)", border: "2px solid rgba(11,107,43,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
            {session && session.role === "ACS" ? "🩺" : session && session.role === "CARE_TEAM" ? "🏥" : session && session.role === "MANAGER" ? "📊" : "👤"}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#4A2F1B" }}>{session ? session.name : "—"}</div>
            <div style={{ fontSize: "0.7rem", color: "#8B5A2B", fontWeight: 600 }}>{session ? session.roleLabel : ""}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button onClick={() => { if (onLogout) onLogout("switch"); }} style={{ width: "100%", background: "#F4F1E8", border: "1px solid #E2DDD3", borderRadius: "12px", padding: "12px", fontWeight: 700, fontSize: "0.84rem", color: "#4A2F1B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <RefreshCw size={14} /> Trocar perfil de demonstracao
          </button>
          <button onClick={() => setShowLogout(true)} style={{ width: "100%", background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "12px", padding: "12px", fontWeight: 700, fontSize: "0.84rem", color: "#DC2626", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <LogOut size={14} /> Sair da conta
          </button>
        </div>
      </div>

      {showLogout && (
        <LogoutModal
          session={session}
          onConfirm={() => { setShowLogout(false); if (onLogout) onLogout("logout"); }}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  );
}
