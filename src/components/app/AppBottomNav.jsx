import React from "react";
import { TAB_CONFIG } from "../../services/authService.js";
import {
  Home, Users, MessageCircle, MapPin, Award,
  Radar, Target, ClipboardCheck, AlertCircle, User,
  BarChart2, Map, TrendingUp
} from "lucide-react";

const ICON_MAP = {
  Home, Users, MessageCircle, MapPin, Award,
  Radar, Target, ClipboardCheck, AlertCircle, User,
  BarChart2, Map, TrendingUp,
};

export default function AppBottomNav({ role, activeTab, setActiveTab }) {
  const tabs = TAB_CONFIG[role] || TAB_CONFIG.ACS;

  return (
    <nav className="app-bottom-nav">
      {tabs.map((tab) => {
        const Icon = ICON_MAP[tab.icon] || Home;
        const isActive = activeTab === tab.id;
        const isElevated = tab.elevated;

        if (isElevated) {
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="app-nav-tab-nasua"
              style={{ position: "relative", top: "-14px" }}
              aria-label={tab.label}>
              <img src="/mascote.png" alt="Nasua" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={"app-nav-tab" + (isActive ? " app-nav-tab--active" : "")}
            aria-label={tab.label}>
            <Icon size={20} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
