import { type KeyboardEvent, type ReactNode, useRef } from "react";
import { cx } from "../../utils/cx";
import "./Tabs.css";

export interface TabItem<K extends string> {
  key: K;
  label: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

export interface TabsProps<K extends string> {
  items: TabItem<K>[];
  value: K;
  onChange: (value: K) => void;
  /** Rótulo acessível do tablist. */
  label: string;
  /** `underline` = abas clássicas; `pill` = controle segmentado (games-gallery). */
  variant?: "underline" | "pill";
  /** Prefixo dos ids, para ligar a `aria-controls` dos painéis. */
  idPrefix?: string;
  /** Há painéis com id `${idPrefix}-panel-${key}`: liga `aria-controls`. */
  hasPanels?: boolean;
  className?: string;
}

const STEP: Record<string, (i: number, n: number) => number> = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
};

/** Tablist WAI-ARIA com foco itinerante (setas, Home, End). */
export function Tabs<K extends string>({
  items,
  value,
  onChange,
  label,
  variant = "underline",
  idPrefix = "sn-tab",
  hasPanels = false,
  className,
}: TabsProps<K>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = Math.max(
    0,
    items.findIndex((t) => t.key === value),
  );

  const key = (e: KeyboardEvent) => {
    const step = STEP[e.key];
    if (!step) return;
    e.preventDefault();
    const next = step(current, items.length);
    onChange(items[next].key);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className={cx("sn-tabs", `sn-tabs--${variant}`, className)} onKeyDown={key}>
      {items.map((t, i) => {
        const selected = i === current;
        return (
          <button
            key={t.key}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${idPrefix}-${t.key}`}
            aria-selected={selected}
            aria-controls={hasPanels ? `${idPrefix}-panel-${t.key}` : undefined}
            tabIndex={selected ? 0 : -1}
            className="sn-tab"
            onClick={() => onChange(t.key)}
          >
            {t.icon}
            <span>{t.label}</span>
            {t.badge != null && <span className="sn-tab__badge">{t.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}
