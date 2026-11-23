import { type ReactNode, useEffect, useId, useRef } from "react";
import { cx } from "../../utils/cx";
import "./Dialog.css";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
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
  onClose,
  title,
  description,
  children,
  footer,
  variant = "modal",
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal?.();
    if (!open && d.open) d.close?.();
  }, [open]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: clique no fundo fecha; o Esc já é tratado pelo <dialog>
    <dialog
      ref={ref}
      className={cx("sn-dialog", `sn-dialog--${variant}`, className)}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sn-dialog__panel">
        <header className="sn-dialog__header">
          <h2 id={titleId} className="sn-dialog__title">
            {title}
          </h2>
          <button type="button" className="sn-dialog__close" aria-label="Fechar" onClick={onClose}>
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
}
