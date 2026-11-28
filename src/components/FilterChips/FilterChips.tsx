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

interface BaseProps<K extends string> {
  chips: Chip<K>[];
  /** Rótulo acessível do grupo. */
  label: string;
  /** Texto do chip "todos". Omitido = sem chip "todos". */
  allLabel?: string;
  allCount?: number;
  className?: string;
}

export type FilterChipsProps<K extends string> =
  | (BaseProps<K> & {
      multiple?: false;
      /** Chave ativa; `null` = todos. */
      value: K | null;
      onChange: (value: K | null) => void;
      values?: never;
      onChangeValues?: never;
    })
  | (BaseProps<K> & {
      /** Vários filtros ligados ao mesmo tempo. */
      multiple: true;
      /** Chaves ativas; vazio = todos. */
      values: readonly K[];
      onChangeValues: (values: K[]) => void;
      value?: never;
      onChange?: never;
    });

/**
 * Grupo de filtros com `aria-pressed`. No modo simples, clicar no ativo desliga o filtro;
 * no modo `multiple`, cada chip liga/desliga sozinho e "todos" limpa a seleção.
 */
export function FilterChips<K extends string>(props: FilterChipsProps<K>) {
  const { chips, label, allLabel, allCount, className } = props;
  if (props.multiple) {
    const selected = props.values;
    const toggle = (key: K) => {
      const next = selected.includes(key) ? selected.filter((v) => v !== key) : [...selected, key];
      props.onChangeValues(next);
    };
    return (
      <fieldset className={cx("sn-chips", className)}>
        <legend className="sn-visually-hidden">{label}</legend>
        {allLabel && (
          <ChipButton
            active={selected.length === 0}
            onClick={() => props.onChangeValues([])}
            label={allLabel}
            count={allCount}
          />
        )}
        {chips.map((c) => (
          <ChipButton
            key={c.key}
            active={selected.includes(c.key)}
            onClick={() => toggle(c.key)}
            label={c.label}
            count={c.count}
            icon={c.icon}
          />
        ))}
      </fieldset>
    );
  }
  return (
    <fieldset className={cx("sn-chips", className)}>
      <legend className="sn-visually-hidden">{label}</legend>
      {allLabel && (
        <ChipButton
          active={props.value === null}
          onClick={() => props.onChange(null)}
          label={allLabel}
          count={allCount}
        />
      )}
      {chips.map((c) => (
        <ChipButton
          key={c.key}
          active={props.value === c.key}
          onClick={() => props.onChange(props.value === c.key ? null : c.key)}
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
