import React from "react";
import { ChevronRight, Plus, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { getFamilyNetwork, RELATIONSHIP_LABELS, CONSENT_STATUS } from "../../services/familyService.js";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export default function InicioScreen({ session, onOpenJornada, onOpenRede, onAddFamiliar, onStartPista }) {
  const network = getFamilyNetwork(session.userId);
  const self = network.find((p) => p.relationship === "SELF");
  const family = network.filter((p) => p.relationship !== "SELF");

  return (
    <div style={{ padding: "20px 14px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Greeting */}
      <div>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#8B5A2B", marginBottom: "2px" }}>
          {getGreeting()},
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 900, color: "#4A2F1B", margin: 0, lineHeight: 1.15 }}>
          {session.name}.
        </h2>
        <p style={{ fontSize: "0.82rem", color: "#8B5A2B", fontWeight: 600, marginTop: "4px" }}>
          Continue reconstruindo as historias da sua rede.
        </p>
      </div>

      {/* Own journey â€” highlight card */}
      {self && (
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
            Minha Jornada
          </div>
          <div style={{ background: "#fff", borderRadius: "20px", border: "2px solid rgba(11,107,43,0.3)", boxShadow: "0 4px 16px rgba(11,107,43,0.08)", overflow: "hidden" }}>
            <div style={{ padding: "16px 16px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.1rem", color: "#4A2F1B" }}>{self.name}</div>
                  <div style={{ fontSize: "0.68rem", color: "#0B6B2B", fontWeight: 700 }}>{self.protocols} protocolos Â· {self.pendingInfo} pendente{self.pendingInfo !== 1 ? "s" : ""}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.6rem", color: "#0B6B2B" }}>{self.journeyPct}%</div>
                  <div style={{ fontSize: "0.62rem", color: "#8B5A2B", fontWeight: 700 }}>reconstruida</div>
                </div>
              </div>
              <div style={{ height: "8px", background: "#E2DDD3", borderRadius: "99px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: self.journeyPct + "%", background: "linear-gradient(90deg, #0B6B2B, #2E8B3C)", borderRadius: "99px" }} />
              </div>
              {self.pendingInfo > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px" }}>
                  <AlertCircle size={12} color="#D97706" />
                  <span style={{ fontSize: "0.72rem", color: "#B45309", fontWeight: 600 }}>{self.pendingInfo} informacao pendente de confirmacao</span>
                </div>
              )}
            </div>
            <button onClick={() => onOpenJornada && onOpenJornada(self)} style={{ width: "100%", border: "none", background: "#0B6B2B", color: "#fff", padding: "13px", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              Continuar jornada <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Family network summary */}
      {family.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Minha Rede
            </div>
            <button onClick={onOpenRede} style={{ background: "none", border: "none", fontSize: "0.72rem", color: "#0B6B2B", fontWeight: 700, cursor: "pointer" }}>
              Ver tudo â€º
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {family.map((p) => {
              const cs = CONSENT_STATUS[p.consentStatus] || CONSENT_STATUS.PENDING;
              return (
                <div key={p.id} style={{ background: "#fff", borderRadius: "14px", padding: "12px 14px", border: "1px solid #E2DDD3", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontWeight: 800, fontSize: "0.92rem", color: "#4A2F1B" }}>{p.name}</span>
                      <span style={{ fontSize: "0.62rem", color: "#8B5A2B", fontWeight: 600 }}>{RELATIONSHIP_LABELS[p.relationship] || p.relationship}</span>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#8B5A2B", marginTop: "2px" }}>
                      {p.journeyPct}% reconstruida
                      {p.pendingInfo > 0 && <span style={{ color: "#D97706", fontWeight: 700 }}> Â· {p.pendingInfo} ponto{p.pendingInfo !== 1 ? "s" : ""} a conectar</span>}
                      {p.connections > 0 && <span style={{ color: "#0B6B2B", fontWeight: 700 }}> Â· {p.connections} nova conexao</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px" }}>
                    <span style={{ fontSize: "0.9rem" }}>{cs.symbol}</span>
                    <span style={{ fontSize: "0.58rem", color: cs.color, fontWeight: 700, background: cs.bg, padding: "1px 5px", borderRadius: "99px", border: "1px solid " + cs.border }}>{cs.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add familiar CTA */}
      <button
        onClick={onAddFamiliar}
        style={{ background: "#fff", border: "2px dashed #D4A373", borderRadius: "14px", padding: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#8B5A2B", fontWeight: 700, fontSize: "0.88rem" }}>
        <Plus size={18} color="#8B5A2B" />
        Adicionar familiar
      </button>
    </div>
  );
}
