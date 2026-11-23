/** Tokens em JS, espelhando tokens.css. Use em CSS-in-JS, gráficos ou testes. */
export const color = {
  bg: "var(--sn-color-bg)",
  surface: "var(--sn-color-surface)",
  surface2: "var(--sn-color-surface-2)",
  surfaceHover: "var(--sn-color-surface-hover)",
  border: "var(--sn-color-border)",
  text: "var(--sn-color-text)",
  textDim: "var(--sn-color-text-dim)",
  textFaint: "var(--sn-color-text-faint)",
  accent: "var(--sn-color-accent)",
  accent2: "var(--sn-color-accent-2)",
  aqua: "var(--sn-color-aqua)",
  gold: "var(--sn-color-gold)",
  success: "var(--sn-color-success)",
  warning: "var(--sn-color-warning)",
  danger: "var(--sn-color-danger)",
  info: "var(--sn-color-info)",
} as const;

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 24, 6: 40 } as const;
export const radius = { sm: 8, md: 14, lg: 20, pill: 999 } as const;
export const duration = { fast: 140, base: 220, slow: 420 } as const;
export const easing = {
  standard: "cubic-bezier(0.22, 1, 0.36, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

/** Valores crus do tema escuro (padrão), úteis para docs e canvas. */
export const palette = {
  dark: {
    bg: "#0a0b12",
    surface: "#12141f",
    accent: "#ff3d6e",
    accent2: "#7c5cff",
    aqua: "#3fe3d3",
    gold: "#f5b73d",
    text: "#f1f2f8",
  },
  light: {
    bg: "#eeedf6",
    surface: "#ffffff",
    accent: "#c81e45",
    accent2: "#5b3fd9",
    aqua: "#0b766c",
    gold: "#8f5c12",
    text: "#14122b",
  },
} as const;

export type ColorToken = keyof typeof color;
