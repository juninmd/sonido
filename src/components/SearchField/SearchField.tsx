import { type InputHTMLAttributes, type KeyboardEvent, useId } from "react";
import { cx } from "../../utils/cx";
import "./SearchField.css";

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
  /** Rótulo acessível (visualmente oculto). */
  label: string;
  /** Mostra a dica de atalho "/". */
  shortcutHint?: boolean;
  /** Chamado com ↓ para passar o foco à lista de resultados. */
  onArrowDown?: () => void;
  clearLabel?: string;
}

/** Campo de busca: Esc limpa, ↓ entrega o foco à lista, botão de limpar. */
export function SearchField({
  value,
  onChange,
  label,
  shortcutHint = false,
  onArrowDown,
  clearLabel = "Limpar busca",
  className,
  onKeyDown,
  ...rest
}: SearchFieldProps) {
  const id = useId();
  const key = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.key === "Escape" && value) {
      e.preventDefault();
      e.stopPropagation();
      onChange("");
    } else if (e.key === "ArrowDown" && onArrowDown) {
      e.preventDefault();
      onArrowDown();
    }
  };
  return (
    <div className={cx("sn-search", className)}>
      <label htmlFor={id} className="sn-visually-hidden">
        {label}
      </label>
      <svg className="sn-search__icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        id={id}
        type="search"
        className="sn-search__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={key}
        {...rest}
      />
      {value ? (
        <button type="button" className="sn-search__clear" aria-label={clearLabel} onClick={() => onChange("")}>
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>
      ) : (
        shortcutHint && (
          <kbd className="sn-search__kbd" aria-hidden>
            /
          </kbd>
        )
      )}
    </div>
  );
}
