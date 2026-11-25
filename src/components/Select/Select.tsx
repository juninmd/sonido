import { type SelectHTMLAttributes, useId } from "react";
import { cx } from "../../utils/cx";
import "../TextField/TextField.css";
import "./Select.css";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  /** Versão compacta (32px) para uso em linha, como o status num card. */
  compact?: boolean;
  /** Esconde o rótulo visualmente; ele continua lido por leitores de tela. */
  hideLabel?: boolean;
}

/** `<select>` nativo estilizado: acessível e bom no celular. */
export function Select({
  label,
  options,
  value,
  onChange,
  hint,
  compact,
  hideLabel,
  className,
  id,
  ...rest
}: SelectProps) {
  const auto = useId();
  const sid = id ?? auto;
  return (
    <div className={cx("sn-field", compact && "sn-field--compact", className)}>
      <label htmlFor={sid} className={hideLabel ? "sn-visually-hidden" : "sn-field__label"}>
        {label}
      </label>
      <div className="sn-field__box sn-select">
        <select
          id={sid}
          className="sn-field__control sn-select__control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={hint ? `${sid}-msg` : undefined}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg className="sn-select__chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
          <path
            d="m6 9 6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {hint && (
        <p id={`${sid}-msg`} className="sn-field__msg">
          {hint}
        </p>
      )}
    </div>
  );
}
