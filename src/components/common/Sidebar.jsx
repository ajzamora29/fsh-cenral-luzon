import React from "react";
import { COLORS } from "../../utils/colors";
import { NAV_DASHBOARDS, NAV_ACTIONS } from "../../utils/data";
import { FishLogo, NavIcon } from "./Icons";

export default function Sidebar({ page, goTo }) {
  return (
    <div
      style={{
        width: 260, flexShrink: 0, color: COLORS.white,
        background: `linear-gradient(180deg, ${COLORS.navyTop} 0%, ${COLORS.navyBottom} 100%)`,
        display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "24px 20px 20px" }}>
        <FishLogo />
        <div>
          <div style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 22, lineHeight: 1.05, letterSpacing: 0.3 }}>
            FSH Central<br />Luzon
          </div>
        </div>
      </div>

      <div style={{ padding: "0 20px 18px", fontFamily: "Sarabun, sans-serif", fontSize: 10.5, letterSpacing: 1.2, color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>
        MARKET INTELLIGENCE
      </div>

      <div style={{ padding: "6px 14px", fontFamily: "Sarabun, sans-serif", fontSize: 10.5, letterSpacing: 1, color: "rgba(255,255,255,0.55)", fontWeight: 700, marginTop: 6 }}>
        DASHBOARDS
      </div>
      <div style={{ padding: "4px 12px", display: "flex", flexDirection: "column", gap: 3 }}>
        {NAV_DASHBOARDS.map(item => (
          <button
            key={item.key}
            className="navbtn"
            onClick={() => goTo(item.key)}
            style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 9,
              border: "none", cursor: "pointer", textAlign: "left",
              background: page === item.key ? COLORS.navyActive : "transparent",
              color: COLORS.white, fontFamily: "Sarabun, sans-serif", fontSize: 14, fontWeight: page === item.key ? 600 : 400
            }}
          >
            <NavIcon name={item.icon} />
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 12px 6px 14px", fontFamily: "Sarabun, sans-serif", fontSize: 10.5, letterSpacing: 1, color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>
        ACTIONS
      </div>
      <div style={{ padding: "4px 12px", display: "flex", flexDirection: "column", gap: 3 }}>
        {NAV_ACTIONS.map(item => (
          <button
            key={item.key}
            className="navbtn"
            onClick={() => goTo(item.key)}
            style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 9,
              border: "none", cursor: "pointer", textAlign: "left",
              background: page === item.key ? COLORS.navyActive : "transparent",
              color: COLORS.white, fontFamily: "Sarabun, sans-serif", fontSize: 14
            }}
          >
            <NavIcon name={item.icon} />
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: 14, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
        <button
          onClick={() => alert("Logged out (placeholder — wire to real auth later).")}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10, background: COLORS.white,
            color: COLORS.red, border: "none", borderRadius: 9, padding: "11px 14px",
            fontFamily: "Sarabun, sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}
        >
          <NavIcon name="logout" /> Logout
        </button>
      </div>
    </div>
  );
}
