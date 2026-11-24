import { useCallback, useSyncExternalStore } from "react";
import { useReducedMotion } from "./useReducedMotion";

/** "system" segue o sistema; "always" anima mesmo com reduced-motion; "never" desliga tudo. */
export type MotionPref = "system" | "always" | "never";

export const MOTION_PREF_LABELS: Record<MotionPref, string> = { system: "Sistema", always: "Sempre", never: "Nunca" };

const KEY = "sonido.motion";
const listeners = new Set<() => void>();
let current: MotionPref | null = null;

function read(): MotionPref {
  if (current) return current;
  try {
    const v = localStorage.getItem(KEY);
    current = v === "always" || v === "never" ? v : "system";
  } catch {
    current = "system";
  }
  return current;
}

/** Lê a preferência salva (fora de React). */
export function getMotionPref(): MotionPref {
  return typeof window === "undefined" ? "system" : read();
}

/** Salva a preferência e avisa todos os componentes que usam `useMotionPref`. */
export function setMotionPref(pref: MotionPref) {
  current = pref;
  try {
    localStorage.setItem(KEY, pref);
  } catch {
    // Sem storage a escolha vale só nesta sessão.
  }
  for (const l of listeners) l();
}

/** true quando deve animar, juntando a preferência salva e o reduced-motion do sistema. */
export function shouldAnimate(pref: MotionPref = getMotionPref()): boolean {
  if (pref !== "system") return pref === "always";
  return !(typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches);
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/**
 * Preferência de movimento do usuário, salva no navegador e compartilhada entre componentes.
 * Estende o `useReducedMotion`: o usuário pode forçar animação ou desligar tudo.
 */
export function useMotionPref() {
  const pref = useSyncExternalStore(subscribe, getMotionPref, () => "system" as MotionPref);
  const reduced = useReducedMotion();
  const animate = pref === "system" ? !reduced : pref === "always";
  const set = useCallback((p: MotionPref) => setMotionPref(p), []);
  return { pref, setPref: set, animate } as const;
}
