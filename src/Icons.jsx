import React from "react";

// Simple outline icons (24x24, drawn with currentColor so CSS can colour them).
const PATHS = {
  orders: ["M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2z", "M9 8h6M9 12h6"],
  catalogue: ["M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10", "M17 21V3c-2.5 1.5-3 4.5-3 8h3"],
  qr: ["M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z", "M14 14h2v2h-2zM19 14h1M14 19h2v1M20 18v2"],
  payments: ["M3 6h18v12H3z", "M3 10h18M7 15h3"],
  reports: ["M4 20V10M10 20V4M16 20v-8M21 20H3"],
  team: [
    "M16 20v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
    "M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7",
    "M20 20v-2a4 4 0 0 0-3-3.8M15.5 3.3a3.5 3.5 0 0 1 0 6.4",
  ],
  settings: [
    "M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1",
    "M13 6a2 2 0 1 0 4 0 2 2 0 1 0-4 0M7 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M15 18a2 2 0 1 0 4 0 2 2 0 1 0-4 0",
  ],
  bell: ["M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z", "M10 21h4"],
  bellOff: ["M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z", "M10 21h4M3 3l18 18"],
  search: ["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z", "M20 20l-4-4"],
  more: ["M5 12h.01M12 12h.01M19 12h.01"],
  logout: ["M10 5H5v14h5", "M14 8l4 4-4 4M18 12H9"],
  pin: ["M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z", "M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"],
};

export function Icon({ name, size = 20 }) {
  return (
    <svg
      className="bd-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === "more" ? 3 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {(PATHS[name] || []).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
