import { type KeyboardEvent, useMemo, useRef, useState } from "react";
import { cx } from "../../utils/cx";
import { formatBytes } from "../../utils/format";
import { squarify } from "../../utils/squarify";
import { ancestry, isRelated, type SizedNode, sizeTree, TREE_PALETTE, type TreeNode } from "../../utils/tree";
import { useSize } from "../../utils/useSize";
import "./Treemap.css";

export interface TreemapProps {
  data: TreeNode;
  /** Nome acessível do mapa. */
  label: string;
  /** Altura em px. */
  height?: number;
  /** Formata o valor de cada bloco (padrão: bytes). */
  formatValue?: (value: number) => string;
  /** Chamado ao abrir uma pasta (navegação). */
  onOpen?: (node: TreeNode) => void;
  /** Chamado ao clicar numa folha (sem filhos). */
  onSelect?: (node: TreeNode) => void;
  /** Mostra o caminho com links para voltar. */
  breadcrumb?: boolean;
  className?: string;
}

const DIRS: Record<string, [number, number]> = {
  ArrowRight: [1, 0],
  ArrowLeft: [-1, 0],
  ArrowDown: [0, 1],
  ArrowUp: [0, -1],
};

/**
 * Mapa de blocos proporcional ao tamanho (faxina). Clique abre a pasta; setas movem o foco
 * para o vizinho na direção, Enter abre e Backspace volta. Passar o mouse acende o caminho.
 */
export function Treemap({
  data,
  label,
  height = 320,
  formatValue = formatBytes,
  onOpen,
  onSelect,
  breadcrumb = true,
  className,
}: TreemapProps) {
  const root = useMemo(() => sizeTree(data), [data]);
  const [path, setPath] = useState<string>(root.path);
  const [focus, setFocus] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const [ref, size] = useSize<HTMLDivElement>();
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);

  const current = useMemo(() => {
    const find = (n: SizedNode): SizedNode | null =>
      n.path === path ? n : n.children.reduce<SizedNode | null>((f, c) => f ?? find(c), null);
    return find(root) ?? root;
  }, [root, path]);

  const rects = useMemo(
    () => squarify(current.children, (c) => c.value, 0, 0, size.width, height),
    [current, size.width, height],
  );

  const go = (n: SizedNode) => {
    setPath(n.path);
    setFocus(0);
    setHover(null);
    requestAnimationFrame(() => tiles.current[0]?.focus());
  };
  const activate = (n: SizedNode) => {
    if (n.children.length) {
      go(n);
      onOpen?.(n.node);
    } else onSelect?.(n.node);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Backspace" && current.parent) {
      e.preventDefault();
      go(current.parent);
      return;
    }
    const dir = DIRS[e.key];
    const cur = rects[focus];
    if (!dir || !cur) return;
    e.preventDefault();
    const cx0 = cur.x + cur.w / 2;
    const cy0 = cur.y + cur.h / 2;
    let best = -1;
    let bestD = Number.POSITIVE_INFINITY;
    rects.forEach((r, i) => {
      if (i === focus) return;
      const dx = r.x + r.w / 2 - cx0;
      const dy = r.y + r.h / 2 - cy0;
      if (dx * dir[0] + dy * dir[1] <= 0) return;
      const d = Math.hypot(dx, dy) + Math.abs(dir[0] ? dy : dx);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    if (best >= 0) {
      setFocus(best);
      tiles.current[best]?.focus();
    }
  };

  return (
    <div className={cx("sn-treemap", className)}>
      {breadcrumb && (
        <nav className="sn-treemap__crumbs" aria-label="Caminho">
          {ancestry(current).map((n, i, all) => (
            <span key={n.path} className="sn-treemap__crumb">
              {i > 0 && <span aria-hidden="true">›</span>}
              <button type="button" onClick={() => go(n)} aria-current={i === all.length - 1 ? "location" : undefined}>
                {n.name} · {formatValue(n.value)}
              </button>
            </span>
          ))}
        </nav>
      )}
      <div
        ref={ref}
        className={cx("sn-treemap__map", hover && "sn-treemap__map--focus")}
        style={{ height }}
        role="group"
        aria-label={label}
        onKeyDown={onKeyDown}
        onMouseLeave={() => setHover(null)}
      >
        {rects.map((r, i) => {
          const n = r.item;
          const pct = current.value ? (n.value / current.value) * 100 : 0;
          const pctText = pct.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
          const roomy = r.w > 64 && r.h > 36;
          return (
            <button
              key={n.path}
              ref={(el) => {
                tiles.current[i] = el;
              }}
              type="button"
              tabIndex={i === focus ? 0 : -1}
              className={cx(
                "sn-treemap__tile",
                hover && isRelated(n.path, hover) && "sn-treemap__tile--lit",
                !n.children.length && "sn-treemap__tile--leaf",
              )}
              style={{
                left: r.x,
                top: r.y,
                width: r.w,
                height: r.h,
                ["--sn-tile" as string]: n.color ?? TREE_PALETTE[i % TREE_PALETTE.length],
              }}
              aria-label={`${n.name}, ${formatValue(n.value)}, ${pctText}%${n.children.length ? ", abrir" : ""}`}
              onClick={() => activate(n)}
              onFocus={() => {
                setFocus(i);
                setHover(n.path);
              }}
              onMouseEnter={() => setHover(n.path)}
            >
              {roomy && (
                <>
                  <span className="sn-treemap__name">{n.name}</span>
                  <span className="sn-treemap__value">
                    {formatValue(n.value)} · {pctText}%
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
