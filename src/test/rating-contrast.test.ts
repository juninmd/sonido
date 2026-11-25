import { describe, expect, it } from "vitest";
import ratingCss from "../components/Rating/Rating.css?raw";
import tokens from "../tokens/tokens.css?raw";

// Token values per theme block (`:root` is the default theme).
function themes(): Map<string, Record<string, string>> {
  const out = new Map<string, Record<string, string>>();
  for (const [, selector, body] of tokens.matchAll(/^([:.][\w-]+)\s*\{([^}]*)\}/gm)) {
    const vars = out.get(selector) ?? {};
    for (const [, k, v] of body.matchAll(/--sn-color-([\w-]+):\s*(#[0-9a-f]{6})\b/gi)) vars[k] = v;
    out.set(selector, vars);
  }
  return out;
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe("Rating empty star", () => {
  const rule = ratingCss.match(/\.sn-star__empty\s*\{([^}]*)\}/)?.[1] ?? "";
  const outline = rule.match(/stroke:\s*var\(--sn-color-([\w-]+)\)/)?.[1];

  it("is outlined with a theme token", () => {
    expect(outline).toBeDefined();
  });

  // WCAG 1.4.11: an unfilled star is the only cue for the score, so it needs 3:1 on every surface.
  it.each([...themes()].filter(([, v]) => v.surface))("keeps 3:1 contrast in %s", (_, vars) => {
    const root = themes().get(":root") ?? {};
    const color = vars[outline ?? ""] ?? root[outline ?? ""];
    for (const bg of ["bg", "surface", "surface-2"]) {
      expect(contrast(color, vars[bg]), `${outline} on ${bg}`).toBeGreaterThanOrEqual(3);
    }
  });
});
