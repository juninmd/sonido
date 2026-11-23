import { type ReactNode, useEffect, useRef, useState } from "react";
import { Button, type ButtonProps } from "../Button";
import "./ConfirmButton.css";

export interface ConfirmButtonProps extends Omit<ButtonProps, "onClick"> {
  /** Pergunta exibida no segundo passo. */
  ask: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
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
  children,
  ...rest
}: ConfirmButtonProps) {
  const [asking, setAsking] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const was = useRef(false);

  useEffect(() => {
    if (asking) cancel.current?.focus();
    else if (was.current) trigger.current?.focus();
    was.current = asking;
  }, [asking]);

  if (!asking) {
    return (
      <Button ref={trigger} variant={variant} onClick={() => setAsking(true)} {...rest}>
        {children}
      </Button>
    );
  }
  return (
    <div
      role="group"
      className="sn-confirm"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          setAsking(false);
        }
      }}
    >
      <span className="sn-confirm__ask">{ask}</span>
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
    </div>
  );
}
