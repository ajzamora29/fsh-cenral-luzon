// src/pages/PricePredictions.jsx
import React, { useState } from "react";
import { COLORS } from "../utils/colors";
import { useApiData } from "../hooks/useApiData";
import TopBar from "../components/common/TopBar";
import ForecastChart from "../components/charts/ForecastChart";
import CalendarView from "../components/charts/CalendarView";
import { PillSwitcher } from "../components/common/AlertPill";

export default function PricePredictions({ goTo }) {
  const [province, setProvince] = useState("Aurora");
  const [commodity, setCommodity] = useState("Alumahan");

  const [commodities] = useApiData("/api/commodities", [
    "Alumahan", "Bangus", "Galunggong (Imported)", "Galunggong (Local)", "Tilapia"
  ]);
  const [provinces] = useApiData("/api/provinces/list", [
    "Aurora", "Bataan", "Bulacan", "Nueva Ecija", "Pampanga", "Regional", "Tarlac", "Zambales"
  ]);
  const [forecastData, , forecastLoading] = useApiData(
    `/api/forecast/${province}/${commodity}`,
    [],
    {}
  );
  const [historicalData, , historicalLoading] = useApiData(
    `/api/historical/${province}/${commodity}`,
    [],
    {}
  );

  const isLoading = forecastLoading || historicalLoading;

  return (
    <>
      <TopBar />
      <h1 style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 38, color: COLORS.accentDeep, margin: "14px 0 18px" }}>
        Price Predictions
      </h1>

      {/* Filter Section - Clean and Simple */}
      <div style={{ 
        display: "flex", 
        gap: 24, 
        flexWrap: "wrap", 
        marginBottom: 24,
        padding: "18px 22px",
        background: COLORS.white,
        borderRadius: 14,
        boxShadow: "0 1px 2px rgba(18,35,63,0.05)",
        alignItems: "flex-end"
      }}>
        {/* Province Selector */}
        <div style={{ minWidth: 200 }}>
          <label style={{ fontFamily: "Sarabun, sans-serif", fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8, color: COLORS.sub, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
            Province
          </label>
          <select
            value={province}
            onChange={e => setProvince(e.target.value)}
            style={{
              appearance: "none",
              background: COLORS.cardBg,
              border: "none",
              borderRadius: 9,
              padding: "10px 34px 10px 14px",
              fontFamily: "Sarabun, sans-serif",
              fontSize: 14,
              color: COLORS.ink,
              cursor: "pointer",
              width: "100%",
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C7291' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              backgroundSize: 16
            }}
          >
            {provinces.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Commodity Pills */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <label style={{ fontFamily: "Sarabun, sans-serif", fontSize: 10.5, fontWeight: 700, letterSpacing: 0.8, color: COLORS.sub, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
            Commodity
          </label>
          <PillSwitcher 
            options={commodities}
            value={commodity}
            onChange={setCommodity}
          />
        </div>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: COLORS.white, borderRadius: 14 }}>
          <div style={{ fontFamily: "Sarabun, sans-serif", color: COLORS.sub }}>Loading forecast data...</div>
        </div>
      ) : (
        <>
          <div style={{ background: COLORS.white, borderRadius: 14, padding: "18px 22px", marginBottom: 20, boxShadow: "0 1px 2px rgba(18,35,63,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 22, color: COLORS.accentDeep }}>
                12-Month Price Forecast
              </div>
              <div style={{ fontFamily: "Sarabun, sans-serif", fontSize: 13, color: COLORS.sub }}>
                {province} · {commodity}
              </div>
            </div>
            <ForecastChart data={forecastData} historicalData={historicalData} />
          </div>

          <div style={{ background: COLORS.white, borderRadius: 14, padding: "18px 22px", boxShadow: "0 1px 2px rgba(18,35,63,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 22, color: COLORS.accentDeep }}>
                Price Calendar
              </div>
              <div style={{ display: "flex", gap: 16, fontFamily: "Sarabun, sans-serif", fontSize: 12, color: COLORS.sub }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "inline-block", width: 12, height: 4, borderRadius: 2, background: COLORS.green }} /> Low
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "inline-block", width: 12, height: 4, borderRadius: 2, background: COLORS.accentDeep }} /> High
                </span>
              </div>
            </div>
            <CalendarView data={forecastData} province={province} commodity={commodity} />
          </div>
        </>
      )}
    </>
  );
}