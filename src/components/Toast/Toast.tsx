import { createContext, type ReactNode, useCallback, useContext, useMemo, useRef, useState } from "react";
import "./Toast.css";

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: "neutral" | "success" | "danger";
  /** ms até sumir. 0 = fica até fechar. */
  duration?: number;
  action?: { label: string; onClick: () => void };
  /** Mídia à esquerda (miniatura, snapshot de câmera, capa). */
  media?: ReactNode;
}

interface Item extends ToastOptions {
  id: number;
}

const Ctx = createContext<((t: ToastOptions) => void) | null>(null);

/** Coloque uma vez no topo do app. Os toasts são anunciados por uma região `aria-live`. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const seq = useRef(0);
  const dismiss = useCallback((id: number) => setItems((l) => l.filter((t) => t.id !== id)), []);
  const push = useCallback((t: ToastOptions) => {
    const id = ++seq.current;
    setItems((l) => [...l.slice(-3), { ...t, id }]);
  }, []);
  const value = useMemo(() => push, [push]);
  return (
    <Ctx.Provider value={value}>
      {children}
      <section className="sn-toasts" aria-live="polite" aria-label="Notificações">
        {items.map((t) => (
          <div key={t.id} className={`sn-toast sn-toast--${t.tone ?? "neutral"}`}>
            {t.media && <div className="sn-toast__media">{t.media}</div>}
            <div className="sn-toast__text">
              <p className="sn-toast__title">{t.title}</p>
              {t.description && <p className="sn-toast__desc">{t.description}</p>}
            </div>
            {t.action && (
              <button
                type="button"
                className="sn-toast__action"
                onClick={() => {
                  t.action?.onClick();
                  dismiss(t.id);
                }}
              >
                {t.action.label}
              </button>
            )}
            <button type="button" className="sn-toast__close" aria-label="Fechar" onClick={() => dismiss(t.id)}>
              ×
            </button>
            {(t.duration ?? 4500) > 0 && (
              // A barra que esvazia é o relógio (mika): pausa no hover/foco e fecha ao terminar.
              <i
                className="sn-toast__drain"
                aria-hidden
                style={{ animationDuration: `${t.duration ?? 4500}ms` }}
                onAnimationEnd={() => dismiss(t.id)}
              />
            )}
          </div>
        ))}
      </section>
    </Ctx.Provider>
  );
}

/** `const toast = useToast(); toast({ title: "Salvo" })`. */
export function useToast() {
  const push = useContext(Ctx);
  if (!push) throw new Error("useToast precisa de <ToastProvider>");
  return push;
}
