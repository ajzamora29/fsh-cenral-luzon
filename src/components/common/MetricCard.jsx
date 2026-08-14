import React from "react";
import { COLORS } from "../../utils/colors";

export default function MetricCard({ label, value, unit, deltaText, deltaColor, DeltaIcon, extra }) {
  return (
    <div style={{ background: COLORS.cardBg, borderRadius: 14, padding: "18px 22px", flex: 1, minWidth: 220 }}>
      <div style={{ fontFamily: "Sarabun, sans-serif", fontSize: 11.5, fontWeight: 700, letterSpacing: 0.6, color: COLORS.sub, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 10 }}>
        <span style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 34, color: COLORS.accentDeep, lineHeight: 1 }}>{value}</span>
        {unit && <span style={{ fontFamily: "Sarabun, sans-serif", fontSize: 14, color: COLORS.sub }}>{unit}</span>}
      </div>
      {extra ? (
        <div style={{ marginTop: 8, fontFamily: "Sarabun, sans-serif", fontSize: 13.5 }}>{extra}</div>
      ) : (
        <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 5, background: deltaColor === COLORS.green ? "#DDF3E5" : "transparent", padding: deltaColor === COLORS.green ? "3px 9px" : 0, borderRadius: 999 }}>
          {DeltaIcon && <DeltaIcon color={deltaColor} />}
          <span style={{ fontFamily: "Sarabun, sans-serif", fontSize: 13, fontWeight: 600, color: deltaColor }}>{deltaText}</span>
        </div>
      )}
    </div>
  );
}
