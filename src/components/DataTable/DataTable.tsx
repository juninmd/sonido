import { type ReactNode, useMemo, useState } from "react";
import { cx } from "../../utils/cx";
import "./DataTable.css";

export interface Column<T> {
  key: string;
  label: string;
  align?: "start" | "end" | "center";
  render: (row: T) => ReactNode;
  /** Valor para ordenação. Ausente = coluna não ordenável. */
  sort?: (row: T) => string | number;
}

export interface DataTableProps<T> {
  /** Legenda acessível da tabela. */
  label: string;
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  className?: string;
}

type Dir = "ascending" | "descending";

/** Tabela com cabeçalho fixo e ordenação por coluna (`aria-sort`). */
export function DataTable<T>({ label, columns, rows, rowKey, onRowClick, className }: DataTableProps<T>) {
  const [sort, setSort] = useState<{ key: string; dir: Dir } | null>(null);

  const sorted = useMemo(() => {
    const col = sort && columns.find((c) => c.key === sort.key);
    if (!col?.sort || !sort) return rows;
    const get = col.sort;
    const m = sort.dir === "ascending" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const x = get(a);
      const y = get(b);
      return (x < y ? -1 : x > y ? 1 : 0) * m;
    });
  }, [rows, columns, sort]);

  const cycle = (key: string) =>
    setSort((s) =>
      s?.key !== key ? { key, dir: "ascending" } : s.dir === "ascending" ? { key, dir: "descending" } : null,
    );

  return (
    <div className={cx("sn-table-wrap", className)}>
      <table className="sn-table">
        <caption className="sn-visually-hidden">{label}</caption>
        <thead>
          <tr>
            {columns.map((c) => {
              const active = sort?.key === c.key;
              return (
                <th
                  key={c.key}
                  scope="col"
                  className={cx(`sn-table__cell--${c.align ?? "start"}`)}
                  aria-sort={active ? sort?.dir : c.sort ? "none" : undefined}
                >
                  {c.sort ? (
                    <button type="button" className="sn-table__sort" onClick={() => cycle(c.key)}>
                      {c.label}
                      <span className="sn-table__arrow" data-dir={active ? sort?.dir : undefined} aria-hidden />
                    </button>
                  ) : (
                    c.label
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr
              key={rowKey(r)}
              className={onRowClick ? "sn-table__row--click" : undefined}
              onClick={onRowClick ? () => onRowClick(r) : undefined}
            >
              {columns.map((c) => (
                <td key={c.key} className={`sn-table__cell--${c.align ?? "start"}`}>
                  {c.render(r)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
