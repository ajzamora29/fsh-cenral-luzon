import React from "react";
import { COLORS } from "../../utils/colors";
import { MO_LEADERBOARD } from "../../utils/data";
import { priceColor } from "../../utils/helpers";

export default function Leaderboard({ rows }) {
  const list = (rows && rows.length ? rows : MO_LEADERBOARD).slice(0, 5);
  return (
    <div style={{ background: COLORS.white, borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 2px rgba(18,35,63,0.05)" }}>
      <div style={{ background: `linear-gradient(90deg, ${COLORS.accentDeep}, ${COLORS.accent})`, color: COLORS.white, padding: "13px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 20 }}>Leaderboard</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
      </div>
      <div style={{ padding: "12px 18px 4px", display: "flex", justifyContent: "space-between", fontFamily: "Sarabun, sans-serif", fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, color: COLORS.sub, textTransform: "uppercase" }}>
        <span>Province</span>
        <span style={{ display: "flex", gap: 34 }}><span>Price (₱)</span><span>MoM &Delta;</span></span>
      </div>
      <div style={{ padding: "4px 18px 14px" }}>
        {list.map((p, i) => (
          <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderTop: i > 0 ? "1px solid #EEF2F7" : "none" }}>
            <div style={{ width: 60, height: 6, borderRadius: 4, background: priceColor(p.price) }} />
            <span style={{ flex: 1, fontFamily: "Sarabun, sans-serif", fontSize: 14, color: COLORS.ink }}>{p.name}</span>
            <span style={{ width: 66, textAlign: "right", fontFamily: "Sarabun, sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.ink }}>{p.price.toFixed(2)}</span>
            <span style={{ width: 56, textAlign: "right", fontFamily: "Sarabun, sans-serif", fontSize: 13.5, fontWeight: 600, color: p.mom >= 0 ? COLORS.red : COLORS.accent }}>
              {p.mom >= 0 ? "+" : ""}{p.mom.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
