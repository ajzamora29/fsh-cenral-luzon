import React from "react";
import { COLORS } from "../../utils/colors";
import { VOLATILITY_COMMODITIES } from "../../utils/data";

export default function VolatilityBars() {
  const max = Math.max(...VOLATILITY_COMMODITIES.map(c => c.value));
  return (
    <div style={{ background: COLORS.white, borderRadius: 14, padding: "18px 20px 14px", marginTop: 18, boxShadow: "0 1px 2px rgba(18,35,63,0.05)" }}>
      <div style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 22, color: COLORS.accentDeep, marginBottom: 14, borderBottom: "1px solid #EEF2F7", paddingBottom: 8 }}>
        Price Volatility Index
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 150, padding: "0 4px" }}>
        {VOLATILITY_COMMODITIES.map(c => (
          <div key={c.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: "100%", height: `${(c.value / max) * 120}px`, background: c.color, borderRadius: "4px 4px 0 0" }} />
            <span style={{ fontFamily: "Sarabun, sans-serif", fontSize: 11.5, color: COLORS.sub }}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
