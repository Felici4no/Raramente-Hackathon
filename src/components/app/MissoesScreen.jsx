import React, { useState } from "react";
import { Target, CheckCircle2, RefreshCw, Sparkles, AlertCircle } from "lucide-react";

const MISSIONS = [
  {
    id: "m1",
    badge: "No pendente",
    title: "Encaminhamento perdido",
    desc: "Consulta para Neurologia indicada ha 8 meses. Sem registro de realizacao na rede.",
    target: "Pedro · Microarea 04",
    actionText: "Verificar consulta",
    resolvedMsg: "Encaminhamento reagendado com sucesso.",
  },
  {
    id: "m2",
    badge: "No pendente",
    title: "Retorno sem resposta",
    desc: "Retorno para UBS agendado apos exame de imagem que nao foi anexado ao prontuario.",
    target: "Bete · Microarea 01",
    actionText: "Verificar exame",
    resolvedMsg: "Resultado do exame localizado.",
  },
  {
    id: "m3",
    badge: "No pendente",
    title: "Encaminhamento em aberto",
    desc: "Encaminhamento para fisioterapia gerado na UBS ha 3 meses sem confirmacao.",
    target: "Pedro · Microarea 04",
    actionText: "Confirmar encaminhamento",
    resolvedMsg: "Encaminhamento confirmado e reagendado.",
  },
];

export default function MissoesScreen() {
  const [resolvedIds, setResolvedIds] = useState([]);
  const [animatingId, setAnimatingId] = useState(null);

  const handleResolve = (id) => {
    setAnimatingId(id);
    setTimeout(() => {
      setResolvedIds((prev) => [...prev, id]);
      setAnimatingId(null);
    }, 800);
  };

  return (
    <div style={{ padding: "20px 14px", display: "flex", flexDirection: "column", gap: "18px" }}>

      {/* Header */}
      <div>
        <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#8B5A2B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>
          Desatar nos do territorio
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 900, color: "#4A2F1B", margin: 0, lineHeight: 1.15 }}>
          Missoes de Cuidado
        </h2>
      </div>

      {/* Nasua intro */}
      <div style={{ background: "linear-gradient(135deg, rgba(11,107,43,0.08) 0%, rgba(11,107,43,0.03) 100%)", borderRadius: "16px", padding: "14px", border: "1px solid rgba(11,107,43,0.2)", display: "flex", alignItems: "center", gap: "12px" }}>
        <img src="/nasua.png" alt="Nasua" style={{ width: "40px", height: "40px", objectFit: "contain", flexShrink: 0 }} />
        <div style={{ fontSize: "0.83rem", color: "#0B6B2B", fontWeight: 600, lineHeight: 1.45 }}>
          "Quando um encaminhamento e resgatado, a linha do cuidado volta a fluir!"
        </div>
      </div>

      {/* Missions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {MISSIONS.map((m) => {
          const isResolved = resolvedIds.includes(m.id);
          const isAnimating = animatingId === m.id;

          return (
            <div
              key={m.id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                border: isResolved ? "2px solid #57B33E" : "1px solid #F59E0B",
                boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                overflow: "hidden",
              }}>
              <div style={{ padding: "16px 16px 14px" }}>
                {/* Top row: badge + target */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "10px" }}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: "4px",
                    background: isResolved ? "rgba(11,107,43,0.1)" : "#FEF3C7",
                    color: isResolved ? "#0B6B2B" : "#D97706",
                    border: "1px solid " + (isResolved ? "rgba(11,107,43,0.25)" : "#F59E0B"),
                    borderRadius: "99px", fontSize: "0.68rem", fontWeight: 800,
                    padding: "3px 9px", flexShrink: 0,
                  }}>
                    {isResolved ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                    {isResolved ? "No Desatado" : m.badge}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "#8B5A2B", fontWeight: 700, textAlign: "right", lineHeight: 1.3, minWidth: 0, wordBreak: "break-word" }}>
                    {m.target}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 800, color: "#4A2F1B", marginBottom: "6px", lineHeight: 1.25 }}>
                  {m.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: "0.84rem", color: "#524B45", lineHeight: 1.55, marginBottom: "14px", margin: "0 0 14px 0", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {m.desc}
                </p>
              </div>

              {/* CTA */}
              {!isResolved ? (
                <button
                  onClick={() => handleResolve(m.id)}
                  disabled={isAnimating}
                  style={{
                    width: "100%", border: "none",
                    background: isAnimating ? "#6B655F" : "#0B6B2B",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    fontWeight: 800, fontSize: "0.9rem",
                    minHeight: "52px", padding: "12px 16px",
                    lineHeight: 1.3, textAlign: "center",
                    transition: "background 0.2s",
                  }}>
                  {isAnimating ? (
                    <><RefreshCw size={16} className="animate-spin" /><span>Desatando no...</span></>
                  ) : (
                    <><Target size={16} /><span>{m.actionText}</span></>
                  )}
                </button>
              ) : (
                <div style={{ background: "rgba(11,107,43,0.08)", padding: "14px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Sparkles size={16} color="#0B6B2B" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "0.84rem", color: "#0B6B2B", fontWeight: 700, lineHeight: 1.35 }}>{m.resolvedMsg}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
