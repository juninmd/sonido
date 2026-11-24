/** Nó de hierarquia usado por Treemap e Sunburst. Folhas têm `value`; pastas somam os filhos. */
export interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
  /** Cor CSS opcional; sem ela o nó usa a paleta do tema. */
  color?: string;
  id?: string;
}

/** Nó com total calculado, filhos ordenados e caminho a partir da raiz. */
export interface SizedNode {
  node: TreeNode;
  name: string;
  value: number;
  path: string;
  depth: number;
  parent: SizedNode | null;
  children: SizedNode[];
  color?: string;
}

/** Soma os valores, ordena do maior ao menor e liga cada nó ao pai. */
export function sizeTree(node: TreeNode, parent: SizedNode | null = null): SizedNode {
  const path = parent ? `${parent.path}/${node.id ?? node.name}` : (node.id ?? node.name);
  const s: SizedNode = {
    node,
    name: node.name,
    value: 0,
    path,
    depth: parent ? parent.depth + 1 : 0,
    parent,
    children: [],
    color: node.color,
  };
  s.children = (node.children ?? []).map((c) => sizeTree(c, s)).sort((a, b) => b.value - a.value);
  s.value = node.children?.length ? s.children.reduce((a, c) => a + c.value, 0) : Math.max(0, node.value ?? 0);
  return s;
}

/** true quando `path` é `focus`, está dentro dele ou é um dos pais: os nós que ficam acesos. */
export function isRelated(path: string, focus: string): boolean {
  return path === focus || path.startsWith(`${focus}/`) || focus.startsWith(`${path}/`);
}

/** Cores da paleta, em ordem, como variáveis do tema. */
export const TREE_PALETTE = [
  "var(--sn-color-accent)",
  "var(--sn-color-accent-2)",
  "var(--sn-color-aqua)",
  "var(--sn-color-gold)",
  "var(--sn-color-info)",
  "var(--sn-color-success)",
  "var(--sn-sig-1)",
  "var(--sn-sig-2)",
];

/** Do mais próximo da raiz para o nó. */
export function ancestry(n: SizedNode): SizedNode[] {
  const chain: SizedNode[] = [];
  for (let c: SizedNode | null = n; c; c = c.parent) chain.unshift(c);
  return chain;
}
