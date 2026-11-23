import { type MouseEvent, useState } from "react";
import { cx } from "../../utils/cx";
import { useReducedMotion } from "../../utils/useReducedMotion";
import { Menu } from "../Menu";
import "./ThemeSwitcher.css";

export interface ThemeOption {
  id: string;
  label: string;
  /** Três cores para a amostra: fundo, superfície, destaque. */
  swatch: [string, string, string];
}

/** Os temas que vêm no Sonido. */
export const SONIDO_THEMES: ThemeOption[] = [
  { id: "dark", label: "Sonido escuro", swatch: ["#0a0b12", "#171a28", "#ff3d6e"] },
  { id: "light", label: "Sonido claro", swatch: ["#eeedf6", "#ffffff", "#c81e45"] },
  { id: "hueco-mundo", label: "Hueco Mundo", swatch: ["#050506", "#ede9e0", "#e11d48"] },
  { id: "canto", label: "Canto", swatch: ["#0b0f16", "#111826", "#4ade80"] },
  { id: "canto-claro", label: "Canto claro", swatch: ["#f1f5f9", "#ffffff", "#166534"] },
  { id: "dracula", label: "Drácula", swatch: ["#21222c", "#44475a", "#bd93f9"] },
  { id: "glass", label: "Glass", swatch: ["#0c1017", "#273142", "#0a84ff"] },
  { id: "aurora", label: "Aurora", swatch: ["#0c0a1e", "#2f2866", "#ff7ad9"] },
];

export interface ThemeSwitcherProps {
  value: string;
  onChange: (id: string) => void;
  themes?: ThemeOption[];
  /** Onde aplicar `data-theme`. Padrão: `<html>`. */
  target?: () => HTMLElement;
  className?: string;
}

/**
 * Troca de tema com "lavada" circular a partir do clique (ai-session-monitor).
 * Aplica `data-theme` e chama `onChange`; a lavada some com reduced-motion.
 */
export function ThemeSwitcher({ value, onChange, themes = SONIDO_THEMES, target, className }: ThemeSwitcherProps) {
  const reduced = useReducedMotion();
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const current = themes.find((t) => t.id === value) ?? themes[0];

  const apply = (id: string) => {
    const el = target?.() ?? document.documentElement;
    if (!reduced) {
      const wash = document.createElement("div");
      wash.className = "sn-theme-wash";
      wash.style.setProperty("--x", `${origin.x}px`);
      wash.style.setProperty("--y", `${origin.y}px`);
      el.setAttribute("data-theme", id);
      wash.style.background = getComputedStyle(el).getPropertyValue("--sn-color-bg");
      document.body.appendChild(wash);
      wash.addEventListener("animationend", () => wash.remove());
    } else {
      el.setAttribute("data-theme", id);
    }
    onChange(id);
  };

  return (
    <div
      className={cx("sn-theme-switcher", className)}
      onPointerDownCapture={(e: MouseEvent) => setOrigin({ x: e.clientX, y: e.clientY })}
    >
      <Menu
        align="end"
        triggerLabel={`Tema: ${current.label}`}
        trigger={
          <>
            <Swatch colors={current.swatch} />
            <span>{current.label}</span>
          </>
        }
        items={themes.map((t) => ({
          key: t.id,
          label: t.label,
          icon: <Swatch colors={t.swatch} />,
          shortcut: t.id === value ? "✓" : undefined,
          onSelect: () => apply(t.id),
        }))}
      />
    </div>
  );
}

function Swatch({ colors }: { colors: [string, string, string] }) {
  return (
    <span className="sn-swatch" aria-hidden>
      {colors.map((c) => (
        <i key={c} style={{ background: c }} />
      ))}
    </span>
  );
}
