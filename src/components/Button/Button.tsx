import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, forwardRef, type ReactNode, type Ref } from "react";
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
  /** Vira um link `<a>` com o mesmo visual. Com `disabled` ou `loading`, perde o `href` e ganha `aria-disabled`. */
  href?: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: string;
  download?: AnchorHTMLAttributes<HTMLAnchorElement>["download"];
}

/** Botão base do Sonido. Para ícone sozinho, use `size="icon"` e `aria-label`. */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
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
    href,
    target,
    rel,
    download,
    ...rest
  },
  ref,
) {
  const classes = cx(
    "sn-button",
    `sn-button--${variant}`,
    `sn-button--${size}`,
    press && "sn-button--press",
    className,
  );
  const content = (
    <>
      {loading ? <Spinner size={16} /> : iconStart}
      {children != null && <span className="sn-button__label">{children}</span>}
      {iconEnd}
    </>
  );
  if (href != null) {
    const inert = disabled || loading;
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        className={classes}
        aria-busy={loading || undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        // Sem href o link não navega nem recebe foco, como um botão desabilitado.
        href={inert ? undefined : href}
        role={inert ? "link" : undefined}
        aria-disabled={inert || undefined}
        target={target}
        rel={rel}
        download={download}
        onClick={inert ? undefined : (rest.onClick as AnchorHTMLAttributes<HTMLAnchorElement>["onClick"])}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      type={type}
      ref={ref as Ref<HTMLButtonElement>}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
});
