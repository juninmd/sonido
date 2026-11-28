import { type ReactNode, useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "../../utils/cx";
import "./Dialog.css";

export interface DialogTriggerProps {
  onClick: () => void;
  "aria-haspopup": "dialog";
  "aria-expanded": boolean;
}

export interface DialogProps {
  /** Controlado. Omitido, o diálogo guarda o próprio estado (útil com `trigger`). */
  open?: boolean;
  /** Estado inicial no modo não controlado. */
  defaultOpen?: boolean;
  /** Avisa toda abertura/fechamento, controlado ou não. */
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  /** Renderiza o gatilho com o handler e os atributos ARIA prontos. */
  trigger?: (props: DialogTriggerProps) => ReactNode;
  /** Monta o `<dialog>` em `document.body` (evita clipping por `overflow`/`transform`). */
  portal?: boolean;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  /** Rodapé, normalmente botões. */
  footer?: ReactNode;
  /** `modal` centralizado ou `drawer` lateral (games-gallery). */
  variant?: "modal" | "drawer";
  className?: string;
}

/** Diálogo sobre `<dialog>` nativo: foco preso, Esc e clique no fundo fecham. */
export function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  onClose,
  trigger,
  portal = false,
  title,
  description,
  children,
  footer,
  variant = "modal",
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setInner(next);
      onOpenChange?.(next);
      if (!next) onClose?.();
    },
    [open, onOpenChange, onClose],
  );

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal?.();
    if (!isOpen && d.open) d.close?.();
  }, [isOpen]);

  const dialog = (
    // biome-ignore lint/a11y/useKeyWithClickEvents: clique no fundo fecha; o Esc já é tratado pelo <dialog>
    <dialog
      ref={ref}
      className={cx("sn-dialog", `sn-dialog--${variant}`, className)}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        setOpen(false);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="sn-dialog__panel">
        <header className="sn-dialog__header">
          <h2 id={titleId} className="sn-dialog__title">
            {title}
          </h2>
          <button type="button" className="sn-dialog__close" aria-label="Fechar" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </header>
        {description && <p className="sn-dialog__desc">{description}</p>}
        {children && <div className="sn-dialog__body">{children}</div>}
        {footer && <footer className="sn-dialog__footer">{footer}</footer>}
      </div>
    </dialog>
  );

  const triggerNode = trigger?.({
    onClick: () => setOpen(true),
    "aria-haspopup": "dialog",
    "aria-expanded": isOpen,
  });

  return (
    <>
      {triggerNode}
      {portal && typeof document !== "undefined" ? createPortal(dialog, document.body) : dialog}
    </>
  );
}
