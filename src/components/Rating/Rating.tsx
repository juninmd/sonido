import { useState } from "react";
import { cx } from "../../utils/cx";
import "./Rating.css";

export interface RatingProps {
  value: number;
  max?: number;
  /** Sem `onChange` = somente leitura. */
  onChange?: (value: number) => void;
  label: string;
  size?: number;
  className?: string;
}

const STAR = "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z";

/** Avaliação em estrelas (gold = avaliação). Interativa como radiogroup. */
export function Rating({ value, max = 5, onChange, label, size = 20, className }: RatingProps) {
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? value;
  if (!onChange) {
    return (
      <span className={cx("sn-rating", className)} role="img" aria-label={`${label}: ${value} de ${max}`}>
        {Array.from({ length: max }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: estrelas fixas
          <Star key={i} fill={Math.min(1, Math.max(0, value - i))} size={size} />
        ))}
      </span>
    );
  }
  return (
    <span
      role="radiogroup"
      aria-label={label}
      className={cx("sn-rating sn-rating--input", className)}
      onPointerLeave={() => setHover(null)}
    >
      {Array.from({ length: max }, (_, i) => (
        <button
          // biome-ignore lint/suspicious/noArrayIndexKey: estrelas fixas
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i + 1}
          aria-label={`${i + 1} de ${max}`}
          tabIndex={value === i + 1 || (value === 0 && i === 0) ? 0 : -1}
          onPointerEnter={() => setHover(i + 1)}
          onClick={() => onChange(i + 1)}
          onKeyDown={(e) => {
            const d =
              e.key === "ArrowRight" || e.key === "ArrowUp"
                ? 1
                : e.key === "ArrowLeft" || e.key === "ArrowDown"
                  ? -1
                  : 0;
            if (!d) return;
            e.preventDefault();
            const n = Math.min(max, Math.max(1, value + d));
            onChange(n);
            (e.currentTarget.parentElement?.children[n - 1] as HTMLElement | undefined)?.focus();
          }}
        >
          <Star fill={shown >= i + 1 ? 1 : 0} size={size} />
        </button>
      ))}
    </span>
  );
}

function Star({ fill, size }: { fill: number; size: number }) {
  return (
    <svg className="sn-star" width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path d={STAR} className="sn-star__empty" />
      <path d={STAR} className="sn-star__full" style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }} />
    </svg>
  );
}
