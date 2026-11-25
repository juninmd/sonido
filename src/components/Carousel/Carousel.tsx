import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import "./Carousel.css";

export interface CarouselProps {
  /** Título da faixa (também rotula a região). */
  title: string;
  /** Ícone decorativo antes do título. */
  icon?: ReactNode;
  /** Ação no cabeçalho, ex.: "Ver tudo". */
  action?: ReactNode;
  children: ReactNode;
  /** Largura de cada item. */
  itemWidth?: number;
  className?: string;
}

/** Faixa horizontal com scroll-snap e setas que rolam uma página (nerd-watch). */
export function Carousel({ title, icon, action, children, itemWidth = 160, className }: CarouselProps) {
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);

  useEffect(() => {
    update();
    const el = rail.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const page = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(itemWidth, el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section
      className={cx("sn-carousel", className)}
      aria-label={title}
      style={{ ["--sn-item-w" as string]: `${itemWidth}px` }}
    >
      <header className="sn-carousel__head">
        <h3 className="sn-carousel__title">
          {icon && (
            <span className="sn-carousel__icon" aria-hidden>
              {icon}
            </span>
          )}
          {title}
        </h3>
        {action}
        <div className="sn-carousel__nav">
          <button
            type="button"
            className="sn-carousel__btn"
            aria-label="Anterior"
            disabled={edges.start}
            onClick={() => page(-1)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <path
                d="m15 6-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="sn-carousel__btn"
            aria-label="Próximo"
            disabled={edges.end}
            onClick={() => page(1)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
              <path
                d="m9 6 6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </header>
      <div
        ref={rail}
        className="sn-carousel__rail"
        onScroll={update}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: trilho rolável precisa de foco pelo teclado (axe)
        tabIndex={0}
        role="group"
        aria-label={`${title}: role com as setas`}
      >
        {children}
      </div>
    </section>
  );
}
