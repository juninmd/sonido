import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import "./FilterChips.css";

export interface Chip<K extends string> {
  key: K;
  label: string;
  count?: number;
  /** Ícone decorativo antes do rótulo. */
  icon?: ReactNode;
}

export interface FilterChipsProps<K extends string> {
  chips: Chip<K>[];
  /** Chave ativa; `null` = todos. */
  value: K | null;
  onChange: (value: K | null) => void;
  /** Rótulo acessível do grupo. */
  label: string;
  /** Texto do chip "todos". Omitido = sem chip "todos". */
  allLabel?: string;
  allCount?: number;
  className?: string;
}

/** Grupo de filtros com `aria-pressed`. Clicar no ativo desliga o filtro. */
export function FilterChips<K extends string>({
  chips,
  value,
  onChange,
  label,
  allLabel,
  allCount,
  className,
}: FilterChipsProps<K>) {
  return (
    <fieldset className={cx("sn-chips", className)}>
      <legend className="sn-visually-hidden">{label}</legend>
      {allLabel && (
        <ChipButton active={value === null} onClick={() => onChange(null)} label={allLabel} count={allCount} />
      )}
      {chips.map((c) => (
        <ChipButton
          key={c.key}
          active={value === c.key}
          onClick={() => onChange(value === c.key ? null : c.key)}
          label={c.label}
          count={c.count}
          icon={c.icon}
        />
      ))}
    </fieldset>
  );
}

function ChipButton({
  active,
  onClick,
  label,
  count,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
  icon?: ReactNode;
}) {
  return (
    <button type="button" className="sn-chip" aria-pressed={active} onClick={onClick}>
      {icon && (
        <span className="sn-chip__icon" aria-hidden>
          {icon}
        </span>
      )}
      {label}
      {count != null && <span className="sn-chip__count">{count}</span>}
    </button>
  );
}
