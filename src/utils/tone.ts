/** Vocabulário comum da prop `tone` (ver AGENTS.md). */
export type Tone = "accent" | "violet" | "aqua" | "gold" | "success" | "warning" | "danger" | "info" | "neutral";

const TONE_VAR: Record<Tone, string> = {
  accent: "var(--sn-color-accent)",
  violet: "var(--sn-color-accent-2)",
  aqua: "var(--sn-color-aqua)",
  gold: "var(--sn-color-gold)",
  success: "var(--sn-color-success)",
  warning: "var(--sn-color-warning)",
  danger: "var(--sn-color-danger)",
  info: "var(--sn-color-info)",
  neutral: "var(--sn-color-text)",
};

/** Token CSS da cor de um tom, ex.: `toneVar("aqua")` → `var(--sn-color-aqua)`. */
export const toneVar = (tone: Tone) => TONE_VAR[tone];
