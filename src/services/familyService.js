// User-scoped localStorage: agente_family_{userId}
// Person != User: ownerUserId links them. Name can change. ID cannot.

function familyKey(userId) {
  return "agente_family_" + userId;
}

const DEFAULT_NETWORKS = {
  "user-collab-01": [
    {
      id: "person-001",
      ownerUserId: "user-collab-01",
      name: "Lucas",
      relationship: "SELF",
      consentStatus: "SELF",
      journeyId: "journey-001",
      journeyPct: 82,
      protocols: 3,
      pendingInfo: 1,
      connections: 0,
    },
    {
      id: "person-002",
      ownerUserId: "user-collab-01",
      name: "Maria",
      relationship: "MOTHER",
      consentStatus: "AUTHORIZED",
      journeyId: "journey-002",
      journeyPct: 64,
      protocols: 2,
      pendingInfo: 2,
      connections: 0,
    },
    {
      id: "person-003",
      ownerUserId: "user-collab-01",
      name: "Joao",
      relationship: "FATHER",
      consentStatus: "PENDING",
      journeyId: "journey-003",
      journeyPct: 71,
      protocols: 1,
      pendingInfo: 0,
      connections: 1,
    },
  ],
};

export function getFamilyNetwork(userId) {
  try {
    const raw = localStorage.getItem(familyKey(userId));
    if (raw) return JSON.parse(raw);
    const defaults = DEFAULT_NETWORKS[userId] || [];
    localStorage.setItem(familyKey(userId), JSON.stringify(defaults));
    return defaults;
  } catch {
    return [];
  }
}

export function addFamiliar(userId, familiar) {
  const network = getFamilyNetwork(userId);
  const newPerson = {
    id: "person-" + Date.now(),
    ownerUserId: userId,
    journeyPct: 0,
    protocols: 0,
    pendingInfo: 0,
    connections: 0,
    consentStatus: "PENDING",
    ...familiar,
  };
  network.push(newPerson);
  localStorage.setItem(familyKey(userId), JSON.stringify(network));
  return newPerson;
}

// â”€â”€â”€ Relationship labels â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const RELATIONSHIP_OPTIONS = [
  { id: "SELF",        label: "EU",        icon: "ðŸ‘¤" },
  { id: "MOTHER",      label: "Mae",       icon: "ðŸ‘©" },
  { id: "FATHER",      label: "Pai",       icon: "ðŸ‘¨" },
  { id: "SON",         label: "Filho",     icon: "ðŸ‘¦" },
  { id: "DAUGHTER",    label: "Filha",     icon: "ðŸ‘§" },
  { id: "BROTHER",     label: "Irmao",     icon: "ðŸ§‘" },
  { id: "SISTER",      label: "Irma",      icon: "ðŸ‘±" },
  { id: "GRANDFATHER", label: "Avo",       icon: "ðŸ‘´" },
  { id: "GRANDMOTHER", label: "Avo",       icon: "ðŸ‘µ" },
  { id: "GRANDSON",    label: "Neto",      icon: "ðŸ§’" },
  { id: "UNCLE",       label: "Tio",       icon: "ðŸ§”" },
  { id: "AUNT",        label: "Tia",       icon: "ðŸ‘©" },
  { id: "COUSIN_M",    label: "Primo",     icon: "ðŸ§‘" },
  { id: "OTHER",       label: "Outro",     icon: "ðŸ¤" },
];

export const RELATIONSHIP_LABELS = Object.fromEntries(
  RELATIONSHIP_OPTIONS.map((r) => [r.id, r.label])
);

// â”€â”€â”€ Consent status â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// consentStatus lives on Person (did they authorize Lucas to manage their journey?)
// NOT on the journey event (that uses verificationStatus)
export const CONSENT_STATUS = {
  SELF:       { label: "Voce",      symbol: "âœ“", color: "#0B6B2B", bg: "rgba(11,107,43,0.08)", border: "rgba(11,107,43,0.25)" },
  AUTHORIZED: { label: "Autorizado",symbol: "âœ“", color: "#0B6B2B", bg: "rgba(11,107,43,0.08)", border: "rgba(11,107,43,0.25)" },
  PENDING:    { label: "Aguardando",symbol: "â—Œ", color: "#D97706", bg: "#FEF3C7",               border: "#F59E0B" },
  REVOKED:    { label: "Revogado",  symbol: "âœ•", color: "#DC2626", bg: "#FEF2F2",               border: "#FCA5A5" },
};
