import { cx } from "../../utils/cx";
import "./Breadcrumb.css";

export interface Crumb {
  label: string;
  href?: string;
  onClick?: () => void;
}

/** Trilha de navegação. O último item é a página atual. */
export function Breadcrumb({
  items,
  className,
  label = "Você está em",
}: {
  items: Crumb[];
  className?: string;
  label?: string;
}) {
  return (
    <nav aria-label={label} className={cx("sn-breadcrumb", className)}>
      <ol>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: rótulos podem repetir; a ordem é fixa
            <li key={`${c.label}-${i}`}>
              {last ? (
                <span aria-current="page">{c.label}</span>
              ) : c.href ? (
                <a href={c.href} onClick={c.onClick}>
                  {c.label}
                </a>
              ) : (
                <button type="button" onClick={c.onClick}>
                  {c.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
