import React from "react";
import { ClipboardCheck, ChevronRight, AlertCircle, ExternalLink } from "lucide-react";

const REVIEWS = [
  { id: "r1", story: "Historia #9104", protocol: "P04", reason: "Jornada com nos assistenciais", priority: "high" },
  { id: "r2", story: "Historia #7203", protocol: "P05", reason: "Priorizar revisao — indice elevado", priority: "high" },
  { id: "r3", story: "Historia #6112", protocol: "P02", reason: "Pista de peregrinacao a confirmar", priority: "medium" },
];

export default function CareTeamScreen() {
  return (
    <div style={{ padding: "20px 14px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>Equipe de Saude</div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 900, color: "#4A2F1B", margin: 0 }}>Jornadas para revisao</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {REVIEWS.map((r) => (
          <div key={r.id} style={{ background: "#fff", borderRadius: "16px", border: "1px solid " + (r.priority === "high" ? "#FCA5A5" : "#E2DDD3"), padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.95rem", color: "#4A2F1B" }}>{r.story}</div>
              <div style={{ fontSize: "0.72rem", color: "#8B5A2B", fontWeight: 600, marginTop: "2px" }}>{r.protocol} · {r.reason}</div>
            </div>
            {r.priority === "high" && <AlertCircle size={16} color="#DC2626" />}
            <ChevronRight size={16} color="#8B5A2B" />
          </div>
        ))}
      </div>
      <a
        href="https://quatirare.vercel.app/#/case/9104"
        target="_blank"
        rel="noopener noreferrer"
        style={{ background: "linear-gradient(135deg, rgba(11,107,43,0.08) 0%, rgba(11,107,43,0.03) 100%)", borderRadius: "16px", border: "1px solid rgba(11,107,43,0.25)", padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "0.9rem", color: "#0B6B2B" }}>Investigacao aprofundada</div>
          <div style={{ fontSize: "0.72rem", color: "#8B5A2B", fontWeight: 600, marginTop: "2px" }}>Abrir Historia #9104 no QuaTiRare Research Core</div>
        </div>
        <ExternalLink size={16} color="#0B6B2B" />
      </a>

      <div style={{ background: "#F4F1E8", borderRadius: "14px", padding: "12px 14px", fontSize: "0.78rem", color: "#8B5A2B", fontWeight: 600, lineHeight: 1.45, border: "1px solid #E2DDD3" }}>
        Tela em desenvolvimento para o prototipo completo.
      </div>
    </div>
  );
}
