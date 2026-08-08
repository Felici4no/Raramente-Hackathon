// User-scoped localStorage: agente_journeys_{userId}
// verificationStatus lives on JourneyEvent (NOT on Person/consentStatus)

function journeyKey(userId) {
  return "agente_journeys_" + userId;
}

// verificationStatus â€” belongs to a piece of information, not to a person
export const VERIFICATION_STATUS = {
  REPORTED:             { label: "Relato",    symbol: "â—‹", color: "#D97706", bg: "#FEF3C7",               border: "#F59E0B" },
  PENDING_VERIFICATION: { label: "Pendente",  symbol: "â—Œ", color: "#8B5A2B", bg: "#F4F1E8",               border: "#D4A373" },
  VERIFIED:             { label: "Verificado",symbol: "âœ“", color: "#0B6B2B", bg: "rgba(11,107,43,0.08)", border: "rgba(11,107,43,0.25)" },
};

// Default event structure
// subject = Person (by ID), reportedBy = User (by ID)
function makeEvent(overrides) {
  return {
    id: "event-" + Date.now(),
    subjectId: null,          // person-001 etc
    reportedByUserId: null,   // user-collab-01 etc
    relationship: "SELF",     // SELF | FAMILY_MEMBER
    source: "SELF_REPORT",    // SELF_REPORT | ACS | CARE_TEAM
    verificationStatus: "REPORTED",
    timestamp: new Date().toISOString(),
    ...overrides,
  };
}

export function getJourneys(userId) {
  try {
    const raw = localStorage.getItem(journeyKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveJourneyEvent(userId, event) {
  const journeys = getJourneys(userId);
  journeys.push(makeEvent({ reportedByUserId: userId, ...event }));
  localStorage.setItem(journeyKey(userId), JSON.stringify(journeys));
}
