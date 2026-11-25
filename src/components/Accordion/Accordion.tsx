import { type ReactNode, useId, useState } from "react";
import { cx } from "../../utils/cx";
import "./Accordion.css";

export interface AccordionItem {
  key: string;
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Permite várias abertas ao mesmo tempo. */
  multiple?: boolean;
  defaultOpen?: string[];
  /** Avisa quando uma seção abre ou fecha (seções fechadas por `multiple={false}` não disparam). */
  onToggle?: (key: string, open: boolean) => void;
  className?: string;
}

/** Seções expansíveis com altura animada (grid 0fr → 1fr). */
export function Accordion({ items, multiple = false, defaultOpen = [], onToggle, className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen);
  const base = useId();
  const toggle = (k: string) => {
    const wasOpen = open.includes(k);
    setOpen(wasOpen ? open.filter((x) => x !== k) : multiple ? [...open, k] : [k]);
    onToggle?.(k, !wasOpen);
  };
  return (
    <div className={cx("sn-accordion", className)}>
      {items.map((it) => {
        const isOpen = open.includes(it.key);
        const id = `${base}-${it.key}`;
        return (
          <div key={it.key} className="sn-accordion__item" data-open={isOpen || undefined}>
            <h3 className="sn-accordion__heading">
              <button
                type="button"
                id={`${id}-t`}
                className="sn-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={`${id}-p`}
                onClick={() => toggle(it.key)}
              >
                <span>{it.title}</span>
                <svg className="sn-accordion__chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                  <path
                    d="m6 9 6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <section
              id={`${id}-p`}
              aria-labelledby={`${id}-t`}
              className="sn-accordion__panel"
              inert={!isOpen || undefined}
            >
              <div className="sn-accordion__inner">{it.content}</div>
            </section>
          </div>
        );
      })}
    </div>
  );
}
