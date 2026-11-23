import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Spinner } from "../Spinner";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Estilo visual. `primary` usa o gradiente da marca com brilho no hover. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Sombra tátil que "afunda" no clique (pobre-lingo). */
  press?: boolean;
  /** Mostra spinner, desabilita e marca `aria-busy`. */
  loading?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
}

/** Botão base do Sonido. Para ícone sozinho, use `size="icon"` e `aria-label`. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    press = false,
    loading = false,
    iconStart,
    iconEnd,
    className,
    children,
    disabled,
    type = "button",
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx("sn-button", `sn-button--${variant}`, `sn-button--${size}`, press && "sn-button--press", className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner size={16} /> : iconStart}
      {children != null && <span className="sn-button__label">{children}</span>}
      {iconEnd}
    </button>
  );
});
