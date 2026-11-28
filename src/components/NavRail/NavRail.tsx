import { type MouseEvent, type ReactNode, useId, useState } from "react";
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
  /** O título vira um botão que recolhe o grupo. */
  collapsible?: boolean;
  /** Estado inicial do grupo recolhível. Padrão: aberto. */
  defaultOpen?: boolean;
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
        <NavGroupBlock key={gi} group={g} value={value} onChange={onChange} compact={compact} />
      ))}
    </nav>
  );
}

function NavGroupBlock<K extends string>({
  group,
  value,
  onChange,
  compact,
}: {
  group: NavGroup<K>;
  value: K;
  onChange: (value: K) => void;
  compact: boolean;
}) {
  const listId = useId();
  const [open, setOpen] = useState(group.defaultOpen ?? true);
  const collapsible = group.collapsible && !compact && Boolean(group.title);
  const expanded = !collapsible || open;

  return (
    <div className="sn-navrail__group">
      {group.title &&
        (collapsible ? (
          <button
            type="button"
            className="sn-navrail__title sn-navrail__title--toggle"
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen((v) => !v)}
          >
            <span>{group.title}</span>
            <span className="sn-navrail__chevron" data-open={open || undefined} aria-hidden />
          </button>
        ) : (
          <p className="sn-navrail__title">{group.title}</p>
        ))}
      <div id={listId} className="sn-navrail__items" hidden={!expanded}>
        {group.items.map((it) => {
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
    </div>
  );
}
