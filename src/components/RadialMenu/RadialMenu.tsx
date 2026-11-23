import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./RadialMenu.css";

export interface RadialItem {
  key: string;
  label: string;
  icon: ReactNode;
  tone?: "accent" | "violet" | "aqua" | "gold" | "success" | "danger" | "info";
  active?: boolean;
  onSelect: () => void;
}

export interface RadialMenuProps {
  items: RadialItem[];
  open: boolean;
  onClose: () => void;
  /** Centro do menu (o botão que abre). */
  hub: ReactNode;
  radius?: number;
  label?: string;
  className?: string;
}

/**
 * Menu radial do mika (NeuralWheel): nós de vidro num círculo, ligados ao centro por linhas finas,
 * entrada em mola girando. Setas giram o foco, Enter escolhe, Esc fecha.
 */
export function RadialMenu({
  items,
  open,
  onClose,
  hub,
  radius = 120,
  label = "Ações rápidas",
  className,
}: RadialMenuProps) {
  const [focus, setFocus] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    if (open) refs.current[focus]?.focus();
  }, [open, focus]);
  const size = radius * 2 + 80;
  const c = size / 2;
  return (
    <div
      className={cx("sn-radial", className)}
      style={{ "--sn-rad-size": `${size}px` } as CSSProperties}
      data-open={open || undefined}
    >
      {open && <div className="sn-radial__scrim" onPointerDown={onClose} />}
      {open && (
        <div
          className="sn-radial__wheel"
          role="menu"
          aria-label={label}
          tabIndex={-1}
          onKeyDown={(e) => {
            const n = items.length;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") setFocus((f) => (f + 1) % n);
            else if (e.key === "ArrowLeft" || e.key === "ArrowUp") setFocus((f) => (f + n - 1) % n);
            else if (e.key === "Escape") onClose();
            else return;
            e.preventDefault();
          }}
        >
          <svg className="sn-radial__lines" viewBox={`0 0 ${size} ${size}`} aria-hidden>
            {items.map((it, i) => {
              const a = (i / items.length) * 2 * Math.PI - Math.PI / 2;
              return <line key={it.key} x1={c} y1={c} x2={c + Math.cos(a) * radius} y2={c + Math.sin(a) * radius} />;
            })}
          </svg>
          {items.map((it, i) => {
            const a = (i / items.length) * 2 * Math.PI - Math.PI / 2;
            return (
              <button
                key={it.key}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                role="menuitem"
                tabIndex={i === focus ? 0 : -1}
                className="sn-radial__node"
                data-tone={it.tone ?? "accent"}
                data-active={it.active || undefined}
                style={
                  { "--x": `${Math.cos(a) * radius}px`, "--y": `${Math.sin(a) * radius}px`, "--i": i } as CSSProperties
                }
                onClick={() => {
                  it.onSelect();
                  onClose();
                }}
                onFocus={() => setFocus(i)}
              >
                {it.icon}
                <span className="sn-radial__label">{it.label}</span>
              </button>
            );
          })}
        </div>
      )}
      <div className="sn-radial__hub">{hub}</div>
    </div>
  );
}
