import { useMemo, useState } from "react";
import { cx } from "../../utils/cx";
import { formatBytes } from "../../utils/format";
import { type SizedNode, sizeTree, TREE_PALETTE, type TreeNode } from "../../utils/tree";
import "./Sunburst.css";

export interface SunburstProps {
  data: TreeNode;
  /** Nome acessível do gráfico. */
  label: string;
  /** Diâmetro máximo em px. */
  size?: number;
  /** Quantos anéis desenhar abaixo do nó aberto. */
  depth?: number;
  /** Formata o valor do centro e das dicas (padrão: bytes). */
  formatValue?: (value: number) => string;
  /** Chamado ao entrar num anel. */
  onOpen?: (node: TreeNode) => void;
  className?: string;
}

const TAU = Math.PI * 2;

function arc(a0: number, a1: number, r0: number, r1: number) {
  const span = Math.min(a1 - a0, TAU - 1e-4);
  const b = a0 + span;
  const large = span > Math.PI ? 1 : 0;
  const p = (a: number, r: number) => `${(Math.sin(a) * r).toFixed(2)} ${(-Math.cos(a) * r).toFixed(2)}`;
  return `M${p(a0, r1)} A${r1} ${r1} 0 ${large} 1 ${p(b, r1)} L${p(b, r0)} A${r0} ${r0} 0 ${large} 0 ${p(a0, r0)}Z`;
}

interface Slice {
  n: SizedNode;
  d: string;
  color: string;
  shade: number;
}

/** Anéis hierárquicos (faxina): clique num anel para entrar e no centro para voltar. */
export function Sunburst({
  data,
  label,
  size = 320,
  depth = 2,
  formatValue = formatBytes,
  onOpen,
  className,
}: SunburstProps) {
  const root = useMemo(() => sizeTree(data), [data]);
  const [open, setOpen] = useState<SizedNode>(root);
  const [hover, setHover] = useState<SizedNode | null>(null);
  const node = isIn(open, root) ? open : root;

  const slices = useMemo(() => {
    const out: Slice[] = [];
    const hole = 52;
    const ring = (160 - hole) / depth;
    const walk = (n: SizedNode, a0: number, a1: number, level: number, color: string) => {
      if (level >= depth || !n.value) return;
      let a = a0;
      n.children.forEach((c, i) => {
        const a2 = a + ((a1 - a0) * c.value) / n.value;
        const col = c.color ?? (level === 0 ? TREE_PALETTE[i % TREE_PALETTE.length] : color);
        if (a2 - a > 0.004) {
          out.push({
            n: c,
            d: arc(a, a2, hole + ring * level + 2, hole + ring * (level + 1)),
            color: col,
            shade: level === 0 ? 1 : 0.55 + 0.4 * (1 - i / n.children.length),
          });
        }
        walk(c, a, a2, level + 1, col);
        a = a2;
      });
    };
    walk(node, 0, TAU, 0, TREE_PALETTE[0]);
    return out;
  }, [node, depth]);

  const shown = hover ?? node;
  const enter = (n: SizedNode) => {
    if (!n.children.length) return;
    setOpen(n);
    setHover(null);
    onOpen?.(n.node);
  };

  return (
    <div className={cx("sn-sunburst", className)} style={{ maxWidth: size }}>
      <svg viewBox="-162 -162 324 324" role="group" aria-label={label}>
        {slices.map((s) => (
          <path
            key={s.n.path}
            d={s.d}
            fill={s.color}
            fillOpacity={s.shade}
            className={cx("sn-sunburst__slice", !s.n.children.length && "sn-sunburst__slice--leaf")}
            role="button"
            tabIndex={s.n.children.length ? 0 : -1}
            aria-label={`${s.n.name}, ${formatValue(s.n.value)}`}
            onClick={() => enter(s.n)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                enter(s.n);
              }
            }}
            onMouseEnter={() => setHover(s.n)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(s.n)}
            onBlur={() => setHover(null)}
          >
            <title>{`${s.n.name} · ${formatValue(s.n.value)}`}</title>
          </path>
        ))}
      </svg>
      <button
        type="button"
        className="sn-sunburst__center"
        onClick={() => node.parent && setOpen(node.parent)}
        disabled={!node.parent}
        aria-label={node.parent ? `Voltar para ${node.parent.name}` : node.name}
      >
        <strong aria-live="polite">{formatValue(shown.value)}</strong>
        <span>{shown.name}</span>
        {node.parent && !hover && <small>voltar</small>}
      </button>
    </div>
  );
}

function isIn(n: SizedNode, root: SizedNode): boolean {
  let c: SizedNode | null = n;
  while (c?.parent) c = c.parent;
  return c === root;
}
