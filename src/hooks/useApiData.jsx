// src/hooks/useApiData.jsx
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:8000";

export function useApiData(endpoint, fallback, params = {}) {
  const [data, setData] = useState(fallback);
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    
    // Build query string from params
    const queryString = Object.keys(params)
      .filter(key => params[key] != null && params[key] !== '')
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    
    const url = API_BASE + endpoint + (queryString ? `?${queryString}` : '');
    
    fetch(url)
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(json => {
        if (!cancelled) {
          setData(json);
          setIsLive(true);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoading(false);
          // Keep fallback data
        }
      });
    return () => { cancelled = true; };
  }, [endpoint, JSON.stringify(params)]);

  return [data, isLive, loading];
}

export default useApiData;