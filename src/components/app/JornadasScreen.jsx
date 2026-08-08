import React, { useState } from "react";
import {
  MapPin, Bell, ArrowLeft, Clipboard, MessageCircle, BookOpen,
  CheckCircle2, AlertCircle, Zap
} from "lucide-react";

const PROTOCOLS = {
  P01: { code: "P01", name: "Escuta inicial",          desc: "Primeiro contato com a historia. O ACS registra a origem da pista e os elementos iniciais da jornada.", action: "Registrar de onde veio a pista e o que chamou atencao.", color: "#0B6B2B", bgColor: "rgba(11,107,43,0.08)", borderColor: "rgba(11,107,43,0.25)" },
  P02: { code: "P02", name: "Pista de peregrinacao",   desc: "A pessoa passou por muitos lugares sem resolucao. A jornada comeca a ganhar nos.", action: "Verificar quantos servicos foram percorridos sem resposta.", color: "#D97706", bgColor: "#FEF3C7", borderColor: "#F59E0B" },
  P03: { code: "P03", name: "Pista de repeticao",      desc: "A pessoa esta voltando ao mesmo ponto da rede sem avancar. Sinal de estagnacao assistencial.", action: "Identificar o ponto de retorno e verificar encaminhamento pendente.", color: "#B45309", bgColor: "#FEF3C7", borderColor: "#D97706" },
  P04: { code: "P04", name: "Jornada com nos",         desc: "Multiplas pistas conectadas. Fragmentacao, repeticao e tempo prolongado sem resolucao.", action: "Priorizar para revisao pela equipe. Registrar o grafo.", color: "#DC2626", bgColor: "#FEF2F2", borderColor: "#FCA5A5" },
  P05: { code: "P05", name: "Priorizar revisao",       desc: "Indice de enredamento elevado. O QuaTiRare identificou padroes que precisam de atencao humana.", action: "Acionar equipe responsavel. Compartilhar o protocolo.", color: "#7C3AED", bgColor: "#F5F3FF", borderColor: "#C4B5FD" },
  P06: { code: "P06", name: "Jornada reconectada",     desc: "A jornada foi retomada apos ruptura. Novo encaminhamento ativo.", action: "Confirmar efetivacao do encaminhamento.", color: "#0891B2", bgColor: "#E0F2FE", borderColor: "#7DD3FC" },
  P07: { code: "P07", name: "Acompanhamento concluido",desc: "A jornada chegou a uma resposta. Historia resolvida.", action: "Registrar conclusao e encerrar acompanhamento.", color: "#0B6B2B", bgColor: "rgba(11,107,43,0.08)", borderColor: "rgba(11,107,43,0.3)" },
};

const TRAIL_BY_STATUS = {
  attention: [
    { proto: "P01", status: "done" },
    { proto: "P02", status: "done" },
    { proto: "P03", status: "done" },
    { proto: "P04", status: "current" },
    { proto: "P05", status: "next" },
    { proto: "P06", status: "locked" },
    { proto: "P07", status: "locked" },
  ],
  done: [
    { proto: "P01", status: "done" },
    { proto: "P02", status: "done" },
    { proto: "P07", status: "current" },
  ],
  urgent: [
    { proto: "P01", status: "done" },
    { proto: "P02", status: "done" },
    { proto: "P03", status: "attention" },
    { proto: "P04", status: "attention" },
    { proto: "P05", status: "current" },
    { proto: "P06", status: "locked" },
    { proto: "P07", status: "locked" },
  ],
  active: [
    { proto: "P01", status: "done" },
    { proto: "P02", status: "current" },
    { proto: "P03", status: "next" },
    { proto: "P04", status: "locked" },
    { proto: "P07", status: "locked" },
  ],
};

function buildWhatsAppMessage(jornada, step) {
  const p = PROTOCOLS[step.proto];
  return "https://wa.me/?text=" + encodeURIComponent(
    "Agente na Sua - Protocolo de Acompanhamento\n" +
    "Microarea: " + jornada.microarea + "\n" +
    "Historia: #" + jornada.id + "\n" +
    "Protocolo: " + p.code + " - " + p.name + "\n\n" +
    "Descricao:\n" + p.desc + "\n\n" +
    "Acao sugerida:\n" + p.action + "\n\n" +
    "Origem da pista:\n" + jornada.origem + "\n\n" +
    "Gerado por: Agente na Sua - QuaTiRare"
  );
}

function getStatusStyle(status) {
  if (status === "done")      return { bg: "#0B6B2B", border: "#0B6B2B", text: "#fff",     glow: false };
  if (status === "current")   return { bg: "#fff",    border: "#0B6B2B", text: "#0B6B2B",  glow: true  };
  if (status === "attention") return { bg: "#FEF3C7", border: "#D97706", text: "#B45309",  glow: false };
  if (status === "next")      return { bg: "#F4F1E8", border: "#D4A373", text: "#8B5A2B",  glow: false };
  return { bg: "#F0EDE8", border: "#D6D0C8", text: "#B0A898", glow: false };
}

function TrailSinuous({ trail, onSelectStep }) {
  const positions = ["left", "center", "right", "center", "left", "center", "right"];

  return (
    <div style={{ position: "relative", padding: "8px 0 4px" }}>
      {trail.map((step, idx) => {
        const p = PROTOCOLS[step.proto];
        const s = getStatusStyle(step.status);
        const align = positions[idx % positions.length];
        const isLast = idx === trail.length - 1;
        const locked = step.status === "locked";

        const alignStyle = align === "left"
          ? { alignItems: "flex-start", paddingLeft: "16px" }
          : align === "right"
          ? { alignItems: "flex-end", paddingRight: "16px" }
          : { alignItems: "center" };

        const lineLeft = align === "left" ? "44px" : align === "right" ? "calc(100% - 44px)" : "50%";

        return (
          <div key={idx} style={{ position: "relative", marginBottom: isLast ? 0 : "8px" }}>
            <div style={{ display: "flex", flexDirection: "column", ...alignStyle }}>
              <button
                onClick={() => !locked && onSelectStep(step)}
                disabled={locked}
                style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  background: s.bg, border: "2.5px solid " + s.border,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: locked ? "default" : "pointer",
                  opacity: locked ? 0.45 : 1,
                  boxShadow: s.glow
                    ? "0 0 0 6px rgba(11,107,43,0.12), 0 0 0 14px rgba(11,107,43,0.05)"
                    : "0 2px 6px rgba(0,0,0,0.07)",
                  transition: "transform 0.12s",
                  flexShrink: 0,
                }}>
                {step.status === "done" ? (
                  <CheckCircle2 size={24} color="#fff" />
                ) : step.status === "attention" ? (
                  <AlertCircle size={22} color={s.text} />
                ) : locked ? (
                  <span style={{ fontSize: "20px", opacity: 0.5 }}>ðŸ”’</span>
                ) : (
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "0.88rem", color: s.text }}>{p.code}</span>
                )}
              </button>
              <div style={{ marginTop: "4px", textAlign: align === "center" ? "center" : align }}>
                <div style={{ fontSize: "0.6rem", fontWeight: 800, color: locked ? "#B0A898" : step.status === "done" ? "#0B6B2B" : s.text, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {p.code}
                </div>
                <div style={{ fontSize: "0.58rem", fontWeight: 600, color: "#8B5A2B", lineHeight: 1.2, maxWidth: "64px", opacity: locked ? 0.4 : 0.85 }}>
                  {p.name}
                </div>
              </div>
            </div>
            {!isLast && (
              <div style={{ position: "absolute", left: lineLeft, bottom: "-14px", transform: "translateX(-50%)", width: "2px", height: "22px", background: step.status === "done" ? "rgba(11,107,43,0.3)" : "#E2DDD3" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function BottomSheet({ jornada, step, onClose, onRegisterPista }) {
  if (!jornada || !step) return null;
  const p = PROTOCOLS[step.proto];
  const waUrl = buildWhatsAppMessage(jornada, step);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(35,28,24,0.45)", backdropFilter: "blur(3px)" }} />
      <div style={{ position: "relative", zIndex: 1, background: "#fff", borderRadius: "24px 24px 0 0", padding: "0 0 32px", boxShadow: "0 -8px 32px rgba(0,0,0,0.16)", animation: "slideUp 0.22s ease", maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
          <div style={{ width: "36px", height: "4px", borderRadius: "99px", background: "#D6D0C8" }} />
        </div>
        <div style={{ padding: "16px 20px 8px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: p.bgColor, border: "1px solid " + p.borderColor, borderRadius: "12px", padding: "6px 12px", marginBottom: "12px" }}>
            <span style={{ fontWeight: 900, fontSize: "0.9rem", color: p.color }}>{p.code}</span>
            <span style={{ fontWeight: 700, fontSize: "0.82rem", color: p.color }}>{p.name}</span>
          </div>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#8B5A2B", marginBottom: "6px" }}>
            {jornada.label} Â· Microarea {jornada.microarea} Â· via {jornada.origem}
          </div>
          <p style={{ fontSize: "0.86rem", color: "#4A2F1B", lineHeight: 1.55, marginBottom: "14px", fontWeight: 500 }}>{p.desc}</p>
          <div style={{ background: "#F4F1E8", borderRadius: "14px", padding: "12px 14px", marginBottom: "20px", borderLeft: "3px solid " + p.color }}>
            <div style={{ fontSize: "0.67rem", fontWeight: 800, color: p.color, textTransform: "uppercase", marginBottom: "4px" }}>O que fazer agora</div>
            <p style={{ fontSize: "0.84rem", color: "#4A2F1B", fontWeight: 600, lineHeight: 1.4, margin: 0 }}>{p.action}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button onClick={onRegisterPista} style={{ background: "#0B6B2B", color: "#fff", border: "none", borderRadius: "14px", padding: "14px 20px", fontWeight: 800, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 12px rgba(11,107,43,0.3)" }}>
              <Clipboard size={16} /> Registrar pista
            </button>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", borderRadius: "14px", padding: "13px 20px", fontWeight: 800, fontSize: "0.88rem", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 12px rgba(37,211,102,0.25)" }}>
              <MessageCircle size={16} /> Compartilhar via WhatsApp
            </a>
            <button onClick={onClose} style={{ background: "transparent", color: "#8B5A2B", border: "1px solid #E2DDD3", borderRadius: "14px", padding: "12px 20px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <BookOpen size={14} /> Ver protocolo completo
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(60px); opacity:0; } to { transform: translateY(0); opacity:1; } }`}</style>
    </div>
  );
}

export default function JornadasScreen({ jornada, onBack, onStartPista }) {
  const [selectedStep, setSelectedStep] = useState(null);

  if (!jornada) return null;

  const trail = TRAIL_BY_STATUS[jornada.status] || TRAIL_BY_STATUS.active;
  const currentProto = trail.find(s => s.status === "current" || s.status === "attention");
  const p = currentProto ? PROTOCOLS[currentProto.proto] : null;

  function handleCloseSheet() { setSelectedStep(null); }
  function handleRegisterPista() { handleCloseSheet(); if (onStartPista) onStartPista(); }

  return (
    <div style={{ padding: "16px 14px 24px", display: "flex", flexDirection: "column", minHeight: "100%" }}>

      {/* Back button */}
      <button
        onClick={onBack}
        style={{ background: "#fff", border: "1px solid #E2DDD3", borderRadius: "10px", padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 700, color: "#6B655F", width: "fit-content", marginBottom: "16px" }}>
        <ArrowLeft size={14} /> Todas as jornadas
      </button>

      {/* Journey header */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 900, color: "#4A2F1B", margin: 0, lineHeight: 1.15 }}>
              {jornada.label}
            </h2>
            <p style={{ fontSize: "0.75rem", color: "#8B5A2B", fontWeight: 600, marginTop: "2px" }}>
              Trilha da jornada assistencial
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
            <span style={{ background: "rgba(11,107,43,0.09)", color: "#0B6B2B", borderRadius: "99px", fontSize: "0.67rem", fontWeight: 700, padding: "3px 8px", display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin size={9} /> M{jornada.microarea}
            </span>
            <span style={{ fontSize: "0.67rem", color: "#8B5A2B", fontWeight: 600 }}>via {jornada.origem}</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {jornada.notifications.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
          {jornada.notifications.map((n, i) => (
            <div key={i} style={{ background: "#FFF7ED", border: "1px solid #FDE68A", borderRadius: "10px", padding: "8px 10px", display: "flex", alignItems: "flex-start", gap: "7px" }}>
              <Zap size={13} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#B45309", lineHeight: 1.3 }}>{n.msg}</div>
                <div style={{ fontSize: "0.64rem", color: "#D97706", marginTop: 1 }}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current protocol card */}
      {p && (
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid " + p.borderColor, padding: "14px", marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: "0.62rem", fontWeight: 800, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "6px" }}>Protocolo atual</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span style={{ background: p.bgColor, border: "1px solid " + p.borderColor, color: p.color, fontWeight: 900, fontSize: "0.82rem", borderRadius: "8px", padding: "3px 8px" }}>{p.code}</span>
            <span style={{ fontWeight: 800, fontSize: "0.88rem", color: "#4A2F1B" }}>{p.name}</span>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#524B45", lineHeight: 1.45, margin: 0 }}>{p.action}</p>
        </div>
      )}

      {/* Trail card */}
      <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #E2DDD3", padding: "16px 16px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", marginBottom: "16px" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
          Trilha de protocolos
        </div>
        <TrailSinuous trail={trail} onSelectStep={setSelectedStep} />
      </div>

      {/* Action CTAs */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button onClick={() => { if (onStartPista) onStartPista(); }} style={{ background: "#0B6B2B", color: "#fff", border: "none", borderRadius: "14px", padding: "14px 20px", fontWeight: 800, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 12px rgba(11,107,43,0.3)" }}>
          <Clipboard size={16} /> Registrar pista
        </button>
      </div>

      {/* Nasua tip */}
      <div style={{ background: "#F4F1E8", borderRadius: "16px", padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: "10px", border: "1px solid #E2DDD3", marginTop: "16px" }}>
        <img src="/mascote.png" alt="Nasua" style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#8B5A2B", marginBottom: "2px" }}>Nasua diz:</div>
          <p style={{ fontSize: "0.8rem", color: "#4A2F1B", fontWeight: 600, lineHeight: 1.4, margin: 0 }}>
            "Toque em qualquer bolha da trilha para ver o que fazer agora."
          </p>
        </div>
      </div>

      <BottomSheet jornada={jornada} step={selectedStep} onClose={handleCloseSheet} onRegisterPista={handleRegisterPista} />
    </div>
  );
}
