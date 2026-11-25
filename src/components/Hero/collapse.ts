import { type RefObject, useEffect, useRef, useState } from "react";

/**
 * Progresso 0..1 do Hero recolhível: 0 enquanto o topo está abaixo de `offset`,
 * 1 quando só a faixa de `collapsedHeight` px continua visível. Meio pixel de folga absorve o sticky subpixel.
 */
export function heroProgress(top: number, height: number, collapsedHeight: number, offset = 0): number {
  const range = height - collapsedHeight;
  const scrolled = offset - top;
  if (!(range > 0) || !Number.isFinite(scrolled) || scrolled <= 0) return 0;
  if (scrolled >= range - 0.5) return 1;
  return scrolled / range;
}

export type StickyOffset = number | (() => number);

/** Mantém `top` e `--sn-hero-p` no elemento a cada quadro de scroll; devolve true quando recolhido. */
export function useHeroCollapse(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  collapsedHeight: number,
  stickyOffset: StickyOffset | undefined,
): boolean {
  const [collapsed, setCollapsed] = useState(false);
  const offsetRef = useRef(stickyOffset);
  useEffect(() => {
    offsetRef.current = stickyOffset;
  });

  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const o = offsetRef.current;
      const offset = typeof o === "function" ? o() : (o ?? 0);
      const height = el.offsetHeight;
      const p = heroProgress(el.getBoundingClientRect().top, height, collapsedHeight, offset);
      el.style.top = `${offset - Math.max(0, height - collapsedHeight)}px`;
      el.style.setProperty("--sn-hero-p", String(Math.round(p * 1000) / 1000));
      setCollapsed(p === 1);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    // capture: também pega o scroll de um contêiner interno (scroll não borbulha).
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule, { passive: true });
    // Altura muda sem scroll/resize (fonte, imagem, conteúdo): mede de novo.
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      el.style.removeProperty("top");
      el.style.removeProperty("--sn-hero-p");
      setCollapsed(false);
    };
  }, [ref, enabled, collapsedHeight]);

  return enabled && collapsed;
}
