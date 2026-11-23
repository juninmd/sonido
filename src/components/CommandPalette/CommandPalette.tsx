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
  commands: Command[];
  placeholder?: string;
  emptyText?: string;
  /** Abre com Ctrl/⌘+K chamando `onOpen`. */
  onOpen?: () => void;
}

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/** Paleta de comandos (Ctrl+K) do nerd-watch: busca sem acento, grupos, ↑↓ e Enter. */
export function CommandPalette({
  open,
  onClose,
  commands,
  placeholder = "O que você quer fazer?",
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
    const n = norm(q.trim());
    return n ? commands.filter((c) => norm(`${c.label} ${c.group ?? ""} ${c.keywords ?? ""}`).includes(n)) : commands;
  }, [q, commands]);

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
          aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
          aria-label={placeholder}
          placeholder={placeholder}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(results.length - 1, a + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(0, a - 1));
            } else if (e.key === "Enter") {
              e.preventDefault();
              run(results[active]);
            }
          }}
        />
        <kbd className="sn-palette__esc">Esc</kbd>
      </div>
      <div id={listId} role="listbox" className="sn-palette__list">
        {results.length === 0 && <p className="sn-palette__empty">{emptyText}</p>}
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
                aria-selected={i === active}
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
