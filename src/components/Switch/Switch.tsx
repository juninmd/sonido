import { type InputHTMLAttributes, useId } from "react";
import { cx } from "../../utils/cx";
import "./Switch.css";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

/** Interruptor liga/desliga sobre `<input type="checkbox" role="switch">`. */
export function Switch({ checked, onChange, label, description, className, id, ...rest }: SwitchProps) {
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <label htmlFor={inputId} className={cx("sn-switch", className)}>
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        aria-checked={checked}
        className="sn-switch__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
      <span className="sn-switch__track" aria-hidden>
        <span className="sn-switch__thumb" />
      </span>
      <span className="sn-switch__text">
        <span className="sn-switch__label">{label}</span>
        {description && <span className="sn-switch__desc">{description}</span>}
      </span>
    </label>
  );
}
