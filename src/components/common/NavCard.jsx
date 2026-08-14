import React from "react";
import { COLORS } from "../../utils/colors";
import { NavIcon, IconArrowRight } from "./Icons";

export default function NavCard({ icon, title, description, cta, onClick }) {
  return (
    <div style={{ flex: 1, minWidth: 320, background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 2px rgba(18,35,63,0.06), 0 10px 26px rgba(18,35,63,0.07)" }}>
      <div style={{ background: `linear-gradient(90deg, ${COLORS.accentDeep}, ${COLORS.accent})`, padding: "14px 20px", display: "flex", alignItems: "center", gap: 10, color: COLORS.white }}>
        <NavIcon name={icon} />
        <span style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 20, letterSpacing: 0.3 }}>{title}</span>
      </div>
      <div style={{ padding: "26px 22px 22px" }}>
        <p style={{ fontFamily: "Sarabun, sans-serif", fontSize: 14.5, color: COLORS.ink, lineHeight: 1.6, margin: "0 0 22px" }}>{description}</p>
        <button
          onClick={onClick}
          className="navcard-btn"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, background: COLORS.accentDeep, color: COLORS.white,
            border: "none", borderRadius: 9, padding: "11px 18px", fontFamily: "Sarabun, sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}
        >
          {cta} <IconArrowRight />
        </button>
      </div>
    </div>
  );
}
