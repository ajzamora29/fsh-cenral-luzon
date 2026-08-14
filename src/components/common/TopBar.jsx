import React from "react";
import { COLORS } from "../../utils/colors";
import { IconBell, IconUserCircle } from "./Icons";

export default function TopBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 4px 0" }}>
      <div style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 32, color: COLORS.accentDeep, letterSpacing: 1 }}>DASHBOARD</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <IconBell />
        <div style={{ width: 1, height: 20, background: "#CBD8E6" }} />
        <span style={{ fontFamily: "Sarabun, sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.ink }}>User Admin</span>
        <IconUserCircle />
      </div>
    </div>
  );
}
