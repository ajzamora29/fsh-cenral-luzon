import React from "react";
import { COLORS } from "../../utils/colors";

export default function FilterSelect({ label, options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 170 }}>
      <span style={{ fontFamily: "Sarabun, sans-serif", fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8, color: COLORS.sub, textTransform: "uppercase" }}>{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          appearance: "none", background: COLORS.white, border: "1.5px solid #CBD8E6", borderRadius: 9,
          padding: "10px 34px 10px 12px", fontFamily: "Sarabun, sans-serif", fontSize: 14, color: COLORS.ink,
          cursor: "pointer",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C7291' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>")`,
          backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", backgroundSize: 16
        }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
