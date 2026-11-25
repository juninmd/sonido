import { type ReactNode, useEffect, useId, useMemo, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./CommandPalette.css";

export interface Command {
  id: string;
  label: string;
  group?: string;
  icon?: ReactNode;
  hint?: string;
  /** Palavras extras para a busca. */
  keywords?: string;
  run: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  /**
   * Lista fixa (filtrada por `filter`) ou função que recebe a busca e devolve os itens já filtrados,
   * para itens dinâmicos como resultados de uma busca no app.
   */
  commands: Command[] | ((query: string) => Command[]);
  /** Filtro próprio para a lista fixa. Padrão: `defaultCommandFilter` (sem acento, por rótulo, grupo e palavras). */
  filter?: (command: Command, query: string) => boolean;
  /** Máximo de resultados mostrados. */
  limit?: number;
  placeholder?: string;
  /** Rótulo acessível do campo. Padrão: `placeholder`. */
  label?: string;
  emptyText?: ReactNode | ((query: string) => ReactNode);
  /** Abre com Ctrl/⌘+K chamando `onOpen`. */
  onOpen?: () => void;
}

/** Normaliza para busca: sem acentos e em minúsculas. */
export const foldText = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/** Filtro padrão: a busca (sem acento) aparece no rótulo, no grupo ou nas palavras extras. */
export function defaultCommandFilter(c: Command, query: string): boolean {
  const n = foldText(query.trim());
  return !n || foldText(`${c.label} ${c.group ?? ""} ${c.keywords ?? ""}`).includes(n);
}

/** Paleta de comandos (Ctrl+K): busca sem acento ou filtro próprio, itens dinâmicos, limite, grupos, ↑↓ e Enter. */
export function CommandPalette({
  open,
  onClose,
  commands,
  filter = defaultCommandFilter,
  limit,
  placeholder = "O que você quer fazer?",
  label,
  emptyText = "Nenhum comando encontrado.",
  onOpen,
}: CommandPaletteProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const listId = useId();

  useEffect(() => {
    if (!onOpen) return;
    const k = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onOpen]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setQ("");
      setActive(0);
      d.showModal?.();
    }
    if (!open && d.open) d.close?.();
  }, [open]);

  const results = useMemo(() => {
    const all = typeof commands === "function" ? commands(q) : commands.filter((c) => filter(c, q));
    return limit != null ? all.slice(0, Math.max(0, limit)) : all;
  }, [q, commands, filter, limit]);
  const current = Math.min(active, Math.max(0, results.length - 1));

  const activeId = results[current] ? `${listId}-${results[current].id}` : undefined;

  useEffect(() => {
    if (activeId) document.getElementById(activeId)?.scrollIntoView?.({ block: "nearest" });
  }, [activeId]);

  const run = (c: Command | undefined) => {
    if (!c) return;
    onClose();
    c.run();
  };

  let lastGroup: string | undefined;
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: clique no fundo fecha; o Esc já é tratado pelo <dialog>
    <dialog
      ref={ref}
      className="sn-palette"
      aria-label="Paleta de comandos"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sn-palette__in">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={activeId}
          aria-label={label ?? placeholder}
          placeholder={placeholder}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            const n = Math.max(1, results.length);
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((current + 1) % n);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((current - 1 + n) % n);
            } else if (e.key === "Enter") {
              e.preventDefault();
              run(results[current]);
            }
          }}
        />
        <kbd className="sn-palette__esc">Esc</kbd>
      </div>
      <div id={listId} role="listbox" className="sn-palette__list">
        {results.length === 0 && (
          <p className="sn-palette__empty">{typeof emptyText === "function" ? emptyText(q) : emptyText}</p>
        )}
        {results.map((c, i) => {
          const head = c.group && c.group !== lastGroup ? c.group : null;
          lastGroup = c.group;
          return (
            <div key={c.id} role="presentation">
              {head && (
                <div className="sn-palette__group" role="presentation">
                  {head}
                </div>
              )}
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: as opções são navegadas pelas setas no campo de busca (aria-activedescendant) */}
              <div
                id={`${listId}-${c.id}`}
                role="option"
                tabIndex={-1}
                aria-selected={i === current}
                className={cx("sn-palette__opt")}
                onPointerMove={() => setActive(i)}
                onClick={() => run(c)}
              >
                <span className="sn-palette__ic">{c.icon}</span>
                <span className="sn-palette__label">{c.label}</span>
                {c.hint && <span className="sn-palette__hint">{c.hint}</span>}
              </div>
            </div>
          );
        })}
      </div>
      <footer className="sn-palette__foot">
        <span>
          <kbd>↑</kbd>
          <kbd>↓</kbd> navegar
        </span>
        <span>
          <kbd>Enter</kbd> executar
        </span>
      </footer>
    </dialog>
  );
}
