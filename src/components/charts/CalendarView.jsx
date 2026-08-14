// src/components/charts/CalendarView.jsx
import React from "react";
import { COLORS } from "../../utils/colors";
import * as d3 from "d3";

export default function CalendarView({ data, province, commodity }) {
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "40px 20px",
        fontFamily: "Sarabun, sans-serif",
        color: COLORS.sub
      }}>
        No forecast data available for {province} - {commodity}
      </div>
    );
  }

  const months = data.map(d => ({
    month: new Date(d.Forecast_Date).toLocaleString('default', { month: 'long' }),
    year: new Date(d.Forecast_Date).getFullYear(),
    price: d.Forecasted_Price,
    date: new Date(d.Forecast_Date)
  }));

  // Find min and max for color scaling
  const prices = months.map(m => m.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = maxPrice - minPrice || 1;

  const getColor = (price) => {
    const t = (price - minPrice) / range;
    return d3.interpolateRgb("#C9DCF2", "#12305C")(t);
  };

  return (
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(3, 1fr)", 
      gap: 12,
      padding: "12px 0"
    }}>
      {months.map((m, i) => {
        const color = getColor(m.price);
        const isHighest = m.price === maxPrice;
        const isLowest = m.price === minPrice;
        
        return (
          <div
            key={i}
            style={{
              background: COLORS.white,
              borderRadius: 10,
              padding: "16px 14px",
              border: `1px solid ${color}`,
              borderLeft: `4px solid ${color}`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
            }}
          >
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "start",
              marginBottom: 8
            }}>
              <div>
                <div style={{ 
                  fontFamily: "'Jersey 25', sans-serif", 
                  fontSize: 18, 
                  color: COLORS.accentDeep,
                  lineHeight: 1.2
                }}>
                  {m.month.slice(0, 3)}
                </div>
                <div style={{ 
                  fontFamily: "Sarabun, sans-serif", 
                  fontSize: 11, 
                  color: COLORS.sub 
                }}>
                  {m.year}
                </div>
              </div>
              {isHighest && (
                <span style={{
                  background: COLORS.red,
                  color: COLORS.white,
                  fontSize: 9,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 999,
                  fontFamily: "Sarabun, sans-serif"
                }}>
                  HIGH
                </span>
              )}
              {isLowest && (
                <span style={{
                  background: COLORS.green,
                  color: COLORS.white,
                  fontSize: 9,
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: 999,
                  fontFamily: "Sarabun, sans-serif"
                }}>
                  LOW
                </span>
              )}
            </div>
            <div style={{ 
              fontFamily: "'Jersey 25', sans-serif", 
              fontSize: 24, 
              color: COLORS.ink
            }}>
              ₱{m.price.toFixed(2)}
            </div>
            <div style={{ 
              width: "100%", 
              height: 4, 
              marginTop: 10,
              borderRadius: 2,
              background: color,
              transition: "opacity 0.3s ease"
            }} />
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between",
              marginTop: 6,
              fontFamily: "Sarabun, sans-serif",
              fontSize: 10,
              color: COLORS.sub
            }}>
              <span>Week {Math.ceil(new Date(m.date).getDate() / 7)}</span>
              <span>Day {new Date(m.date).getDate()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}