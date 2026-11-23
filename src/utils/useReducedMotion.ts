import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** true quando o usuário pediu menos movimento. */
export function useReducedMotion(): boolean {
  const get = () => typeof window !== "undefined" && !!window.matchMedia?.(QUERY).matches;
  const [reduced, setReduced] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia?.(QUERY);
    if (!mq) return;
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}
