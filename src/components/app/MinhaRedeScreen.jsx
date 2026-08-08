import React, { useState } from "react";
import { Plus, ChevronRight, Link2, MessageCircle, X, Eye } from "lucide-react";
import { getFamilyNetwork, RELATIONSHIP_LABELS, CONSENT_STATUS } from "../../services/familyService.js";

function SharePreviewModal({ person, onClose }) {
  const msg = "Agente na Sua\nProtocolo P04\n\nJornada: #" + person.journeyId + "\nRelacao: " + (RELATIONSHIP_LABELS[person.relationship] || person.relationship) + "\n\nResumo:\n- multiplos retornos\n- diferentes servicos\n- jornada ainda sem resolucao\n\nAcao sugerida:\nRevisar a trajetoria assistencial.";
  const waUrl = "https://wa.me/?text=" + encodeURIComponent(msg);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(35,28,24,0.45)", backdropFilter: "blur(3px)" }} />
      <div style={{ position: "relative", zIndex: 1, background: "#fff", borderRadius: "24px 24px 0 0", padding: "0 0 32px", boxShadow: "0 -8px 32px rgba(0,0,0,0.16)", animation: "slideUp 0.22s ease", maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 0" }}>
          <div style={{ width: "36px", height: "4px", borderRadius: "99px", background: "#D6D0C8" }} />
        </div>
        <div style={{ padding: "16px 20px 8px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "#4A2F1B" }}>Compartilhar protocolo</div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}><X size={18} color="#8B5A2B" /></button>
          </div>
          <div style={{ background: "#FFF7ED", border: "1px solid #FDE68A", borderRadius: "12px", padding: "10px 12px", marginBottom: "14px", display: "flex", gap: "8px" }}>
            <Eye size={14} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ fontSize: "0.75rem", color: "#B45309", fontWeight: 600, lineHeight: 1.4 }}>
              Esta mensagem nao inclui nome completo, documento ou endereco.
            </div>
          </div>
          <div style={{ background: "#F4F1E8", borderRadius: "12px", padding: "12px", marginBottom: "16px", fontFamily: "monospace", fontSize: "0.76rem", color: "#4A2F1B", lineHeight: 1.6, whiteSpace: "pre-line", border: "1px solid #E2DDD3" }}>
            {msg}
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", borderRadius: "14px", padding: "13px 20px", fontWeight: 800, fontSize: "0.88rem", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 12px rgba(37,211,102,0.25)" }}>
            <MessageCircle size={16} /> Compartilhar pelo WhatsApp
          </a>
        </div>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(60px); opacity:0; } to { transform: translateY(0); opacity:1; } }`}</style>
    </div>
  );
}

export default function MinhaRedeScreen({ session, onAddFamiliar, onSelectPerson }) {
  const [shareTarget, setShareTarget] = useState(null);
  const network = getFamilyNetwork(session.userId);
  const self = network.find((p) => p.relationship === "SELF");
  const family = network.filter((p) => p.relationship !== "SELF");
  const hasConnection = family.some((p) => p.connections > 0);

  return (
    <div style={{ padding: "16px 14px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Header */}
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 900, color: "#4A2F1B", margin: 0, lineHeight: 1.15 }}>Minha Rede</h2>
        <p style={{ fontSize: "0.75rem", color: "#8B5A2B", fontWeight: 600, marginTop: "2px" }}>
          Guarde sua jornada e conecte as historias da sua familia.
        </p>
      </div>

      {/* Family connection notification */}
      {hasConnection && (
        <div style={{ background: "#E0F2FE", border: "1px solid #7DD3FC", borderRadius: "14px", padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: "10px" }}>
          <Link2 size={16} color="#0891B2" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#0C4A6E", lineHeight: 1.35 }}>
              Encontramos informacoes semelhantes em duas jornadas da sua rede.
            </div>
            <button style={{ background: "none", border: "none", color: "#0891B2", fontWeight: 800, fontSize: "0.74rem", cursor: "pointer", padding: "4px 0 0", textDecoration: "underline" }}>
              Revisar conexao
            </button>
          </div>
        </div>
      )}

      {/* Self card */}
      {self && (
        <PersonCard
          person={self}
          onOpen={() => onSelectPerson && onSelectPerson(self)}
          onShare={() => setShareTarget(self)}
          isSelf
        />
      )}

      {/* Family members */}
      {family.length > 0 && (
        <div>
          <div style={{ fontSize: "0.67rem", fontWeight: 800, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>Familiares</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {family.map((p) => (
              <PersonCard
                key={p.id}
                person={p}
                onOpen={() => onSelectPerson && onSelectPerson(p)}
                onShare={() => setShareTarget(p)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add familiar */}
      <button
        onClick={onAddFamiliar}
        style={{ background: "#fff", border: "2px dashed #D4A373", borderRadius: "14px", padding: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#8B5A2B", fontWeight: 700, fontSize: "0.88rem" }}>
        <Plus size={18} color="#8B5A2B" />
        Adicionar familiar
      </button>

      {shareTarget && <SharePreviewModal person={shareTarget} onClose={() => setShareTarget(null)} />}
    </div>
  );
}

function PersonCard({ person, onOpen, onShare, isSelf }) {
  const cs = CONSENT_STATUS[person.consentStatus] || CONSENT_STATUS.PENDING;
  const relLabel = RELATIONSHIP_LABELS[person.relationship] || person.relationship;

  return (
    <div style={{ background: "#fff", borderRadius: "18px", border: "1px solid " + (isSelf ? "rgba(11,107,43,0.3)" : "#E2DDD3"), boxShadow: isSelf ? "0 4px 16px rgba(11,107,43,0.08)" : "0 2px 8px rgba(0,0,0,0.03)", overflow: "hidden" }}>
      <div style={{ padding: "14px 14px 10px" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", color: "#4A2F1B" }}>{person.name}</span>
              <span style={{ background: cs.bg, border: "1px solid " + cs.border, color: cs.color, fontSize: "0.6rem", fontWeight: 800, padding: "1px 6px", borderRadius: "99px" }}>
                {cs.symbol} {cs.label}
              </span>
            </div>
            <div style={{ fontSize: "0.68rem", color: "#8B5A2B", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{relLabel}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.3rem", color: isSelf ? "#0B6B2B" : "#4A2F1B" }}>{person.journeyPct}%</div>
            <div style={{ fontSize: "0.6rem", color: "#8B5A2B", fontWeight: 700 }}>reconstruida</div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ height: "6px", background: "#E2DDD3", borderRadius: "99px", overflow: "hidden", marginBottom: "10px" }}>
          <div style={{ height: "100%", width: person.journeyPct + "%", background: isSelf ? "linear-gradient(90deg, #0B6B2B, #2E8B3C)" : "#D97706", borderRadius: "99px" }} />
        </div>

        {/* Meta */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {person.protocols > 0 && (
            <span style={{ fontSize: "0.68rem", color: "#4A2F1B", fontWeight: 700 }}>{person.protocols} protocolo{person.protocols !== 1 ? "s" : ""}</span>
          )}
          {person.pendingInfo > 0 && (
            <span style={{ fontSize: "0.68rem", color: "#D97706", fontWeight: 700 }}>{person.pendingInfo} informacao pendente{person.pendingInfo !== 1 ? "s" : ""}</span>
          )}
          {person.connections > 0 && (
            <span style={{ fontSize: "0.68rem", color: "#0891B2", fontWeight: 700 }}>{person.connections} nova conexao</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", borderTop: "1px solid #F0EDE8" }}>
        <button
          onClick={onShare}
          style={{ flex: 1, border: "none", background: "transparent", padding: "11px 8px", fontSize: "0.78rem", fontWeight: 700, color: "#8B5A2B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", borderRight: "1px solid #F0EDE8" }}>
          <MessageCircle size={13} /> Compartilhar
        </button>
        <button
          onClick={onOpen}
          style={{ flex: 2, border: "none", background: isSelf ? "#0B6B2B" : "#F4F1E8", padding: "11px 8px", fontSize: "0.82rem", fontWeight: 800, color: isSelf ? "#fff" : "#4A2F1B", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
          Abrir jornada <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
