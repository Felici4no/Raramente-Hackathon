// â”€â”€â”€ Mock Users â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const MOCK_USERS = {
  "user-collab-01": {
    userId: "user-collab-01",
    name: "Lucas",
    role: "COLLABORATOR",
    roleLabel: "Colaborador do Territorio",
    scope: { type: "PERSONAL_NETWORK" },
  },
  "user-acs-01": {
    userId: "user-acs-01",
    name: "Ana Souza",
    role: "ACS",
    roleLabel: "Agente Comunitaria de Saude",
    scope: { type: "TERRITORY", unitId: "ubs-jardim-esperanca", microareas: ["04"] },
  },
  "user-care-01": {
    userId: "user-care-01",
    name: "Dr. Pedro",
    role: "CARE_TEAM",
    roleLabel: "Equipe de Saude",
    scope: { type: "UNIT", unitId: "ubs-jardim-esperanca" },
  },
  "user-mgr-01": {
    userId: "user-mgr-01",
    name: "Gestora UBS",
    role: "MANAGER",
    roleLabel: "Gestora",
    scope: { type: "UNIT", unitId: "ubs-jardim-esperanca" },
  },
};

// â”€â”€â”€ Permission Policies â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const PERMISSIONS = {
  COLLABORATOR: {
    viewTerritory: false,
    manageOwnJourney: true,
    manageFamilyNetwork: true,
    registerClues: true,
    validateEvents: false,
    reviewJourneys: false,
    viewAggregatedAnalytics: false,
  },
  ACS: {
    viewTerritory: true,
    manageOwnJourney: false,
    manageFamilyNetwork: false,
    registerClues: true,
    validateEvents: false,
    reviewJourneys: false,
    viewAggregatedAnalytics: false,
  },
  CARE_TEAM: {
    viewTerritory: false,
    manageOwnJourney: false,
    manageFamilyNetwork: false,
    registerClues: false,
    validateEvents: true,
    reviewJourneys: true,
    viewAggregatedAnalytics: false,
    viewUnitJourneys: true,
  },
  MANAGER: {
    viewTerritory: true,
    manageOwnJourney: false,
    manageFamilyNetwork: false,
    registerClues: false,
    validateEvents: false,
    reviewJourneys: false,
    viewAggregatedAnalytics: true,
    viewIndividualJourneys: false,
  },
};

// â”€â”€â”€ Role-based Tab Configs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const TAB_CONFIG = {
  COLLABORATOR: [
    { id: "inicio",   label: "Inicio",    icon: "Home" },
    { id: "rede",     label: "Minha Rede", icon: "Users" },
    { id: "nasua",    label: "Nasua",     icon: "MessageCircle", elevated: true },
    { id: "jornadas", label: "Jornadas",  icon: "MapPin" },
    { id: "impacto",  label: "Impacto",   icon: "Award" },
  ],
  ACS: [
    { id: "radar",    label: "Radar",     icon: "Radar" },
    { id: "jornadas", label: "Jornadas",  icon: "MapPin" },
    { id: "nasua",    label: "Nasua",     icon: "MessageCircle", elevated: true },
    { id: "missoes",  label: "Missoes",   icon: "Target" },
    { id: "impacto",  label: "Impacto",   icon: "Award" },
  ],
  CARE_TEAM: [
    { id: "revisoes",   label: "Revisoes",  icon: "ClipboardCheck" },
    { id: "jornadas",   label: "Jornadas",  icon: "MapPin" },
    { id: "nasua",      label: "Nasua",     icon: "MessageCircle", elevated: true },
    { id: "pendencias", label: "Pendencias",icon: "AlertCircle" },
    { id: "conta",      label: "Conta",     icon: "User" },
  ],
  MANAGER: [
    { id: "visao",       label: "Visao Geral", icon: "BarChart2" },
    { id: "territorio",  label: "Territorio",  icon: "Map" },
    { id: "nasua",       label: "Nasua",       icon: "MessageCircle", elevated: true },
    { id: "indicadores", label: "Indicadores", icon: "TrendingUp" },
    { id: "conta",       label: "Conta",       icon: "User" },
  ],
};

export function getDefaultTab(role) {
  const tabs = TAB_CONFIG[role];
  return tabs ? tabs[0].id : "radar";
}

// â”€â”€â”€ Session â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SESSION_KEY = "agente_session";

export function login(userId) {
  const user = MOCK_USERS[userId];
  if (!user) throw new Error("User not found: " + userId);
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  // NEVER localStorage.clear() â€” only remove session
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function can(role, permission) {
  return PERMISSIONS[role]?.[permission] === true;
}

export function getMockUsers() {
  return Object.values(MOCK_USERS);
}
