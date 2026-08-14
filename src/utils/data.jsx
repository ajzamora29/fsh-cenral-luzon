// src/utils/data.jsx
/* Region III province retail prices (₱/kg) -- feeds both the
   choropleth map and the leaderboard on Market Overview. */
export const MO_PROVINCES = [
  { name: "Aurora", price: 220.0, mom: 5.2 },
  { name: "Zambales", price: 210.5, mom: 3.1 },
  { name: "Bataan", price: 205.0, mom: 0.5 },
  { name: "Nueva Ecija", price: 198.0, mom: -0.3 },
  { name: "Bulacan", price: 195.25, mom: -1.2 },
  { name: "Pampanga", price: 190.0, mom: -2.0 },
  { name: "Tarlac", price: 182.0, mom: -2.6 }
];

// Leaderboard - top 5 provinces
export const MO_LEADERBOARD = MO_PROVINCES.slice(0, 5);

// Price domain for color scaling
export const PRICE_DOMAIN = [170, 230];

// Make sure PROPERTY_NAME_KEYS has adm2_en first
export const PROPERTY_NAME_KEYS = [
  "adm2_en",      // ← Your GeoJSON uses this
  "ADM2_EN",
  "name",
  "NAME",
  "PROVINCE", 
  "province",
  "prov_name",
  "Name",
  "NAME_2"
];

// GeoJSON sources
export const CANDIDATE_GEOJSON_URLS = [
  "https://cdn.jsdelivr.net/gh/faeldon/philippines-json-maps@master/2023/geojson/provdists/lowres/provdists-region-030000000.0.001.json",
  "https://cdn.jsdelivr.net/gh/faeldon/philippines-json-maps@master/2023/geojson/provdists/lowres/provdists-region-300000000.0.001.json"
];

// Commodities list
export const COMMODITIES = ["Bangus", "Tilapia", "Alumahan", "Galunggong (Local)", "Galunggong (Imported)"];

// Volatility data
export const VOLATILITY_COMMODITIES = [
  { label: "Comm A", value: 42, color: "#1F5FA8" },
  { label: "Comm B", value: 58, color: "#3A4453" },
  { label: "Comm C", value: 88, color: "#C23B2E" },
  { label: "Comm D", value: 55, color: "#3A4453" },
  { label: "Comm E", value: 38, color: "#1F5FA8" }
];

// Navigation items
export const NAV_DASHBOARDS = [
  { key: "home", label: "Executive Home", icon: "grid" },
  { key: "market", label: "Market Overview", icon: "chart" },
  { key: "predictions", label: "Price Predictions", icon: "trend" }
];

export const NAV_ACTIONS = [
  { key: "import", label: "Import Data", icon: "upload" },
  { key: "export", label: "Export Report", icon: "download" },
  { key: "settings", label: "Settings", icon: "settings" }
];

export const PAGE_TITLES = {
  predictions: {
    title: "Price Predictions",
    note: "This is where the SARIMA forecasts, 12-month seasonality risk calendar, and substitute-gap analysis will live."
  },
  import: {
    title: "Import Data",
    note: "Data-import workflow placeholder — send the design for this screen to wire it up."
  },
  export: {
    title: "Export Report",
    note: "Report-export workflow placeholder — send the design for this screen to wire it up."
  },
  settings: {
    title: "Settings",
    note: "Settings screen placeholder — send the design for this screen to wire it up."
  }
};