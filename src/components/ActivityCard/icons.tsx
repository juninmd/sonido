import type { ReactNode } from "react";

const svg = (children: ReactNode, size = 20) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    {children}
  </svg>
);

/** Ícones internos dos cards de atividade (traço cheio, legíveis em 20px). */
export const ActivityIcons = {
  play: (s?: number) =>
    svg(<path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />, s),
  pause: (s?: number) =>
    svg(
      <>
        <rect x="6" y="5" width="4" height="14" rx="1.2" />
        <rect x="14" y="5" width="4" height="14" rx="1.2" />
      </>,
      s,
    ),
  prev: (s?: number) =>
    svg(
      <path d="M11 6.5v11a.8.8 0 0 1-1.3.6L3 12.6a.8.8 0 0 1 0-1.2l6.7-5.5A.8.8 0 0 1 11 6.5zm10 0v11a.8.8 0 0 1-1.3.6L13 12.6a.8.8 0 0 1 0-1.2l6.7-5.5a.8.8 0 0 1 1.3.6z" />,
      s,
    ),
  next: (s?: number) =>
    svg(
      <path d="M13 6.5v11a.8.8 0 0 0 1.3.6l6.7-5.5a.8.8 0 0 0 0-1.2l-6.7-5.5a.8.8 0 0 0-1.3.6zm-10 0v11a.8.8 0 0 0 1.3.6l6.7-5.5a.8.8 0 0 0 0-1.2L4.3 5.9A.8.8 0 0 0 3 6.5z" />,
      s,
    ),
  close: (s?: number) =>
    svg(<path d="M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z" />, s),
  phone: (s?: number) =>
    svg(
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />,
      s,
    ),
  hangup: (s?: number) =>
    svg(
      <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1a1 1 0 0 1-.56.9 11.5 11.5 0 0 0-2.66 1.85 1 1 0 0 1-1.4 0L.3 13.1a1 1 0 0 1 0-1.4A16.9 16.9 0 0 1 12 7c4.6 0 8.75 1.8 11.7 4.7a1 1 0 0 1 0 1.4l-2.48 2.48a1 1 0 0 1-1.4 0 11.3 11.3 0 0 0-2.67-1.85 1 1 0 0 1-.56-.9v-3.1A15 15 0 0 0 12 9z" />,
      s,
    ),
  video: (s?: number) =>
    svg(
      <path d="M4 6h10a2 2 0 0 1 2 2v1.6l3.4-2.3a1 1 0 0 1 1.6.8v7.8a1 1 0 0 1-1.6.8L16 14.4V16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />,
      s,
    ),
  stop: (s?: number) => svg(<rect x="6" y="6" width="12" height="12" rx="2.5" />, s),
  cast: (s?: number) =>
    svg(
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-6v-2h5V7H4v2H2V6a1 1 0 0 1 1-1zm-1 6a9 9 0 0 1 9 9H9a7 7 0 0 0-7-7zm0 4a5 5 0 0 1 5 5H5a3 3 0 0 0-3-3zm0 4a1 1 0 0 1 1 1H2z" />,
      s,
    ),
};

export type Maneuver = "straight" | "left" | "right" | "slight-left" | "slight-right" | "uturn";

const TURN: Record<Maneuver, string> = {
  straight: "M12 21V5M6 11l6-6 6 6",
  right: "M5 21v-7a4 4 0 0 1 4-4h11M15 5l5 5-5 5",
  left: "M19 21v-7a4 4 0 0 0-4-4H4M9 5 4 10l5 5",
  "slight-right": "M8 21v-6c0-2 1-3.5 2.5-4.8L17 5M11 5h6v6",
  "slight-left": "M16 21v-6c0-2-1-3.5-2.5-4.8L7 5M13 5H7v6",
  uturn: "M8 21V9a5 5 0 0 1 10 0v4M14 10l4 4 4-4",
};

export function TurnArrow({ maneuver, size = 40 }: { maneuver: Maneuver; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={TURN[maneuver]} />
    </svg>
  );
}
