// src/components/charts/ChoroplethMap.jsx
import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { COLORS } from "../../utils/colors";
import { MO_PROVINCES } from "../../utils/data";
import { priceColor, findProvinceName, matchProvince } from "../../utils/helpers";

export default function ChoroplethMap({ provinces }) {
  const list = provinces && provinces.length ? provinces : MO_PROVINCES;
  const [geo, setGeo] = useState(null);
  const [status, setStatus] = useState("loading");
  const ref = useRef(null);

  useEffect(() => {
    let cancelled = false;
    
    const loadGeoJSON = async () => {
      try {
        const response = await fetch('/geojson/region-3.json');
        if (!response.ok) throw new Error('GeoJSON not found');
        
        const data = await response.json();
        if (!cancelled && data.features && data.features.length > 0) {
          console.log('✅ GeoJSON loaded!', data.features.length, 'features found');
          
          // ===== FIX: Reverse winding order manually =====
          const fixedData = {
            ...data,
            features: data.features.map(feature => {
              const fixedFeature = { ...feature };
              
              if (feature.geometry.type === 'Polygon') {
                // Reverse each ring of the polygon
                fixedFeature.geometry = {
                  ...feature.geometry,
                  coordinates: feature.geometry.coordinates.map(ring => 
                    ring.slice().reverse()
                  )
                };
              } else if (feature.geometry.type === 'MultiPolygon') {
                // Reverse each polygon's rings
                fixedFeature.geometry = {
                  ...feature.geometry,
                  coordinates: feature.geometry.coordinates.map(polygon =>
                    polygon.map(ring => ring.slice().reverse())
                  )
                };
              }
              
              return fixedFeature;
            })
          };
          
          console.log('✅ Winding order fixed');
          setGeo(fixedData);
          setStatus("ok");
        } else {
          setStatus("fallback");
        }
      } catch (error) {
        console.error('❌ Error loading GeoJSON:', error);
        if (!cancelled) setStatus("fallback");
      }
    };

    loadGeoJSON();
    return () => { cancelled = true; };
  }, []);

  // Loading state
  if (status === "loading") {
    return (
      <div style={{ height: 340, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sarabun, sans-serif", fontSize: 13, color: COLORS.sub }}>
        Loading province boundaries...
      </div>
    );
  }

  // Fallback state
  if (status === "fallback" || !geo) {
    const fallbackPos = {
      Bulacan: [60, 72], Pampanga: [44, 55], "Nueva Ecija": [66, 36],
      Tarlac: [44, 20], Bataan: [20, 66], Zambales: [15, 30], Aurora: [86, 30]
    };
    return (
      <div style={{ position: "relative", width: "100%", height: 340, background: "#EAF3FC", borderRadius: 10 }}>
        <svg viewBox="0 0 100 90" style={{ width: "100%", height: "100%" }}>
          {list.map(p => {
            const pos = fallbackPos[p.name];
            if (!pos) return null;
            const [x, y] = pos;
            return (
              <g key={p.name}>
                <circle cx={x} cy={y} r={6} fill={priceColor(p.price)} />
                <text x={x} y={y - 9} textAnchor="middle" fontSize="4" fontFamily="Sarabun" fill={COLORS.ink} fontWeight="600">{p.name}</text>
              </g>
            );
          })}
        </svg>
        <div style={{ position: "absolute", bottom: 8, left: 10, fontFamily: "Sarabun, sans-serif", fontSize: 10.5, color: COLORS.sub }}>
          Province boundaries unavailable — showing schematic positions.
        </div>
      </div>
    );
  }

  if (!geo.features || geo.features.length === 0) {
    return (
      <div style={{ height: 340, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sarabun, sans-serif", fontSize: 13, color: COLORS.sub }}>
        No map data available
      </div>
    );
  }

  // Projection
  const projection = d3.geoMercator()
    .fitSize([100, 90], geo);
  
  const path = d3.geoPath(projection);
  
  return (
    <div style={{ width: "100%", height: 340, background: "#EAF3FC", borderRadius: 10, overflow: "hidden", position: "relative" }}>
      <svg 
        viewBox="0 0 100 90" 
        ref={ref} 
        style={{ 
          width: "100%", 
          height: "100%",
          display: "block",
        }} 
        role="img" 
        aria-label="Choropleth map of Region III provinces colored by retail price"
      >
        <rect x="0" y="0" width="100" height="90" fill="#EAF3FC" rx="10" />
        
        {geo.features.map((f, i) => {
          const provinceName = findProvinceName(f.properties);
          const match = matchProvince(provinceName, list);
          const fillColor = match ? priceColor(match.price) : "#DCE7F5";
          
          return (
            <path
              key={i}
              d={path(f)}
              fill={fillColor}
              stroke="#FFFFFF"
              strokeWidth={0.8}
              strokeLinejoin="round"
            >
              {match && <title>{`${match.name}: ₱${match.price.toFixed(2)}/kg`}</title>}
            </path>
          );
        })}
      </svg>
    </div>
  );
}