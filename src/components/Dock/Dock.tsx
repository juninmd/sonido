import { type PointerEvent, type ReactNode, useEffect, useRef } from "react";
import { cx } from "../../utils/cx";
import { useReducedMotion } from "../../utils/useReducedMotion";
import "./Dock.css";

export interface DockItem<K extends string> {
  key: K;
  label: string;
  icon: ReactNode;
  count?: number;
  /** Inicia um novo grupo (separador antes). */
  group?: boolean;
}

export interface DockProps<K extends string> {
  items: DockItem<K>[];
  value: K;
  onChange: (value: K) => void;
  label?: string;
  /** Teclas 1–9 trocam de item (fora de campos de texto). */
  shortcuts?: boolean;
  /** `fixed` flutua no rodapé da viewport; `inline` fica no fluxo. */
  position?: "fixed" | "inline";
  className?: string;
}

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));

/** Dock flutuante que amplia sob o ponteiro, estilo macOS (games-gallery). */
export function Dock<K extends string>({
  items,
  value,
  onChange,
  label = "Navegação principal",
  shortcuts = true,
  position = "fixed",
  className,
}: DockProps<K>) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!shortcuts) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target) || document.querySelector("dialog[open]")) return;
      const item = items[Number(e.key) - 1];
      if (!item) return;
      e.preventDefault();
      onChange(item.key);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items, onChange, shortcuts]);

  const magnify = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || reduced) return;
    for (const b of ref.current?.querySelectorAll<HTMLElement>(".sn-dock__item") ?? []) {
      const r = b.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      b.style.setProperty("--s", Math.max(1, 1.45 - d / 150).toFixed(3));
    }
  };
  const settle = () => {
    for (const b of ref.current?.querySelectorAll<HTMLElement>(".sn-dock__item") ?? []) b.style.setProperty("--s", "1");
  };

  return (
    <div className={cx("sn-dock-wrap", `sn-dock-wrap--${position}`, className)}>
      <nav ref={ref} className="sn-dock" aria-label={label} onPointerMove={magnify} onPointerLeave={settle}>
        {items.map((it, i) => (
          <span key={it.key} className="sn-dock__slot">
            {it.group && i > 0 && <span className="sn-dock__sep" aria-hidden />}
            <button
              type="button"
              className="sn-dock__item"
              aria-label={shortcuts && i < 9 ? `${it.label} (tecla ${i + 1})` : it.label}
              aria-current={it.key === value ? "page" : undefined}
              onClick={() => onChange(it.key)}
            >
              <span className="sn-dock__icon">{it.icon}</span>
              {it.count ? <span className="sn-dock__count">{it.count > 99 ? "99+" : it.count}</span> : null}
              <span className="sn-dock__label" aria-hidden>
                {it.label}
                {shortcuts && i < 9 && <kbd>{i + 1}</kbd>}
              </span>
            </button>
          </span>
        ))}
      </nav>
    </div>
  );
}
