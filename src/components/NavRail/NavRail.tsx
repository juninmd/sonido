import type { MouseEvent, ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./NavRail.css";

export interface NavItem<K extends string> {
  key: K;
  label: string;
  icon: ReactNode;
  badge?: ReactNode;
  /** Vira `<a href>`: o clique ainda chama `onChange`, sem `preventDefault`, então nova aba e clique do meio funcionam. */
  href?: string;
}

export interface NavGroup<K extends string> {
  title?: string;
  items: NavItem<K>[];
}

export interface NavRailProps<K extends string> {
  groups: NavGroup<K>[];
  value: K;
  onChange: (value: K) => void;
  /** Marca no topo. */
  brand?: ReactNode;
  /** Só ícones (88px). */
  compact?: boolean;
  label?: string;
  className?: string;
}

/** Menu lateral agrupado por intenção, com indicador em gradiente (nerd-watch). */
export function NavRail<K extends string>({
  groups,
  value,
  onChange,
  brand,
  compact = false,
  label = "Menu",
  className,
}: NavRailProps<K>) {
  return (
    <nav aria-label={label} className={cx("sn-navrail", compact && "sn-navrail--compact", className)}>
      {brand && <div className="sn-navrail__brand">{brand}</div>}
      {groups.map((g, gi) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: grupos em ordem fixa
        <div key={gi} className="sn-navrail__group">
          {g.title && <p className="sn-navrail__title">{g.title}</p>}
          {g.items.map((it) => {
            const props = {
              className: "sn-navrail__link",
              "aria-current": it.key === value ? ("page" as const) : undefined,
              "aria-label": compact ? it.label : undefined,
              title: compact ? it.label : undefined,
              onClick: (e: MouseEvent) => {
                // Clique com modificador abre nova aba: a tela atual não muda.
                if (it.href && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)) return;
                onChange(it.key);
              },
            };
            const content = (
              <>
                <span className="sn-navrail__icon">{it.icon}</span>
                <span className="sn-navrail__label">{it.label}</span>
                {it.badge != null && <span className="sn-navrail__badge">{it.badge}</span>}
              </>
            );
            return it.href != null ? (
              <a key={it.key} href={it.href} {...props}>
                {content}
              </a>
            ) : (
              <button key={it.key} type="button" {...props}>
                {content}
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
