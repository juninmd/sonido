import { cx } from "../../utils/cx";
import "./Pagination.css";

export interface PaginationProps {
  page: number;
  pages: number;
  onChange: (page: number) => void;
  /** Páginas vizinhas visíveis de cada lado. */
  siblings?: number;
  label?: string;
  className?: string;
}

/** Lista de páginas com reticências: 1 … 4 5 [6] 7 8 … 20. */
export function pageRange(page: number, pages: number, siblings = 1): Array<number | "…"> {
  const out: Array<number | "…"> = [];
  const start = Math.max(2, page - siblings);
  const end = Math.min(pages - 1, page + siblings);
  out.push(1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < pages - 1) out.push("…");
  if (pages > 1) out.push(pages);
  return out;
}

/** Paginação acessível com anterior/próxima e página atual em `aria-current`. */
export function Pagination({ page, pages, onChange, siblings = 1, label = "Paginação", className }: PaginationProps) {
  return (
    <nav aria-label={label} className={cx("sn-pagination", className)}>
      <button
        type="button"
        className="sn-pagination__btn"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Página anterior"
      >
        ‹
      </button>
      {pageRange(page, pages, siblings).map((p, i) =>
        p === "…" ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: reticências sem identidade
          <span key={`e${i}`} className="sn-pagination__gap" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className="sn-pagination__btn"
            aria-current={p === page ? "page" : undefined}
            aria-label={`Página ${p}`}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        className="sn-pagination__btn"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        aria-label="Próxima página"
      >
        ›
      </button>
    </nav>
  );
}
