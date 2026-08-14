import * as d3 from "d3";
import { PRICE_DOMAIN, MO_PROVINCES, PROPERTY_NAME_KEYS } from "./data";

export function priceColor(price) {
  const t = Math.max(0, Math.min(1, (price - PRICE_DOMAIN[0]) / (PRICE_DOMAIN[1] - PRICE_DOMAIN[0])));
  return d3.interpolateRgb("#C9DCF2", "#12305C")(t);
}

export function findProvinceName(props) {
  if (!props) return null;
  
  console.log('🔍 Finding province name in:', props);
  
  for (const k of PROPERTY_NAME_KEYS) {
    if (typeof props[k] === "string" && props[k].trim()) {
      const name = props[k].trim();
      console.log(`✅ Found province name: "${k}" = "${name}"`);
      return name;
    }
  }
  
  console.log('❌ No province name found in properties:', Object.keys(props));
  return null;
}

export function matchProvince(rawName, list) {
  if (!rawName) return null;
  
  const listToUse = list || MO_PROVINCES;
  
  console.log(`🔍 Matching "${rawName}" against:`, listToUse.map(p => p.name));
  
  // Clean the raw name
  const cleanName = rawName.toLowerCase()
    .replace(/\bcity of\b|\bprovince of\b/g, "")
    .replace(/\([^)]*\)/g, "") // Remove anything in parentheses
    .trim();
  
  console.log(`📝 Cleaned name: "${cleanName}"`);
  
  // Try different matching strategies
  let match = null;
  
  // 1. Exact match (case insensitive)
  match = listToUse.find(p => p.name.toLowerCase() === cleanName);
  if (match) {
    console.log(`✅ Exact match found: "${match.name}"`);
    return match;
  }
  
  // 2. GeoJSON name contains data name
  match = listToUse.find(p => cleanName.includes(p.name.toLowerCase()));
  if (match) {
    console.log(`✅ Contains match: "${match.name}" in "${rawName}"`);
    return match;
  }
  
  // 3. Data name contains GeoJSON name
  match = listToUse.find(p => p.name.toLowerCase().includes(cleanName));
  if (match) {
    console.log(`✅ Reverse contains match: "${match.name}" contains "${cleanName}"`);
    return match;
  }
  
  // 4. Try removing common prefixes/suffixes
  const variations = [
    cleanName.replace(/^province of\s*/i, ""),
    cleanName.replace(/\s*province$/i, ""),
    cleanName.replace(/^province\s*/i, "")
  ];
  
  for (const variant of variations) {
    if (variant !== cleanName) {
      match = listToUse.find(p => p.name.toLowerCase() === variant);
      if (match) {
        console.log(`✅ Variation match: "${match.name}" from "${variant}"`);
        return match;
      }
    }
  }
  
  console.log(`❌ No match found for "${rawName}"`);
  return null;
}