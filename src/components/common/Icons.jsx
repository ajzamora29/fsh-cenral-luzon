// src/components/common/Icons.jsx
import React from "react";
import { COLORS } from "../../utils/colors";

export function FishLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <circle cx="15" cy="15" r="15" fill="#FFFFFF" />
      <path
        d="M8 15c2.5-3 5.5-4.5 9-4.5 2 0 3.7.6 5 1.6l1.6-1.6-.4 3 .4 3-1.6-1.6c-1.3 1-3 1.6-5 1.6-3.5 0-6.5-1.5-9-4.5z"
        fill={COLORS.accentDeep}
      />
      <circle cx="19.5" cy="14" r="0.8" fill="#FFFFFF" />
    </svg>
  );
}

export function IconCalendar() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={COLORS.sub} strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

export function IconMegaphone() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={COLORS.amberIcon} aria-hidden="true">
      <path d="M3 10v4a1 1 0 001 1h2l5 4V5l-5 4H4a1 1 0 00-1 1z" />
      <path d="M15 8a4 4 0 010 8" stroke={COLORS.amberIcon} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IconArrowUp({ color }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function IconArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconWarning() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C97A00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l10 18H2L12 3zM12 10v4M12 17h.01" />
    </svg>
  );
}

export function IconBell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.accentDeep} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" />
    </svg>
  );
}

export function IconUserCircle() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={COLORS.accentDeep} strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3.2" />
      <path d="M5.5 19.2a7.5 7.5 0 0113 0" />
    </svg>
  );
}

export function IconUpload() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function IconDownload() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4v12M7 11l5 5 5-5M4 20h16" />
    </svg>
  );
}

export function NavIcon({ name }) {
  const s = { width: 17, height: 17, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "grid":
      return <svg {...s} viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
    case "chart":
      return <svg {...s} viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V10M12 20V4M20 20v-7" /></svg>;
    case "trend":
      return <svg {...s} viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></svg>;
    case "upload":
      return <svg {...s} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M4 20h16" /></svg>;
    case "download":
      return <svg {...s} viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12M7 11l5 5 5-5M4 20h16" /></svg>;
    case "settings":
      return <svg {...s} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.9-2.9l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.6V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.6 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.6 1z" /></svg>;
    case "logout":
      return <svg {...s} viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></svg>;
    default:
      return null;
  }
}