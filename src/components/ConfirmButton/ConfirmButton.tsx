import { type ReactNode, useEffect, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import { Button, type ButtonProps } from "../Button";
import "./ConfirmButton.css";

export interface ConfirmButtonProps extends Omit<ButtonProps, "onClick"> {
  /** Pergunta exibida no segundo passo. */
  ask: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  /**
   * `solid` usa o `Button` do Sonido na cor de perigo. `inline` é o original do canto-widget:
   * um gatilho sem estilo próprio (o `className` manda) e a pergunta numa caixa compacta de duas linhas.
   */
  appearance?: "solid" | "inline";
}

/**
 * Ação destrutiva em dois passos, inline (canto-widget).
 * Esc cancela, o foco vai para "Cancelar" e volta ao gatilho ao fechar.
 */
export function ConfirmButton({
  ask,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  variant = "danger",
  size = "md",
  appearance = "solid",
  iconStart,
  iconEnd,
  press,
  loading,
  children,
  disabled,
  className,
  ...rest
}: ConfirmButtonProps) {
  const [asking, setAsking] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const was = useRef(false);

  // Outra ação começou: a pergunta não vale mais, então fecha em vez de disparar junto.
  useEffect(() => {
    if (disabled) setAsking(false);
  }, [disabled]);

  useEffect(() => {
    if (asking) cancel.current?.focus();
    else if (was.current) trigger.current?.focus();
    was.current = asking;
  }, [asking]);

  if (!asking) {
    if (appearance === "inline") {
      return (
        <button
          ref={trigger}
          type="button"
          disabled={disabled}
          className={cx("sn-confirm__trigger", className)}
          onClick={() => setAsking(true)}
          {...rest}
        >
          {children}
        </button>
      );
    }
    return (
      <Button
        ref={trigger}
        variant={variant}
        size={size}
        iconStart={iconStart}
        iconEnd={iconEnd}
        press={press}
        loading={loading}
        disabled={disabled}
        className={className}
        onClick={() => setAsking(true)}
        {...rest}
      >
        {children}
      </Button>
    );
  }

  return (
    <div
      role="group"
      className={cx("sn-confirm", appearance === "inline" && "sn-confirm--inline")}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          setAsking(false);
        }
      }}
    >
      <span className="sn-confirm__ask">{ask}</span>
      {appearance === "inline" ? (
        <>
          <button
            ref={cancel}
            type="button"
            className="sn-confirm__action sn-confirm__action--cancel"
            onClick={() => setAsking(false)}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="sn-confirm__action sn-confirm__action--yes"
            onClick={() => {
              setAsking(false);
              onConfirm();
            }}
          >
            {confirmLabel}
          </button>
        </>
      ) : (
        <>
          <Button ref={cancel} variant="ghost" size="sm" onClick={() => setAsking(false)}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant}
            size="sm"
            onClick={() => {
              setAsking(false);
              onConfirm();
            }}
          >
            {confirmLabel}
          </Button>
        </>
      )}
    </div>
  );
}
