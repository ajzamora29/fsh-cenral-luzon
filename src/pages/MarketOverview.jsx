import React, { useState } from "react";
import { COLORS } from "../utils/colors";
import { MO_PROVINCES, PRICE_DOMAIN, COMMODITIES } from "../utils/data";
import { priceColor } from "../utils/helpers";
import { useApiData } from "../hooks/useApiData";
import TopBar from "../components/common/TopBar";
import { PillSwitcher } from "../components/common/AlertPill";
import ChoroplethMap from "../components/charts/ChoroplethMap";
import Leaderboard from "../components/charts/Leaderboard";
import VolatilityBars from "../components/charts/VolatilityBars";

export default function MarketOverview() {
  const [commodity, setCommodity] = useState(COMMODITIES[0]);

  const [apiRows] = useApiData(`/api/provinces?commodity=${commodity}`, null);
  const liveProvinces = apiRows
    ? apiRows.map(r => ({ name: r.Province, price: r.Forecasted_Price, mom: 0 }))
    : MO_PROVINCES;

  return (
    <>
      <TopBar />
      <h1 style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 38, color: COLORS.accentDeep, margin: "14px 0 18px" }}>Market Overview</h1>

      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 20 }}>
        <span style={{ fontFamily: "Sarabun, sans-serif", fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8, color: COLORS.sub, textTransform: "uppercase" }}>
          Commodity
        </span>
        <PillSwitcher options={COMMODITIES} value={commodity} onChange={setCommodity} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 20, alignItems: "start" }}>
        <div style={{ background: COLORS.cardBg, borderRadius: 14, padding: "18px 20px" }}>
          <div style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 24, color: COLORS.accentDeep, marginBottom: 4, borderBottom: "1px solid rgba(18,35,63,0.12)", paddingBottom: 10 }}>
            Regional Retail Price Map
          </div>
          <div style={{ marginTop: 12, background: COLORS.white, borderRadius: 10, padding: 10 }}>
            <ChoroplethMap provinces={liveProvinces} />
          </div>
          <div style={{ marginTop: 14, fontFamily: "Sarabun, sans-serif", fontSize: 10.5, fontWeight: 700, letterSpacing: 0.6, color: COLORS.sub, textTransform: "uppercase" }}>
            Price heatmap legend (PHP/kg)
          </div>
          <div style={{ height: 8, borderRadius: 4, margin: "6px 0", background: `linear-gradient(90deg, ${priceColor(PRICE_DOMAIN[0])}, ${priceColor(PRICE_DOMAIN[1])})` }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Sarabun, sans-serif", fontSize: 12.5, color: COLORS.ink }}>
            <span>Low ({PRICE_DOMAIN[0]})</span>
            <span>High ({PRICE_DOMAIN[1]})</span>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 24, color: COLORS.accentDeep, marginBottom: 10 }}>Province Ranking</div>
          <Leaderboard rows={liveProvinces} />
          <VolatilityBars />
        </div>
      </div>
    </>
  );
}