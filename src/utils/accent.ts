import type { CSSProperties } from "react";

/**
 * Acento por seção (accentVars do mika): passe um matiz HSL e a área inteira troca o coral
 * por essa cor — botões, anéis, chips e foco seguem juntos.
 */
export function accentStyle(hue: number, saturation = 85, lightness = 62): CSSProperties {
  const c = `hsl(${hue} ${saturation}% ${lightness}%)`;
  return {
    "--sn-color-accent": c,
    "--sn-color-accent-2": `hsl(${(hue + 40) % 360} ${saturation}% ${lightness}%)`,
    "--sn-gradient": `linear-gradient(135deg, hsl(${hue} ${saturation}% ${lightness - 12}%), hsl(${(hue + 40) % 360} ${saturation}% ${lightness - 16}%))`,
    "--sn-ring": `0 0 0 4px hsl(${hue} ${saturation}% ${lightness}% / 0.35)`,
    "--sn-shadow-glow": `0 0 24px hsl(${hue} ${saturation}% ${lightness}% / 0.35)`,
  } as CSSProperties;
}
