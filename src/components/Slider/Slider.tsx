import { type CSSProperties, useId } from "react";
import { cx } from "../../utils/cx";
import "./Slider.css";

export interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  format?: (n: number) => string;
  disabled?: boolean;
  className?: string;
}

/** `<input type="range">` com trilho em gradiente e valor ao vivo. */
export function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  format = String,
  disabled,
  className,
}: SliderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={cx("sn-slider", className)} style={{ "--sn-pct": `${pct}%` } as CSSProperties}>
      <div className="sn-slider__meta">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id} className="sn-slider__value">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="sn-slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-valuetext={format(value)}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
