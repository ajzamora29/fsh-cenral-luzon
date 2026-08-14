import React from "react";

export default function UnderwaterScene() {
  return (
    <svg
      viewBox="0 0 1200 260"
      preserveAspectRatio="none"
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, width: "100%", height: 260, zIndex: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BFE6F2" stopOpacity="0" />
          <stop offset="100%" stopColor="#8FD0E6" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1200" height="260" fill="url(#sea)" />
      <circle cx="1080" cy="60" r="30" fill="#FFFFFF" opacity="0.35" />
      <circle cx="1080" cy="60" r="16" fill="#FFFFFF" opacity="0.45" />
      {[[130, 190], [420, 230], [760, 170], [960, 210]].map(([cx, cy], i) => (
        <g key={i} opacity="0.28" fill="#3A6E8F">
          <ellipse cx={cx} cy={cy} rx="26" ry="12" />
          <path d={`M${cx + 24} ${cy} l14 -9 v18 z`} />
          <circle cx={cx - 15} cy={cy - 2} r="1.6" fill="#E9F6FB" />
        </g>
      ))}
      {[[70, 250], [300, 245], [560, 255], [860, 245], [1120, 250]].map(([cx, cy], i) => (
        <path key={i} d={`M${cx} ${cy} q6 -30 0 -55 q14 6 20 30 q4 20 -6 34 q-8 -3 -14 -9z`} fill="#2F5E7C" opacity="0.32" />
      ))}
    </svg>
  );
}
