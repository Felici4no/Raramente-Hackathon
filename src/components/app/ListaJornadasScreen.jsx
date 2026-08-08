import React from "react";
import { MapPin, Bell, ChevronRight, Zap } from "lucide-react";

const JORNADAS = [
  {
    id: "9104", label: "Historia #9104", microarea: "04", origem: "TERRITORIO",
    protocoloAtual: "P04", protocoloNome: "Jornada com nos",
    status: "attention", totalPassos: 7, passosCompletos: 3,
    notifications: [
      { msg: "Nasua encontrou uma conexao nesta jornada.", time: "Hoje" },
      { msg: "Protocolo P04 disponivel.", time: "Hoje" },
    ],
  },
  {
    id: "8401", label: "Historia #8401", microarea: "04", origem: "UBS",
    protocoloAtual: "P07", protocoloNome: "Acompanhamento concluido",
    status: "done", totalPassos: 3, passosCompletos: 2,
    notifications: [],
  },
  {
    id: "7203", label: "Historia #7203", microarea: "04", origem: "CONTATO REMOTO",
    protocoloAtual: "P05", protocoloNome: "Priorizar revisao",
    status: "urgent", totalPassos: 7, passosCompletos: 4,
    notifications: [
      { msg: "Essa jornada agora apresenta elementos para revisao.", time: "Ontem" },
    ],
  },
  {
    id: "6112", label: "Historia #6112", microarea: "04", origem: "UBS",
    protocoloAtual: "P02", protocoloNome: "Pista de peregrinacao",
    status: "active", totalPassos: 5, passosCompletos: 1,
    notifications: [{ msg: "Nova pista conectada a historia.", time: "Ha 2 dias" }],
  },
];

const STATUS_CONFIG = {
  done:      { label: "Concluida",     bg: "rgba(11,107,43,0.08)", border: "rgba(11,107,43,0.25)", color: "#0B6B2B" },
  active:    { label: "Em andamento",  bg: "rgba(11,107,43,0.06)", border: "rgba(11,107,43,0.2)",  color: "#0B6B2B" },
  attention: { label: "Com nos",       bg: "#FEF3C7",              border: "#F59E0B",               color: "#D97706" },
  urgent:    { label: "Priorizar",     bg: "#FEF2F2",              border: "#FCA5A5",               color: "#DC2626" },
};

export { JORNADAS };

export default function ListaJornadasScreen({ onSelectJornada }) {
  const totalNotifs = JORNADAS.reduce((acc, j) => acc + j.notifications.length, 0);

  return (
    <div style={{ padding: "16px 14px 24px", display: "flex", flexDirection: "column", minHeight: "100%" }}>

      <div style={{ marginBottom: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 900, color: "#4A2F1B", margin: 0, lineHeight: 1.15 }}>
              Jornadas
            </h2>
            <p style={{ fontSize: "0.75rem", color: "#8B5A2B", fontWeight: 600, marginTop: "2px" }}>
              Escolha uma historia para continuar a trilha
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
            <span style={{ background: "rgba(11,107,43,0.09)", color: "#0B6B2B", borderRadius: "99px", fontSize: "0.68rem", fontWeight: 700, padding: "3px 9px", display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin size={9} /> Microarea 04
            </span>
            {totalNotifs > 0 && (
              <span style={{ background: "#FEF3C7", color: "#D97706", borderRadius: "99px", fontSize: "0.66rem", fontWeight: 700, padding: "2px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
                <Bell size={9} /> {totalNotifs} conexoes
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "18px" }}>
        <div style={{ background: "#fff", borderRadius: "14px", padding: "12px", border: "1px solid #E2DDD3", textAlign: "center" }}>
          <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#4A2F1B" }}>{JORNADAS.length}</div>
          <div style={{ fontSize: "0.68rem", color: "#8B5A2B", fontWeight: 700 }}>Historias ativas</div>
        </div>
        <div style={{ background: "#FEF3C7", borderRadius: "14px", padding: "12px", border: "1px solid #F59E0B", textAlign: "center" }}>
          <div style={{ fontSize: "1.3rem", fontWeight: 900, color: "#D97706" }}>{JORNADAS.filter(j => j.notifications.length > 0).length}</div>
          <div style={{ fontSize: "0.68rem", color: "#B45309", fontWeight: 700 }}>Com novas conexoes</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {JORNADAS.map((j) => {
          const s = STATUS_CONFIG[j.status];
          const progress = Math.round((j.passosCompletos / j.totalPassos) * 100);
          const hasNotifs = j.notifications.length > 0;
          const ctaBg = j.status === "urgent" ? "#DC2626" : j.status === "attention" ? "#D97706" : "#0B6B2B";

          return (
            <div key={j.id} style={{ background: "#fff", borderRadius: "20px", border: "1px solid " + (hasNotifs ? "#F59E0B" : "#E2DDD3"), boxShadow: "0 2px 10px rgba(0,0,0,0.04)", overflow: "hidden" }}>
              <div style={{ padding: "16px 16px 12px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "#4A2F1B" }}>{j.label}</span>
                      {hasNotifs && (
                        <span style={{ background: "#DC2626", color: "#fff", borderRadius: "99px", fontSize: "0.6rem", fontWeight: 800, padding: "1px 6px" }}>
                          {j.notifications.length}
                        </span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "6px", marginTop: "4px", flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ background: "rgba(11,107,43,0.08)", color: "#0B6B2B", borderRadius: "99px", fontSize: "0.64rem", fontWeight: 700, padding: "2px 7px" }}>M{j.microarea}</span>
                      <span style={{ fontSize: "0.64rem", color: "#8B5A2B", fontWeight: 600 }}>via {j.origem}</span>
                    </div>
                  </div>
                  <span style={{ background: s.bg, border: "1px solid " + s.border, color: s.color, borderRadius: "99px", fontSize: "0.62rem", fontWeight: 800, padding: "3px 8px", flexShrink: 0, marginLeft: "8px" }}>
                    {s.label}
                  </span>
                </div>

                <div style={{ background: "#F4F1E8", borderRadius: "10px", padding: "8px 10px", marginBottom: "10px" }}>
                  <div style={{ fontSize: "0.62rem", fontWeight: 800, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "1px" }}>Protocolo atual</div>
                  <div style={{ fontWeight: 800, fontSize: "0.82rem", color: "#4A2F1B" }}>{j.protocoloAtual} â€” {j.protocoloNome}</div>
                </div>

                {hasNotifs && (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "10px" }}>
                    <Zap size={12} color="#D97706" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.73rem", color: "#B45309", fontWeight: 600, lineHeight: 1.35 }}>
                      {j.notifications[0].msg}
                    </span>
                  </div>
                )}

                <div style={{ marginBottom: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span style={{ fontSize: "0.62rem", color: "#8B5A2B", fontWeight: 700 }}>Trilha</span>
                    <span style={{ fontSize: "0.62rem", color: "#8B5A2B", fontWeight: 700 }}>{j.passosCompletos}/{j.totalPassos} etapas</span>
                  </div>
                  <div style={{ height: "6px", background: "#E2DDD3", borderRadius: "99px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: progress + "%", background: ctaBg, borderRadius: "99px", transition: "width 0.4s ease" }} />
                  </div>
                </div>
              </div>

              <button onClick={() => onSelectJornada(j)} style={{ width: "100%", border: "none", background: ctaBg, color: "#fff", padding: "13px 16px", fontWeight: 800, fontSize: "0.88rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                Abrir jornada <ChevronRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
