import { type KeyboardEvent, type ReactNode, useRef } from "react";
import { cx } from "../../utils/cx";
import "./SubTabs.css";

export interface SubTabItem<K extends string> {
  key: K;
  label: string;
  icon?: ReactNode;
  /** Contador curto no fim da aba. Não entra no nome acessível. */
  badge?: number;
  /** `hot` para o que acabou de chegar (laranja), `info` para contagem neutra. */
  tone?: "hot" | "info";
}

export interface SubTabsProps<K extends string> {
  /** Rótulo acessível do tablist. */
  label: string;
  items: SubTabItem<K>[];
  value: K;
  onChange: (key: K) => void;
  /** Abas dividem a largura disponível, para um controle colado nas bordas. */
  dense?: boolean;
  /** Só o ícone fica visível até a seleção; o rótulo continua sendo o nome da aba. */
  iconsOnly?: boolean;
  className?: string;
}

const STEP: Record<string, (i: number, n: number) => number> = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
};

/**
 * O controle segmentado pequeno que fica sob o cabeçalho de uma aba (Status, GitHub, Steam).
 * Porte fiel do `SubTabs` do canto-widget: uma pílula compacta com ícone, contador e foco itinerante.
 */
export function SubTabs<K extends string>({
  label,
  items,
  value,
  onChange,
  dense = false,
  iconsOnly = false,
  className,
}: SubTabsProps<K>) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  // Um valor desconhecido deixaria o tablist sem parada de Tab; a primeira aba assume.
  const stop = Math.max(
    0,
    items.findIndex((item) => item.key === value),
  );

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = STEP[e.key];
    if (!step || items.length === 0) return;
    e.preventDefault();
    const next = step(stop, items.length);
    refs.current[next]?.focus();
    if (items[next].key !== value) onChange(items[next].key);
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cx("sn-subtabs", dense && "sn-subtabs--dense", className)}
    >
      {items.map((item, i) => {
        const selected = item.key === value;
        return (
          <button
            key={item.key}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={i === stop ? 0 : -1}
            title={iconsOnly && item.icon ? item.label : undefined}
            className="sn-subtab"
            onClick={() => onChange(item.key)}
          >
            {item.icon && <span className="sn-subtab__icon">{item.icon}</span>}
            <span className={cx("sn-subtab__label", iconsOnly && !selected && "sn-visually-hidden")}>{item.label}</span>
            {!!item.badge && (
              <span
                aria-hidden="true"
                className={cx(
                  "sn-subtab__badge",
                  item.tone === "hot" ? "sn-subtab__badge--hot" : "sn-subtab__badge--info",
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
