// src/pages/Settings.jsx
import React from "react";
import { COLORS } from "../utils/colors";
import TopBar from "../components/common/TopBar";

export default function Settings({ goTo }) {
  return (
    <>
      <TopBar />
      <div style={{ background: COLORS.white, borderRadius: 14, padding: "40px 32px", marginTop: 22, boxShadow: "0 1px 2px rgba(18,35,63,0.06), 0 10px 26px rgba(18,35,63,0.07)" }}>
        <div style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 30, color: COLORS.accentDeep, marginBottom: 8 }}>Settings</div>
        <p style={{ fontFamily: "Sarabun, sans-serif", fontSize: 14.5, color: COLORS.sub, lineHeight: 1.7, maxWidth: 520 }}>
          Settings screen placeholder — send the design for this screen to wire it up.
        </p>
        <button
          onClick={() => goTo("home")}
          style={{ marginTop: 18, background: "transparent", border: `1.5px solid ${COLORS.accent}`, color: COLORS.accentDeep, borderRadius: 9, padding: "9px 16px", fontFamily: "Sarabun, sans-serif", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}
        >
          ← Back to Executive Home
        </button>
      </div>
    </>
  );
}