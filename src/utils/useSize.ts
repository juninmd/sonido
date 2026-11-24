import { useCallback, useRef, useState } from "react";

export interface Size {
  width: number;
  height: number;
}

/** Mede a caixa de conteúdo de um elemento com ResizeObserver. Use o `ref` retornado. */
export function useSize<T extends HTMLElement = HTMLElement>() {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const observer = useRef<ResizeObserver | null>(null);

  const ref = useCallback((el: T | null) => {
    observer.current?.disconnect();
    observer.current = null;
    if (!el || typeof ResizeObserver === "undefined") return;
    observer.current = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      setSize((s) => (s.width === width && s.height === height ? s : { width, height }));
    });
    observer.current.observe(el);
  }, []);

  return [ref, size] as const;
}
