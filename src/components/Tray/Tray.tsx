import { type ReactNode, useEffect, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import { formatBytes } from "../../utils/format";
import "./Tray.css";

export interface TrayItem {
  id: string;
  label: string;
  value: number;
  /** Cor CSS da marca do item. */
  color?: string;
}

export interface TrayProps {
  items: TrayItem[];
  /** Título acima do total. */
  title?: string;
  /** Formata valores e total (padrão: bytes). */
  formatValue?: (value: number) => string;
  /** Tira um item da bandeja. */
  onRemove?: (id: string) => void;
  /** Ação única para tudo o que está na bandeja. */
  onConfirm?: () => void;
  /** Texto do botão; recebe a quantidade. */
  confirmLabel?: (count: number) => string;
  /** Texto quando a bandeja está vazia. */
  empty?: ReactNode;
  /** Tom do botão de confirmar. */
  tone?: "danger" | "accent";
  className?: string;
}

/**
 * Bandeja (faxina "Órbita"): junta itens marcados em qualquer lugar da tela, mostra o total e
 * confirma tudo com um botão só. É alvo do `flyTo()` e pulsa quando chega item novo.
 */
export function Tray({
  items,
  title = "Selecionados",
  formatValue = formatBytes,
  onRemove,
  onConfirm,
  confirmLabel = (n) => `Confirmar ${n} ${n === 1 ? "item" : "itens"}`,
  empty = "Nada marcado ainda",
  tone = "danger",
  className,
}: TrayProps) {
  const total = items.reduce((a, c) => a + c.value, 0);
  const prev = useRef(items.length);
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    if (items.length > prev.current) setPulse((p) => p + 1);
    prev.current = items.length;
  }, [items.length]);

  return (
    <aside className={cx("sn-tray", className)} data-sn-fly-target="" aria-label={title}>
      <span className="sn-tray__title">{title}</span>
      <strong key={pulse} className={cx("sn-tray__total", pulse > 0 && "sn-tray__total--bump")} aria-live="polite">
        {formatValue(total)}
      </strong>
      {items.length ? (
        <ul className="sn-tray__list">
          {items.map((it) => (
            <li key={it.id} className="sn-tray__item">
              <span className="sn-tray__dot" style={{ background: it.color ?? "var(--sn-color-accent-2)" }} />
              <span className="sn-tray__label">{it.label}</span>
              <span className="sn-tray__value">{formatValue(it.value)}</span>
              {onRemove && (
                <button
                  type="button"
                  className="sn-tray__remove"
                  onClick={() => onRemove(it.id)}
                  aria-label={`Tirar ${it.label}`}
                >
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="sn-tray__empty">{empty}</p>
      )}
      {onConfirm && (
        <button
          type="button"
          className={cx("sn-tray__confirm", `sn-tray__confirm--${tone}`)}
          onClick={onConfirm}
          disabled={!items.length}
        >
          {confirmLabel(items.length)}
        </button>
      )}
    </aside>
  );
}
