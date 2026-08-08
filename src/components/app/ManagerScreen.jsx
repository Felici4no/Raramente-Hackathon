import React from "react";
import { BarChart2, Users, TrendingUp } from "lucide-react";

export default function ManagerScreen() {
  return (
    <div style={{ padding: "20px 14px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>Gestao</div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 900, color: "#4A2F1B", margin: 0 }}>Visao geral do territorio</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {[
          { label: "Historias ativas", value: "542", icon: Users, color: "#0B6B2B", bg: "rgba(11,107,43,0.08)" },
          { label: "Jornadas complexas", value: "14", icon: BarChart2, color: "#DC2626", bg: "#FEF2F2" },
          { label: "Nos desatados (mes)", value: "38", icon: TrendingUp, color: "#D97706", bg: "#FEF3C7" },
          { label: "Para revisao", value: "4", icon: BarChart2, color: "#7C3AED", bg: "#F5F3FF" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, borderRadius: "14px", padding: "14px", border: "1px solid " + s.color + "33" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: "0.7rem", color: "#4A2F1B", fontWeight: 700, marginTop: "2px", lineHeight: 1.3 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#F4F1E8", borderRadius: "14px", padding: "12px 14px", fontSize: "0.78rem", color: "#8B5A2B", fontWeight: 600, lineHeight: 1.45, border: "1px solid #E2DDD3" }}>
        Dashboard completo em desenvolvimento para o prototipo final.
      </div>
    </div>
  );
}
