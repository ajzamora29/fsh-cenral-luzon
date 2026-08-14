// src/pages/ExecutiveHome.jsx
import React from "react";
import { COLORS } from "../utils/colors";
import { IconCalendar, IconMegaphone, IconArrowUp, IconArrowRight, IconWarning } from "../components/common/Icons";
import MetricCard from "../components/common/MetricCard";
import NavCard from "../components/common/NavCard";

export default function ExecutiveHome({ goTo }) {
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return (
    <>
      <div style={{ background: COLORS.white, borderRadius: 14, padding: "22px 26px", marginBottom: 18, boxShadow: "0 1px 2px rgba(18,35,63,0.05)" }}>
        <h1 style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 38, color: COLORS.accentDeep, margin: 0, letterSpacing: 0.3 }}>
          Welcome back, Admin!
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 8 }}>
          <IconCalendar />
          <span style={{ fontFamily: "Sarabun, sans-serif", fontSize: 13.5, color: COLORS.sub }}>{today}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, background: COLORS.amberBg, borderRadius: 12, padding: "13px 18px", marginBottom: 18 }}>
        <IconMegaphone />
        <span style={{ fontFamily: "Sarabun, sans-serif", fontSize: 14, color: COLORS.amberText }}>
          <b style={{ fontWeight: 700 }}>Regional Alert:</b> Bangus retail prices in Aurora increased by +5.2% this month. Tilapia prices in Pampanga remain stable.
        </span>
      </div>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <MetricCard
          label="Current regional avg price"
          value="₱185.50" unit="/ kg"
          DeltaIcon={IconArrowUp} deltaColor={COLORS.green} deltaText="+4.2% vs last month"
        />
        <MetricCard
          label="Predicted price next month"
          value="₱192.30" unit="/ kg"
          extra={<span style={{ color: COLORS.sub, display: "inline-flex", alignItems: "center", gap: 5 }}><IconArrowRight /> Stable expectations (SARIMA engine)</span>}
        />
        <MetricCard
          label="Highest price province"
          value="Aurora" unit={"(₱220.00 / kg)"}
          extra={<span style={{ color: "#C97A00", display: "inline-flex", alignItems: "center", gap: 5 }}><IconWarning /> Bangus (+5.2% MoM)</span>}
        />
      </div>

      <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
        <NavCard
          icon="chart"
          title="Market Overview"
          description="Explore interactive regional maps, provincial price leaderboards, and regional price spreads."
          cta="Open Market Overview"
          onClick={() => goTo("market")}
        />
        <NavCard
          icon="trend"
          title="Price Predictions"
          description="Analyze 2026 SARIMA price forecasts and 12-month seasonality risk calendars."
          cta="Open Price Predictions"
          onClick={() => goTo("predictions")}
        />
      </div>
    </>
  );
}