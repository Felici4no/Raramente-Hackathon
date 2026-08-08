import React, { useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { RELATIONSHIP_OPTIONS, addFamiliar } from "../../services/familyService.js";

export default function AddFamiliarScreen({ session, onBack, onComplete }) {
  const [step, setStep] = useState(1);
  const [relationship, setRelationship] = useState(null);
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(null); // "yes" | "not_yet"

  function handleFinish() {
    if (!relationship || !name.trim()) return;
    const consentStatus = consent === "yes" ? "AUTHORIZED" : "PENDING";
    const person = addFamiliar(session.userId, {
      name: name.trim(),
      relationship: relationship.id,
      consentStatus,
      journeyId: "journey-" + Date.now(),
      journeyPct: 0,
      protocols: 0,
      pendingInfo: 0,
      connections: 0,
    });
    if (onComplete) onComplete(person);
  }

  const stepLabel = ["Parentesco", "Identificacao", "Autorizacao", "Iniciar"];

  return (
    <div style={{ padding: "16px 14px 32px", display: "flex", flexDirection: "column", minHeight: "100%" }}>

      {/* Back */}
      <button onClick={onBack} style={{ background: "#fff", border: "1px solid #E2DDD3", borderRadius: "10px", padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontWeight: 700, color: "#6B655F", width: "fit-content", marginBottom: "20px" }}>
        <ArrowLeft size={14} /> Voltar
      </button>

      {/* Step indicator */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "24px" }}>
        {stepLabel.map((l, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ height: "4px", borderRadius: "99px", background: i + 1 <= step ? "#0B6B2B" : "#E2DDD3", marginBottom: "4px" }} />
            <div style={{ fontSize: "0.55rem", fontWeight: 700, color: i + 1 <= step ? "#0B6B2B" : "#B0A898", textTransform: "uppercase" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Step 1: Relationship */}
      {step === 1 && (
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 900, color: "#4A2F1B", marginBottom: "6px" }}>Quem e essa pessoa para voce?</h2>
          <p style={{ fontSize: "0.8rem", color: "#8B5A2B", fontWeight: 600, marginBottom: "20px" }}>Selecione o parentesco</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "24px" }}>
            {RELATIONSHIP_OPTIONS.filter(r => r.id !== "SELF").map((r) => (
              <button
                key={r.id}
                onClick={() => setRelationship(r)}
                style={{ background: relationship?.id === r.id ? "rgba(11,107,43,0.1)" : "#fff", border: "2px solid " + (relationship?.id === r.id ? "#0B6B2B" : "#E2DDD3"), borderRadius: "14px", padding: "12px 6px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <span style={{ fontSize: "1.3rem" }}>{r.icon}</span>
                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: relationship?.id === r.id ? "#0B6B2B" : "#4A2F1B" }}>{r.label}</span>
              </button>
            ))}
          </div>
          <button onClick={() => relationship && setStep(2)} disabled={!relationship} style={{ width: "100%", background: relationship ? "#0B6B2B" : "#D6D0C8", color: "#fff", border: "none", borderRadius: "14px", padding: "14px", fontWeight: 800, fontSize: "0.9rem", cursor: relationship ? "pointer" : "default" }}>
            Continuar
          </button>
        </div>
      )}

      {/* Step 2: Name */}
      {step === 2 && (
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 900, color: "#4A2F1B", marginBottom: "6px" }}>Como podemos identificar essa jornada?</h2>
          <p style={{ fontSize: "0.8rem", color: "#8B5A2B", fontWeight: 600, marginBottom: "20px" }}>Nome ou apelido ficticio para este prototipo</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Nome da " + (relationship?.label || "pessoa")}
            style={{ width: "100%", border: "2px solid " + (name.trim() ? "#0B6B2B" : "#E2DDD3"), borderRadius: "14px", padding: "14px 16px", fontSize: "0.95rem", fontFamily: "var(--font-body)", fontWeight: 600, color: "#4A2F1B", background: "#fff", outline: "none", boxSizing: "border-box", marginBottom: "20px" }}
          />
          <button onClick={() => name.trim() && setStep(3)} disabled={!name.trim()} style={{ width: "100%", background: name.trim() ? "#0B6B2B" : "#D6D0C8", color: "#fff", border: "none", borderRadius: "14px", padding: "14px", fontWeight: 800, fontSize: "0.9rem", cursor: name.trim() ? "pointer" : "default" }}>
            Continuar
          </button>
        </div>
      )}

      {/* Step 3: Authorization */}
      {step === 3 && (
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.15rem", fontWeight: 900, color: "#4A2F1B", marginBottom: "6px" }}>Voce tem autorizacao para ajudar a reconstruir esta jornada?</h2>
          <p style={{ fontSize: "0.78rem", color: "#8B5A2B", fontWeight: 600, marginBottom: "20px", lineHeight: 1.45 }}>
            Voce podera comecar um rascunho, mas algumas acoes permaneceram indisponiveis ate a autorizacao.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
            {[
              { id: "yes",     label: "Sim",      desc: "Tenho autorizacao para ajudar.",          color: "#0B6B2B", bg: "rgba(11,107,43,0.08)", border: "rgba(11,107,43,0.3)" },
              { id: "not_yet", label: "Ainda nao", desc: "Vou comecar um rascunho sem autorizacao.", color: "#D97706", bg: "#FEF3C7",              border: "#F59E0B" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setConsent(opt.id)}
                style={{ background: consent === opt.id ? opt.bg : "#fff", border: "2px solid " + (consent === opt.id ? opt.color : "#E2DDD3"), borderRadius: "14px", padding: "14px 16px", cursor: "pointer", textAlign: "left" }}>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: consent === opt.id ? opt.color : "#4A2F1B", marginBottom: "2px" }}>{opt.label}</div>
                <div style={{ fontSize: "0.74rem", color: "#8B5A2B", fontWeight: 600, lineHeight: 1.35 }}>{opt.desc}</div>
              </button>
            ))}
          </div>
          <button onClick={() => consent && setStep(4)} disabled={!consent} style={{ width: "100%", background: consent ? "#0B6B2B" : "#D6D0C8", color: "#fff", border: "none", borderRadius: "14px", padding: "14px", fontWeight: 800, fontSize: "0.9rem", cursor: consent ? "pointer" : "default" }}>
            Continuar
          </button>
        </div>
      )}

      {/* Step 4: Start */}
      {step === 4 && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: "20px" }}>
          <div style={{ width: "64px", height: "64px", background: "rgba(11,107,43,0.1)", border: "2px solid rgba(11,107,43,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
            <CheckCircle2 size={32} color="#0B6B2B" />
          </div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 900, color: "#4A2F1B", marginBottom: "8px" }}>Tudo pronto!</h2>
          <p style={{ fontSize: "0.85rem", color: "#8B5A2B", fontWeight: 600, lineHeight: 1.5, marginBottom: "28px", maxWidth: "260px" }}>
            {name} foi adicionado(a) a sua rede com status {consent === "yes" ? "Autorizado" : "Aguardando autorizacao"}. Vamos iniciar a jornada?
          </p>
          <button onClick={handleFinish} style={{ width: "100%", background: "#0B6B2B", color: "#fff", border: "none", borderRadius: "14px", padding: "14px", fontWeight: 800, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 12px rgba(11,107,43,0.3)", marginBottom: "10px" }}>
            Iniciar jornada
          </button>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "#8B5A2B", fontWeight: 700, fontSize: "0.84rem", cursor: "pointer", padding: "8px" }}>
            Depois
          </button>
        </div>
      )}
    </div>
  );
}
