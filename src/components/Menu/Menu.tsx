import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./Menu.css";

export interface MenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  /** Separador antes deste item. */
  separator?: boolean;
  onSelect: () => void;
}

export interface MenuProps {
  /** Conteúdo do botão gatilho. */
  trigger: ReactNode;
  /** Rótulo acessível do gatilho, se ele for só ícone. */
  triggerLabel?: string;
  items: MenuItem[];
  align?: "start" | "end";
  className?: string;
}

/** Menu suspenso (padrão WAI-ARIA menu button): setas, Home/End, Esc e clique fora fecham. */
export function Menu({ trigger, triggerLabel, items, align = "start", className }: MenuProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const id = useId();
  const enabled = items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0);

  useEffect(() => {
    if (!open) return;
    const off = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", off);
    return () => document.removeEventListener("pointerdown", off);
  }, [open]);

  useEffect(() => {
    if (open) list.current?.querySelectorAll<HTMLElement>("[role=menuitem]")[active]?.focus();
  }, [open, active]);

  const openAt = (i: number) => {
    setActive(i);
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    btn.current?.focus();
  };
  const move = (d: number) => {
    const pos = enabled.indexOf(active);
    setActive(enabled[(pos + d + enabled.length) % enabled.length]);
  };
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, () => void> = {
      ArrowDown: () => move(1),
      ArrowUp: () => move(-1),
      Home: () => setActive(enabled[0]),
      End: () => setActive(enabled[enabled.length - 1]),
      Escape: close,
      Tab: () => setOpen(false),
    };
    const fn = map[e.key];
    if (!fn) return;
    if (e.key !== "Tab") e.preventDefault();
    fn();
  };

  return (
    <div ref={root} className={cx("sn-menu", `sn-menu--${align}`, className)}>
      <button
        ref={btn}
        type="button"
        className="sn-menu__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={id}
        aria-label={triggerLabel}
        onClick={() => (open ? setOpen(false) : openAt(enabled[0] ?? 0))}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            openAt(e.key === "ArrowDown" ? enabled[0] : enabled[enabled.length - 1]);
          }
        }}
      >
        {trigger}
      </button>
      {open && (
        <div ref={list} id={id} role="menu" className="sn-menu__list" onKeyDown={onKey}>
          {items.map((it, i) => (
            <div key={it.key} role="none">
              {it.separator && <hr className="sn-menu__sep" />}
              <button
                type="button"
                role="menuitem"
                tabIndex={i === active ? 0 : -1}
                disabled={it.disabled}
                className={cx("sn-menu__item", it.danger && "sn-menu__item--danger")}
                onPointerMove={() => !it.disabled && setActive(i)}
                onClick={() => {
                  close();
                  it.onSelect();
                }}
              >
                {it.icon && <span className="sn-menu__icon">{it.icon}</span>}
                <span className="sn-menu__label">{it.label}</span>
                {it.shortcut && <kbd className="sn-menu__kbd">{it.shortcut}</kbd>}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
