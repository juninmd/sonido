import { type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes, useId } from "react";
import { cx } from "../../utils/cx";
import "./TextField.css";

interface Common {
  label: string;
  hint?: ReactNode;
  /** Mensagem de erro: marca `aria-invalid` e substitui a dica. */
  error?: string;
  /** Ícone à esquerda (só input). */
  icon?: ReactNode;
  /** Versão compacta (32px) para uso em linha: tags, preços, contadores. */
  compact?: boolean;
  /** Esconde o rótulo visualmente; ele continua lido por leitores de tela. */
  hideLabel?: boolean;
}

export type TextFieldProps = Common &
  (
    | ({ multiline?: false } & InputHTMLAttributes<HTMLInputElement>)
    | ({ multiline: true } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  );

/** Campo de texto com rótulo, dica e erro ligados por `aria-describedby`. */
export function TextField(props: TextFieldProps) {
  const auto = useId();
  const {
    label,
    hint,
    error,
    icon,
    compact,
    hideLabel,
    className,
    id = auto,
    multiline,
    ...rest
  } = props as Common & {
    className?: string;
    id?: string;
    multiline?: boolean;
  } & Record<string, unknown>;
  const msgId = `${id}-msg`;
  const shared = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error || hint ? msgId : undefined,
    className: "sn-field__control",
  };
  return (
    <div className={cx("sn-field", compact && "sn-field--compact", error && "sn-field--error", className)}>
      <label htmlFor={id} className={hideLabel ? "sn-visually-hidden" : "sn-field__label"}>
        {label}
      </label>
      <div className="sn-field__box">
        {icon && !multiline && (
          <span className="sn-field__icon" aria-hidden>
            {icon}
          </span>
        )}
        {multiline ? <textarea rows={3} {...shared} {...rest} /> : <input {...shared} {...rest} />}
      </div>
      {(error || hint) && (
        <p id={msgId} className="sn-field__msg">
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
