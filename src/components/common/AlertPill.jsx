import React from "react";
import { COLORS } from "../../utils/colors";

/* Small rounded status badge, e.g. "Live" / "Fallback data". */
export function AlertPill({ tone = "neutral", children }) {
  const tones = {
    neutral: { bg: "#E4F3FA", text: COLORS.accentDeep },
    warning: { bg: COLORS.amberBg, text: COLORS.amberText },
    good: { bg: "#DDF3E5", text: COLORS.green },
    bad: { bg: "#F8DEDA", text: COLORS.red }
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 5, background: t.bg, color: t.text,
        borderRadius: 999, padding: "4px 11px", fontFamily: "Sarabun, sans-serif", fontSize: 12.5, fontWeight: 600
      }}
    >
      {children}
    </span>
  );
}

/* Horizontal Pill Switcher / segmented control.
   Used on Market Overview as the single Commodity filter -- swaps the
   old dropdown + "Apply Filters" button for instant, tap-to-select
   pills. Selecting a pill updates state directly, no Apply step. */
export function PillSwitcher({ options, value, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Commodity"
      style={{
        display: "inline-flex", gap: 4, background: COLORS.white, border: "1.5px solid #CBD8E6",
        borderRadius: 999, padding: 4
      }}
    >
      {options.map(opt => {
        const active = opt === value;
        return (
          <button
            key={opt}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt)}
            className="pill-switch-btn"
            style={{
              border: "none", cursor: "pointer", borderRadius: 999, padding: "9px 18px",
              fontFamily: "Sarabun, sans-serif", fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap",
              background: active ? `linear-gradient(90deg, ${COLORS.accentDeep}, ${COLORS.accent})` : "transparent",
              color: active ? COLORS.white : COLORS.sub,
              boxShadow: active ? "0 2px 6px rgba(18,59,107,0.28)" : "none",
              transition: "background .15s ease, color .15s ease"
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default AlertPill;
