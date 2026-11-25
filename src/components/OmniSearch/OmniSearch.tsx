import { type CSSProperties, type ReactNode, useEffect, useId, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./OmniSearch.css";

export interface OmniChip {
  key: string;
  label: string;
  /** Tipo do filtro, mostrado em miniatura antes do rótulo (ex.: "plataforma"). */
  kind?: string;
  /** Cor CSS do chip. Padrão: `--sn-color-accent`. */
  color?: string;
}

export interface OmniSearchProps {
  /** Texto livre do campo (sem os filtros já transformados em chips). */
  value: string;
  onChange: (value: string) => void;
  /** Rótulo acessível do campo. */
  label: string;
  /** Filtros ativos, mostrados como chips removíveis antes do campo. */
  chips?: OmniChip[];
  /** Remove um chip. `retype` = veio do Backspace no campo vazio: o app pode devolver a palavra ao campo. */
  onRemoveChip?: (chip: OmniChip, opts: { retype: boolean }) => void;
  chipsLabel?: string;
  /** Enter no campo. */
  onSubmit?: (value: string) => void;
  /** Mostra o botão de limpar tudo quando há texto ou chips. */
  onClear?: () => void;
  clearLabel?: string;
  /** Sugestões mostradas com o campo em foco. */
  suggestions?: string[];
  onPickSuggestion?: (word: string) => void;
  suggestionsLabel?: string;
  /** Texto acima das sugestões. */
  suggestionsTitle?: ReactNode;
  /** Instruções lidas pelo leitor de tela (`aria-describedby`). */
  hint?: string;
  /** Foca o campo com "/" fora de outros campos. */
  shortcut?: boolean;
  placeholder?: string;
  className?: string;
}

/** Busca principal: filtros viram chips removíveis, Backspace no vazio desfaz o último, "/" foca e há sugestões rápidas. */
export function OmniSearch({
  value,
  onChange,
  label,
  chips = [],
  onRemoveChip,
  chipsLabel = "Filtros ativos",
  onSubmit,
  onClear,
  clearLabel = "Limpar",
  suggestions = [],
  onPickSuggestion,
  suggestionsLabel = "Sugestões",
  suggestionsTitle,
  hint,
  shortcut = true,
  placeholder,
  className,
}: OmniSearchProps) {
  const input = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const hintId = useId();

  useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      e.preventDefault();
      input.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut]);

  const remove = (chip: OmniChip, retype: boolean) => {
    onRemoveChip?.(chip, { retype });
    input.current?.focus();
  };
  const clearable = Boolean(onClear) && (value !== "" || chips.length > 0);
  const showSuggest = focused && suggestions.length > 0 && Boolean(onPickSuggestion);

  return (
    <div
      role="search"
      className={cx("sn-omni", focused && "sn-omni--focused", className)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <svg className="sn-omni__icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
        <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {chips.length > 0 && (
        <ul className="sn-omni__chips" aria-label={chipsLabel}>
          {chips.map((c) => (
            <li
              key={c.key}
              className="sn-omni__chip"
              style={c.color ? ({ "--sn-omni-chip": c.color } as CSSProperties) : undefined}
            >
              {c.kind && <small>{c.kind}</small>}
              {c.label}
              {onRemoveChip && (
                <button type="button" aria-label={`Remover filtro ${c.label}`} onClick={() => remove(c, false)}>
                  <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden>
                    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <input
        ref={input}
        type="search"
        className="sn-omni__input"
        value={value}
        placeholder={placeholder}
        aria-label={label}
        aria-describedby={hint ? hintId : undefined}
        autoComplete="off"
        spellCheck={false}
        onChange={(e) => onChange(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) {
            e.preventDefault();
            onSubmit(value);
          } else if (e.key === "Backspace" && !value && chips.length && onRemoveChip) {
            e.preventDefault();
            remove(chips[chips.length - 1], true);
          } else if (e.key === "Escape") {
            if (value) {
              e.preventDefault();
              onChange("");
            } else e.currentTarget.blur();
          }
        }}
      />
      {hint && (
        <span id={hintId} className="sn-visually-hidden">
          {hint}
        </span>
      )}
      {clearable ? (
        <button
          type="button"
          className="sn-omni__clear"
          onClick={() => {
            onClear?.();
            input.current?.focus();
          }}
        >
          {clearLabel}
        </button>
      ) : (
        shortcut && (
          <kbd className="sn-omni__kbd" aria-hidden>
            /
          </kbd>
        )
      )}
      {showSuggest && (
        <div className="sn-omni__suggest" role="group" aria-label={suggestionsLabel}>
          {suggestionsTitle && <p>{suggestionsTitle}</p>}
          {suggestions.map((w) => (
            <button
              key={w}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onPickSuggestion?.(w);
                input.current?.focus();
              }}
            >
              {w}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
