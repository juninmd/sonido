import { useId } from "react";
import { cx } from "../../utils/cx";
import "../Checkbox/Checkbox.css";
import "./RadioGroup.css";

export interface RadioOption<K extends string> {
  value: K;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps<K extends string> {
  label: string;
  options: RadioOption<K>[];
  value: K;
  onChange: (value: K) => void;
  /** `list` = rádios clássicos; `cards` = opções em cartão. */
  variant?: "list" | "cards";
  className?: string;
}

/** Grupo de rádio nativo (setas funcionam sozinhas). */
export function RadioGroup<K extends string>({
  label,
  options,
  value,
  onChange,
  variant = "list",
  className,
}: RadioGroupProps<K>) {
  const name = useId();
  return (
    <fieldset className={cx("sn-radio-group", `sn-radio-group--${variant}`, className)}>
      <legend className="sn-radio-group__legend">{label}</legend>
      {options.map((o) => (
        <label key={o.value} className="sn-radio" data-checked={value === o.value || undefined}>
          <input
            type="radio"
            className="sn-radio__input"
            name={name}
            value={o.value}
            checked={value === o.value}
            disabled={o.disabled}
            onChange={() => onChange(o.value)}
          />
          <span className="sn-radio__dot" aria-hidden />
          <span className="sn-radio__text">
            <span className="sn-radio__label">{o.label}</span>
            {o.description && <span className="sn-radio__desc">{o.description}</span>}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
