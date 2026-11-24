import { type InputHTMLAttributes, useEffect, useId, useRef } from "react";
import { cx } from "../../utils/cx";
import "./Checkbox.css";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  /** Estado misto (ex.: "selecionar todos" parcial). */
  indeterminate?: boolean;
}

/** Caixa de seleção com traço animado. Use quando a escolha precisa de "Salvar". */
export function Checkbox({
  checked,
  onChange,
  label,
  description,
  indeterminate,
  className,
  id,
  ...rest
}: CheckboxProps) {
  const auto = useId();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  return (
    <label htmlFor={id ?? auto} className={cx("sn-check", className)}>
      <input
        ref={ref}
        id={id ?? auto}
        type="checkbox"
        className="sn-check__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
      <span className="sn-check__box" aria-hidden>
        <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14">
          {indeterminate ? (
            <path d="M4 8h8" className="sn-check__mark" />
          ) : (
            <path d="m3.5 8.5 3 3 6-7" className="sn-check__mark" />
          )}
        </svg>
      </span>
      <span className="sn-check__text">
        <span className="sn-check__label">{label}</span>
        {description && <span className="sn-check__desc">{description}</span>}
      </span>
    </label>
  );
}
