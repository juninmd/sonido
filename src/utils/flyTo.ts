import { shouldAnimate } from "./useMotionPref";

export interface FlyToOptions {
  /** Cor do cometa (qualquer cor CSS). Padrão: --sn-color-accent-2. */
  color?: string;
  /** Duração em ms. */
  duration?: number;
}

const center = (el: Element) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
};

/**
 * Um cometa voa de `from` (elemento ou ponto na tela) até `to` (elemento ou seletor),
 * para a marcação ir visivelmente para algum lugar. Não faz nada sem animação.
 * Resolve quando o cometa chega.
 */
export function flyTo(
  from: Element | { x: number; y: number },
  to: Element | string = "[data-sn-fly-target]",
  { color = "var(--sn-color-accent-2)", duration = 650 }: FlyToOptions = {},
): Promise<void> {
  if (typeof document === "undefined" || !shouldAnimate()) return Promise.resolve();
  const target =
    typeof to === "string" ? [...document.querySelectorAll(to)].find((el) => el.getBoundingClientRect().width > 0) : to;
  if (!target || typeof Element.prototype.animate !== "function") return Promise.resolve();
  const a = from instanceof Element ? center(from) : from;
  const b = center(target);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dot = document.createElement("div");
  dot.className = "sn-comet";
  dot.setAttribute("aria-hidden", "true");
  dot.style.left = `${a.x}px`;
  dot.style.top = `${a.y}px`;
  dot.style.setProperty("--sn-comet", color);
  document.body.appendChild(dot);
  const anim = dot.animate(
    [
      { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
      { transform: `translate(calc(${dx * 0.55}px - 50%), calc(${dy * 0.35 - 60}px - 50%)) scale(1.3)`, opacity: 1 },
      { transform: `translate(calc(${dx}px - 50%), calc(${dy}px - 50%)) scale(0.2)`, opacity: 0 },
    ],
    { duration, easing: "cubic-bezier(.5,0,.2,1)" },
  );
  return new Promise((resolve) => {
    const done = () => {
      dot.remove();
      resolve();
    };
    anim.onfinish = done;
    anim.oncancel = done;
  });
}
