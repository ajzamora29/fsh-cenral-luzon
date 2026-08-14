// src/pages/ExportReport.jsx
import React, { useState } from "react";
import { COLORS } from "../utils/colors";
import { useApiData } from "../hooks/useApiData";
import TopBar from "../components/common/TopBar";

export default function ExportReport({ goTo }) {
  const [exportFormat, setExportFormat] = useState("csv");
  const [reportType, setReportType] = useState("forecast");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [selectedCommodity, setSelectedCommodity] = useState("all");
  const [isExporting, setIsExporting] = useState(false);

  const [commodities] = useApiData("/api/commodities", []);
  const [provinces] = useApiData("/api/provinces/list", []);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      let url = `http://localhost:8000/api/export?format=${exportFormat}&type=${reportType}`;
      if (selectedProvince !== "all") url += `&province=${selectedProvince}`;
      if (selectedCommodity !== "all") url += `&commodity=${selectedCommodity}`;

      const response = await fetch(url);
      
      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `report_${reportType}_${new Date().toISOString().slice(0,10)}.${exportFormat === "csv" ? "csv" : "xlsx"}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        alert("Export failed. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please ensure the backend is running.");
    }

    setIsExporting(false);
  };

  return (
    <>
      <TopBar />
      <div style={{ maxWidth: 800, margin: "14px auto 0" }}>
        <h1 style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 38, color: COLORS.accentDeep, margin: "0 0 12px" }}>
          Export Report
        </h1>
        <p style={{ fontFamily: "Sarabun, sans-serif", fontSize: 14.5, color: COLORS.sub, marginBottom: 24 }}>
          Download price data, forecasts, or model metrics in CSV or Excel format.
        </p>

        <div style={{ background: COLORS.white, borderRadius: 14, padding: "32px", boxShadow: "0 1px 2px rgba(18,35,63,0.05)" }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontFamily: "Sarabun, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.6, color: COLORS.sub, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Report Type
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              {["forecast", "historical", "metrics"].map(type => (
                <button
                  key={type}
                  onClick={() => setReportType(type)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 9,
                    border: `1.5px solid ${reportType === type ? COLORS.accent : "#CBD8E6"}`,
                    background: reportType === type ? COLORS.accent : "transparent",
                    color: reportType === type ? COLORS.white : COLORS.sub,
                    fontFamily: "Sarabun, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontFamily: "Sarabun, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.6, color: COLORS.sub, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Province
              </label>
              <select
                value={selectedProvince}
                onChange={e => setSelectedProvince(e.target.value)}
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
                <option value="all">All Provinces</option>
                {provinces.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontFamily: "Sarabun, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.6, color: COLORS.sub, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                Commodity
              </label>
              <select
                value={selectedCommodity}
                onChange={e => setSelectedCommodity(e.target.value)}
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
                <option value="all">All Commodities</option>
                {commodities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontFamily: "Sarabun, sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 0.6, color: COLORS.sub, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
              Export Format
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              {["csv", "xlsx"].map(format => (
                <button
                  key={format}
                  onClick={() => setExportFormat(format)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 9,
                    border: `1.5px solid ${exportFormat === format ? COLORS.accent : "#CBD8E6"}`,
                    background: exportFormat === format ? COLORS.accent : "transparent",
                    color: exportFormat === format ? COLORS.white : COLORS.sub,
                    fontFamily: "Sarabun, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            style={{
              width: "100%",
              padding: "14px",
              background: `linear-gradient(90deg, ${COLORS.accentDeep}, ${COLORS.accent})`,
              color: COLORS.white,
              border: "none",
              borderRadius: 9,
              fontFamily: "Sarabun, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              cursor: isExporting ? "not-allowed" : "pointer",
              opacity: isExporting ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              transition: "opacity 0.2s ease"
            }}
          >
            {isExporting ? "Exporting..." : "↓ Download Report"}
          </button>
        </div>

        <button
          onClick={() => goTo("home")}
          style={{
            marginTop: 18,
            background: "transparent",
            border: `1.5px solid ${COLORS.accent}`,
            color: COLORS.accentDeep,
            borderRadius: 9,
            padding: "9px 16px",
            fontFamily: "Sarabun, sans-serif",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          ← Back to Executive Home
        </button>
      </div>
    </>
  );
}