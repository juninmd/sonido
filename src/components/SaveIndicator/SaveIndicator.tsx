import { useEffect, useState } from "react";
import { cx } from "../../utils/cx";
import "./SaveIndicator.css";

export type SaveState = "idle" | "dirty" | "saving" | "saved" | "error";

export interface SaveIndicatorProps {
  state: SaveState;
  error?: string;
  /** Some sozinho depois de "salvo" (ms). */
  hideAfter?: number;
  labels?: Partial<Record<Exclude<SaveState, "idle">, string>>;
  className?: string;
}

const L = { dirty: "Não salvo", saving: "Salvando…", saved: "Salvo", error: "Erro ao salvar" };

/** Estado do salvamento automático (SettingsSaveIndicator do mika): ponto, giro, check e erro em pílula viva. */
export function SaveIndicator({ state, error, hideAfter = 3000, labels, className }: SaveIndicatorProps) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setHidden(false);
    if (state !== "saved") return;
    const t = setTimeout(() => setHidden(true), hideAfter);
    return () => clearTimeout(t);
  }, [state, hideAfter]);
  if (state === "idle" || hidden) return <span className="sn-visually-hidden" role="status" />;
  const text = { ...L, ...labels }[state];
  return (
    <span
      key={state}
      className={cx("sn-save", className)}
      data-state={state}
      role={state === "error" ? "alert" : "status"}
      title={state === "error" ? error : undefined}
    >
      <i aria-hidden />
      {text}
    </span>
  );
}
